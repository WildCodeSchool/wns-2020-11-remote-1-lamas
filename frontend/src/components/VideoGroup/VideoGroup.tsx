/* eslint-disable no-console */
import React, { useEffect, useRef, useState } from 'react';
import { Button, Container } from '@material-ui/core';
import Peer, { SignalData } from 'simple-peer';
import socket from '../../socket/socket';
import './VideoGroup.css';
import { currentUser } from '../../cache';

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

interface IPeer {
  peer: Peer.Instance;
  microStatus: boolean;
  videoStatus: boolean;
  peerId: string;
  videoPeerId: string;
}

const Video = ({
  peer,
  microStatus,
  videoStatus,
  peerId,
  videoPeerId,
}: IPeer) => {
  const ref = useRef<HTMLVideoElement>(null);
  const isUser = peerId === videoPeerId;

  useEffect(() => {
    if (ref?.current?.srcObject && isUser) {
      (ref.current
        .srcObject as MediaStream).getVideoTracks()[0].enabled = videoStatus;

      // socket envoie le boolean et le peer id
    }
  }, [videoStatus, isUser, videoPeerId]);

  useEffect(() => {
    if (ref?.current?.srcObject && isUser) {
      (ref.current
        .srcObject as MediaStream).getAudioTracks()[0].enabled = microStatus;
    }
  }, [microStatus, isUser, videoPeerId]);

  // useEffect(() => {
  //   if (ref?.current?.srcObject && isUser) {
  //     (ref.current.srcObject as MediaStream)
  //       .getTracks()
  //       .forEach(function (track) {
  //         console.log('getTracks', track);
  //         if (
  //           track.readyState === 'live' &&
  //           track.kind === 'video' &&
  //           !videoStatus
  //         ) {
  //           track.stop();
  //         } else {
  //           peer.addTrack(track, ref?.current?.srcObject as MediaStream);
  //         }
  //       });
  //     console.log('remove track video');
  //     // peer.removeTrack(
  //     //   (ref.current.srcObject as MediaStream).getVideoTracks()[0],
  //     //   ref.current.srcObject as MediaStream
  //     // );
  //     // (ref.current
  //     //   .srcObject as MediaStream).getVideoTracks()[0].enabled = videoStatus;
  //   }
  // }, [videoStatus, isUser, videoPeerId, peer]);

  // useEffect(() => {
  //   if (ref?.current?.srcObject && isUser) {
  //     (ref.current.srcObject as MediaStream)
  //       .getTracks()
  //       .forEach(function (track) {
  //         console.log('getTracks', track);
  //         if (
  //           track.readyState === 'live' &&
  //           track.kind === 'audio' &&
  //           !microStatus
  //         ) {
  //           track.stop();
  //         }
  //       });
  //     // peer.removeTrack(
  //     //   (ref.current.srcObject as MediaStream).getAudioTracks()[0],
  //     //   ref.current.srcObject as MediaStream
  //     // );

  //     // (ref.current
  //     //   .srcObject as MediaStream).getAudioTracks()[0].enabled = microStatus;
  //   }
  // }, [microStatus, isUser, videoPeerId]);

  useEffect(() => {
    console.log('VIDEO COMPONENT => useEffect peer on stream');
    peer.on('stream', (stream: MediaStream) => {
      if (ref && ref.current) {
        ref.current.srcObject = stream;
      }
    });
  }, [peer]);

  return (
    <video
      style={{
        margin: '2%',
        height: '25%',
        width: '25%',
        borderRadius: '10px',
        objectFit: 'cover',
      }}
      playsInline
      autoPlay
      ref={ref}
    />
  );
};

const VideoGroup = ({
  roomId,
  videoStatus,
  microStatus,
}: IVideoProps): JSX.Element => {
  const [peerId, setPeerId] = useState<string>('');
  const peersRef = useRef<IPeerWithId[]>([]);
  const user = currentUser();

  const removeUserLeavingRoomVideo = (socketId: string) => {
    peersRef.current = peersRef.current.filter((el) => el.peerID !== socketId);
  };

  const createPeer = (callerID: string, stream: MediaStream) => {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream,
    });

    peer.on('signal', (signal) => {
      console.log('CREATE PEER => peer on signal');
      socket.emit('sending signal', {
        callerID,
        signal,
      });
    });
    console.log('CREATE PEER => new peer', peer);
    return peer;
  };

  const addPeer = (
    incomingSignal: string | SignalData,
    callerID: string,
    stream: undefined | MediaStream
  ) => {
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream,
    });
    peer.on('signal', (signal) => {
      console.log('ADD PEER => SIGNAL');

      socket.emit('returning signal', {
        signal,
        callerID,
      });
    });

    peer.signal(incomingSignal);

    return peer;
  };

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
          socket.emit('join room', roomId);

          console.log('useEffect => all users');
          socket.on('all users', (users: string[]) => {
            console.log('useEffect => response all users', users);
            users.forEach((userID: string) => {
              console.log(socket.id);
              const peer = createPeer(socket.id, stream);
              console.log('createPeer', peer);
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
            });
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
                micro: true,
                video: true,
              });
            }
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
      {/* <video
        muted
        ref={userVideo}
        autoPlay
        playsInline
        style={{
          margin: '2%',
          height: '25%',
          width: '25%',
          borderRadius: '10px',
          objectFit: 'cover',
        }}
      /> */}
      {peersRef?.current.map((peer: IPeerWithId) => {
        // eslint-disable-next-line react/no-array-index-key
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
