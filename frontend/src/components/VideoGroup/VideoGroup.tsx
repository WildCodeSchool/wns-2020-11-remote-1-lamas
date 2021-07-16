/* eslint-disable no-console */
import React, { useEffect, useRef, useState } from 'react';
import { Container } from '@material-ui/core';
import Peer, { SignalData } from 'simple-peer';
import socket from '../../socket/socket';
import './VideoGroup.css';
import { currentUser } from '../../cache';
import Video from '../Video/Video';
import { createPeer, addPeer } from './utils';

interface IVideoProps {
  roomId: string;
  videoStatus: boolean;
  microStatus: boolean;
}

interface IPayload {
  signal: string | SignalData;
  callerID: string;
  id: string;
  firstname: string;
  lastname: string;
}

interface IPeerWithId {
  peerID: string;
  peer: Peer.Instance;
  micro?: boolean;
  video?: boolean;
  firstname: string;
  lastname: string;
}

interface IAllUser {
  userId: string;
  firstname: string;
  lastname: string;
}

const VideoGroup = ({
  roomId,
  videoStatus,
  microStatus,
}: IVideoProps): JSX.Element => {
  const [peers, setPeers] = useState<Peer.Instance[]>([]);
  const [peerId, setPeerId] = useState<string>('');
  const peersRef = useRef<IPeerWithId[]>([]);
  const roomID = roomId;
  const user = currentUser();

  const removeUserLeavingRoomVideo = (socketId: string) => {
    const peerToDestroy = peersRef.current.find((el) => el.peerID === socketId);
    console.log('peerToDestroy', peerToDestroy);
    if (peerToDestroy) {
      peerToDestroy.peer.destroy();
    }
    peersRef.current = peersRef.current.filter((el) => el.peerID !== socketId);
    console.log(
      'peers after destroy',
      peersRef.current.filter((el) => el.peerID !== socketId)
    );

    setPeers(peersRef.current.map((el) => el.peer));
  };

  const removeAllPeersConnections = () => {
    peersRef.current.forEach((el) => el.peer.destroy());
    peersRef.current = [];
    console.log('removeAllPeersConnections');
  };

  useEffect(() => {
    socket.connect();

    return () => {
      console.log('LEAVE');
      // Suppression de tous les peers
      removeAllPeersConnections();
      // Signaler aux autres de détruire le peer de celui qui est parti
      socket.emit('remove user', peerId);
      socket.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // HELP: useEffect called when a new user join session
  useEffect(() => {
    if (user && roomId) {
      // notification to activate video and audio in the browser
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        // demarre le stream une fois que c'est accepté
        .then((stream: MediaStream) => {
          console.log('LAUNCHED');
          socket.emit('join room', roomID);
          socket.on('all users', (usersInfo: IAllUser[]) => {
            const usersPeers: Peer.Instance[] = [];
            usersInfo.forEach((userInfo: IAllUser) => {
              const peer = createPeer(userInfo.userId, socket.id, stream);
              if (
                !peersRef.current.find(
                  (peerWithId) => userInfo.userId === peerWithId.peerID
                )
              ) {
                peersRef.current.push({
                  firstname: userInfo.firstname,
                  lastname: userInfo.lastname,
                  peerID: userInfo.userId,
                  peer,
                });
                setPeerId(userInfo.userId);
              }
              usersPeers.push(peer);
            });
            setPeers(usersPeers);
          });

          socket.on('user joined', (payload: IPayload) => {
            const peer = addPeer(payload.signal, payload.callerID, stream);
            if (
              !peersRef?.current?.find(
                (video) => payload.callerID === video.peerID
              )
            ) {
              peersRef.current.push({
                firstname: payload.firstname,
                lastname: payload.lastname,
                peerID: payload.callerID,
                peer,
              });
            }
            setPeers([...peers, peer]);
          });

          socket.on('receiving returned signal', (payload: IPayload) => {
            console.log('receiving returned signal', payload);

            const item = peersRef?.current?.find(
              (p) => p.peerID === payload.id
            );
            console.log(
              'in receiving returned signal, item : ',
              item,
              ' item.peer ',
              item?.peer
            );
            if (item?.peer) {
              item.peer.signal(payload.signal);
            }
          });

          socket.on('removeUserVideo', (socketId: string) => {
            console.log('removeUserVideo', socketId);
            removeUserLeavingRoomVideo(socketId);
          });
        })
        .catch((err) => console.log('erreur dans getUserMedia : ', err));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container
      style={{ display: 'flex', flexWrap: 'wrap', overflowY: 'scroll' }}
    >
      {peersRef?.current.map((peer: IPeerWithId) => {
        return (
          <Video
            key={peer.peerID}
            peer={peer.peer}
            microStatus={microStatus}
            videoStatus={videoStatus}
            peerId={peerId}
            videoPeerId={peer.peerID}
            firstname={peer.firstname}
            lastname={peer.lastname}
          />
        );
      })}
    </Container>
  );
};

export default VideoGroup;
