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
}

interface IPeerWithId {
  peerID: string;
  peer: Peer.Instance;
  micro?: boolean;
  video?: boolean;
}

const VideoGroup = ({
  roomId,
  videoStatus,
  microStatus,
}: IVideoProps): JSX.Element => {
  const [peers, setPeers] = useState<Peer.Instance[]>([]);
  const peersRef = useRef<IPeerWithId[]>([]);
  const roomID = roomId;
  const userVideo = useRef<HTMLVideoElement>(null);
  const user = currentUser();

  const removeUserLeavingRoomVideo = (socketId: string) => {
    peersRef.current = peersRef.current.filter((el) => el.peerID !== socketId);
    setPeers(peersRef.current.map((el) => el.peer));
  };

  useEffect(() => {
    if (userVideo?.current?.srcObject) {
      (userVideo.current
        .srcObject as MediaStream).getVideoTracks()[0].enabled = videoStatus;
    }
  }, [videoStatus]);

  useEffect(() => {
    if (userVideo?.current?.srcObject) {
      (userVideo.current
        .srcObject as MediaStream).getAudioTracks()[0].enabled = microStatus;
    }
  }, [microStatus]);

  // HELP: useEffect called when a new user join session
  useEffect(() => {
    if (user && roomId) {
      console.log('useEffect => user', user);
      // notification to activate video and audio in the browser
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        // demarre le stream une fois que c'est accepté
        .then((stream: MediaStream) => {
          console.log('useEffect => join room');
          socket.emit('join room', roomID);

          console.log('useEffect => all users');
          socket.on('all users', (users: string[]) => {
            console.log('useEffect => response all users', users);
            const usersPeers: Peer.Instance[] = [];
            users.forEach((userID: string) => {
              console.log(userID, socket.id);
              const peer = createPeer(userID, socket.id, stream);
              console.log('createPeer', peer);
              if (
                !peersRef.current.find(
                  (peerWithId) => userID === peerWithId.peerID
                )
              ) {
                peersRef.current.push({
                  peerID: userID,
                  peer,
                });
              }
              usersPeers.push(peer);
            });
            console.log('update peers after createPeer', usersPeers);
            setPeers(usersPeers);
          });

          console.log('useEffect => user joined');
          socket.on('user joined', (payload: IPayload) => {
            const peer = addPeer(payload.signal, payload.callerID, stream);
            console.log('USER JOINED');
            if (
              !peersRef?.current?.find(
                (video) => payload.callerID === video.peerID
              )
            ) {
              peersRef.current.push({
                peerID: payload.callerID,
                peer,
              });
            }

            console.log('update peers after addPeer');
            setPeers([...peers, peer]);
          });

          socket.on('receiving returned signal', (payload: IPayload) => {
            console.log('useEffect => receiving returned signal');
            const item = peersRef?.current?.find(
              (p) => p.peerID === payload.id
            );
            item?.peer?.signal(payload.signal);
          });

          socket.on('removeUserVideo', (socketId: string) => {
            console.log('useEffect => removeUserVideo');
            removeUserLeavingRoomVideo(socketId);
          });
        })
        .catch((err) => console.log('erreur dans getUserMedia : ', err));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container style={{ display: 'flex', flexWrap: 'wrap' }}>
      {peersRef?.current.map((peer: IPeerWithId) => {
        return <Video key={peer.peerID} peer={peer.peer} />;
      })}
    </Container>
  );
};

export default VideoGroup;
