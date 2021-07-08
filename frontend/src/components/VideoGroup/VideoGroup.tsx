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
  micro: boolean;
  video: boolean;
}

const VideoGroup = ({
  roomId,
  videoStatus,
  microStatus,
}: IVideoProps): JSX.Element => {
  const [peerId, setPeerId] = useState<string>('');
  const peersRef = useRef<IPeerWithId[]>([]);
  const [mount, forceMount] = useState('');
  const user = currentUser();

  const removeUserLeavingRoomVideo = (socketId: string) => {
    peersRef.current = peersRef.current.filter((el) => el.peerID !== socketId);
  };

  // const createPeer = (callerID: string, stream: MediaStream) => {
  //   const peer = new Peer({
  //     initiator: true,
  //     trickle: false,
  //     stream,
  //   });

  //   peer.on('signal', (signal) => {
  //     socket.emit('sending signal', {
  //       callerID,
  //       signal,
  //     });
  //   });

  //   return peer;
  // };

  // const addPeer = (
  //   incomingSignal: string | SignalData,
  //   callerID: string,
  //   stream: undefined | MediaStream
  // ) => {
  //   const peer = new Peer({
  //     initiator: false,
  //     trickle: false,
  //     stream,
  //   });
  //   peer.on('signal', (signal) => {
  //     socket.emit('returning signal', {
  //       signal,
  //       callerID,
  //     });
  //   });

  //   peer.signal(incomingSignal);

  //   return peer;
  // };

  // useEffect called when a new user join session
  useEffect(() => {
    if (user && roomId) {
      // notification to activate video and audio in the browser
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        // demarre le stream une fois que c'est accepté
        .then((stream: MediaStream) => {
          socket.emit('join room', roomId);
          socket.on('all users', (users: string[]) => {
            users.forEach((userID: string) => {
              const peer = createPeer(socket.id, stream);

              if (
                !peersRef.current.find(
                  (peerWithId) => userID === peerWithId.peerID
                )
              ) {
                peersRef.current.push({
                  peerID: userID,
                  peer,
                  micro: true,
                  video: true,
                });
                setPeerId(userID);
              }

              forceMount('reforce');
            });
          });

          socket.on('user joined', (payload: IPayload) => {
            const peer = addPeer(payload.signal, payload.callerID, stream);
            if (
              !peersRef?.current?.find(
                (video) => payload.callerID === video.peerID
              )
            ) {
              peersRef.current.push({
                peerID: payload.callerID,
                peer,
                micro: true,
                video: true,
              });
            }

            forceMount('force');
          });

          socket.on('receiving returned signal', (payload: IPayload) => {
            const item = peersRef?.current?.find(
              (p) => p.peerID === payload.id
            );
            item?.peer?.signal(payload.signal);
          });

          socket.on('removeUserVideo', (socketId: string) => {
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
        return (
          <Video
            key={peer.peerID}
            peer={peer.peer}
            microStatus={microStatus}
            videoStatus={videoStatus}
            peerId={peerId}
            videoPeerId={peer.peerID}
          />
        );
      })}
    </Container>
  );
};

export default VideoGroup;
