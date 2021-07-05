/* eslint-disable no-console */
import React, { useEffect, useRef, useState } from 'react';
import { Button, Container } from '@material-ui/core';
import Peer, { SignalData } from 'simple-peer';
import VideocamRoundedIcon from '@material-ui/icons/VideocamRounded';
import VideocamOffRoundedIcon from '@material-ui/icons/VideocamOffRounded';
import MicRoundedIcon from '@material-ui/icons/MicRounded';
import MicOffRoundedIcon from '@material-ui/icons/MicOffRounded';
import socket from '../../socket/socket';
import './VideoGroup.css';
import { currentUser } from '../../cache';

interface IVideoProps {
  roomId: string;
}

interface IPayload {
  signal: string | SignalData;
  callerID: string;
  id: string;
}

interface IPeerWithId {
  peerID: string;
  peer: Peer.Instance;
}

interface IPeer {
  peer: Peer.Instance;
}

const videoConstraints = {
  height: window.innerHeight / 2,
  width: window.innerWidth / 2,
};

const Video = ({ peer }: IPeer) => {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
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
      }}
      playsInline
      autoPlay
      ref={ref}
    />
  );
};

const VideoGroup = ({ roomId }: IVideoProps): JSX.Element => {
  const [peers, setPeers] = useState<Peer.Instance[]>([]);
  const [isVideo, setIsVideo] = useState(true);
  const [isAudio, setIsAudio] = useState(true);

  const peersRef = useRef<IPeerWithId[]>([]);
  const roomID = roomId;
  const userVideo = useRef<HTMLVideoElement>(null);
  const user = currentUser();

  const removeUserLeavingRoomVideo = (socketId: string) => {
    peersRef.current = peersRef.current.filter((el) => el.peerID !== socketId);
    setPeers(peersRef.current.map((el) => el.peer));
  };

  const toggleUserVideo = () => {
    setIsVideo(!isVideo);
    if (userVideo?.current?.srcObject) {
      (userVideo.current
        .srcObject as MediaStream).getVideoTracks()[0].enabled = !(userVideo
        .current.srcObject as MediaStream).getVideoTracks()[0].enabled;
    }
  };

  const toggleUserAudio = () => {
    setIsAudio(!isAudio);
    if (userVideo?.current?.srcObject) {
      (userVideo.current
        .srcObject as MediaStream).getAudioTracks()[0].enabled = !(userVideo
        .current.srcObject as MediaStream).getAudioTracks()[0].enabled;
    }
  };

  // HELP: useEffect called when a new user join session
  useEffect(() => {
    function createPeer(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      userToSignal: any,
      callerID: string,
      stream: MediaStream
    ) {
      const peer = new Peer({
        initiator: true,
        trickle: false,
        stream,
      });

      peer.on('signal', (signal) => {
        socket({ ...user.connectedUser, roomId }).emit('sending signal', {
          userToSignal,
          callerID,
          signal,
        });
      });

      return peer;
    }

    function addPeer(
      incomingSignal: string | SignalData,
      callerID: string,
      stream: undefined | MediaStream
    ) {
      const peer = new Peer({
        initiator: false,
        trickle: false,
        stream,
      });

      peer.on('signal', (signal) => {
        socket({ ...user.connectedUser, roomId }).emit('returning signal', {
          signal,
          callerID,
        });
      });

      peer.signal(incomingSignal);

      return peer;
    }
    // notification to activate video and audio in the browser
    navigator.mediaDevices
      .getUserMedia({ video: videoConstraints, audio: true })
      // demarre le stream une fois que c'est accepté
      .then((stream: MediaStream) => {
        // si le user a accepté la video
        if (userVideo.current) {
          userVideo.current.srcObject = stream;
          socket({ ...user.connectedUser, roomId }).emit('join room', roomID);
          socket({ ...user.connectedUser, roomId }).on(
            'all users',
            (users: string[]) => {
              const usersPeers: Peer.Instance[] = [];
              users.forEach((userID: string) => {
                const peer = createPeer(
                  userID,
                  socket({ ...user.connectedUser, roomId }).id,
                  stream
                );
                peersRef.current.push({
                  peerID: userID,
                  peer,
                });
                usersPeers.push(peer);
              });
              setPeers(usersPeers);
            }
          );

          socket({ ...user.connectedUser, roomId }).on(
            'user joined',
            (payload: IPayload) => {
              const peer = addPeer(payload.signal, payload.callerID, stream);
              peersRef.current.push({
                peerID: payload.callerID,
                peer,
              });
              setPeers((users) => [...users, peer]);
            }
          );

          socket({ ...user.connectedUser, roomId }).on(
            'receiving returned signal',
            (payload: IPayload) => {
              const item = peersRef.current.find(
                (p) => p.peerID === payload.id
              );
              item?.peer.signal(payload.signal);
            }
          );

          socket({ ...user.connectedUser, roomId }).on(
            'removeUserVideo',
            (socketId: string) => {
              removeUserLeavingRoomVideo(socketId);
            }
          );
        }
      })
      .catch((err) => console.log('erreur dans getUserMedia : ', err));
  }, [roomID, roomId, user?.connectedUser]);

  const getVideoIcon = () => {
    return (
      <Button onClick={toggleUserVideo} disableRipple>
        {isVideo ? <VideocamRoundedIcon /> : <VideocamOffRoundedIcon />}
      </Button>
    );
  };

  const getAudioIcon = () => {
    return (
      <Button onClick={toggleUserAudio} disableRipple>
        {isAudio ? <MicRoundedIcon /> : <MicOffRoundedIcon />}
      </Button>
    );
  };

  return (
    <Container style={{ display: 'flex', flexWrap: 'wrap' }}>
      <video
        muted
        ref={userVideo}
        autoPlay
        playsInline
        style={{
          margin: '1%',
          height: '25%',
          width: '25%',
          borderRadius: '10px',
          objectFit: 'cover',
        }}
      />
      {/* {getVideoIcon()}
      {getAudioIcon()} */}
      {peers.map((peer, index) => {
        // eslint-disable-next-line react/no-array-index-key
        return <Video key={index} peer={peer} />;
      })}
    </Container>
  );
};

export default VideoGroup;
