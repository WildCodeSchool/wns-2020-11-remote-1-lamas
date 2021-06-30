/* eslint-disable no-console */
import { Container } from '@material-ui/core';
import { useEffect, useRef, useState } from 'react';
import Peer, { SignalData } from 'simple-peer';
import socket from '../../socket/socket';
import './VideoGroup.css';

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

const Video = ({ peer }: IPeer) => {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    peer.on('stream', (stream: MediaStream) => {
      if (ref && ref.current) {
        ref.current.srcObject = stream;
      }
    });
  }, [peer]);

  return <video playsInline autoPlay ref={ref} />;
};

const VideoGroup = ({ roomId }: IVideoProps): JSX.Element => {
  const [peers, setPeers] = useState<Peer.Instance[]>([]);
  const peersRef = useRef<IPeerWithId[]>([]);
  const roomID = roomId;
  const userVideo = useRef<HTMLVideoElement>(null);

  function createPeer(
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
      socket.emit('sending signal', {
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
      socket.emit('returning signal', { signal, callerID });
    });

    peer.signal(incomingSignal);

    return peer;
  }
  // HELP: useEffect called when a new user join session
  useEffect(() => {
    // notification to activate video and audio in the browser
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      // demarre le stream une fois que c'est accepté
      .then((stream: MediaStream) => {
        console.log('useEffect => stream', stream);
        // si le user a accepté la video
        if (userVideo.current) {
          console.log('useEffect => userVideo', userVideo);
          userVideo.current.srcObject = stream;
          socket.emit('join room', roomID);

          socket.on('all users', (users: any) => {
            const usersPeers: Peer.Instance[] = [];
            users.forEach((userID: string) => {
              const peer = createPeer(userID, socket.id, stream);
              peersRef.current.push({
                peerID: userID,
                peer,
              });
              usersPeers.push(peer);
            });
            setPeers(usersPeers);
          });

          socket.on('user joined', (payload: IPayload) => {
            const peer = addPeer(payload.signal, payload.callerID, stream);
            peersRef.current.push({
              peerID: payload.callerID,
              peer,
            });
            setPeers((users) => [...users, peer]);
          });

          socket.on('receiving returned signal', (payload: IPayload) => {
            const item = peersRef.current.find((p) => p.peerID === payload.id);
            item?.peer.signal(payload.signal);
          });
        }
      })
      .catch((err) => console.log('erreur dans getUserMedia : ', err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [peersRef]);

  return (
    <Container>
      <video muted ref={userVideo} autoPlay playsInline />
      {peers.map((peer, index) => {
        // eslint-disable-next-line react/no-array-index-key
        return <Video key={index} peer={peer} />;
      })}
    </Container>
  );
};

export default VideoGroup;
