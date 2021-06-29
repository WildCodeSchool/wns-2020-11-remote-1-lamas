/* eslint-disable no-console */
import { Container, Button } from '@material-ui/core';
import { useEffect, useRef, useState } from 'react';
import Peer, { SignalData } from 'simple-peer';
import socket from '../../socket/socket';
import './Video.css';

interface IVideo {
  yourId: string;
  stream: undefined | MediaStream;
  receivingCall: boolean;
  caller: string;
  callerSignal: string | SignalData;
  callAccepted: boolean;
  isCaller: boolean;
}

const initialVideo: IVideo = {
  yourId: '',
  stream: undefined,
  receivingCall: false,
  caller: '',
  callerSignal: '',
  callAccepted: false,
  isCaller: false,
};

const Video = (): JSX.Element => {
  const [video, setVideo] = useState(initialVideo);
  const [users, setUsers] = useState({});

  const userVideo = useRef<HTMLVideoElement>(null);
  const partnerVideo = useRef<HTMLVideoElement>(null);
  // const actualSocket = useRef()

  // HELP: useEffect called when a new user join session
  useEffect(() => {
    // actualSocket.current = socket
    // notification to activate video and audio in the browser
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      // demarre le stream une fois que c'est accepté
      .then((stream: MediaStream) => {
        console.log('useEffect => stream', stream);
        setVideo({ ...video, stream });
        // si le user a accepté la video
        if (userVideo.current) {
          console.log('useEffect => userVideo', userVideo);
          userVideo.current.srcObject = stream;
        }
      })
      .catch((err) => console.log('erreur dans getUserMedia : ', err));

    socket.on('yourId', (id: string) => {
      setVideo({ ...video, yourId: id });
    });

    socket.on('allUsers', (allUsers: any) => {
      setUsers(allUsers);
    });

    // socket reçue du back, de la personne qui nous appel avec son id (from) + son signal
    socket.on(
      'userCallingMe',
      (data: { from: string; signal: string | SignalData }) => {
        setVideo({
          ...video,
          receivingCall: true,
          caller: data.from,
          callerSignal: data.signal,
        });
      }
    );
  }, [video]); // A REVOIR

  const callPeer = (id: string) => {
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: video.stream,
    });

    // capte le signal
    peer.on('signal', (data: unknown) => {
      socket.emit('callUser', {
        userToCall: id,
        signalData: data,
        from: video.yourId,
      });
    });

    // catch the stream
    peer.on('stream', (stream: MediaStream) => {
      if (partnerVideo.current) {
        partnerVideo.current.srcObject = stream;
      }
    });

    // la connexion se fait entre les deux car l'appel est accepté
    socket.on('callAccepted', (signal: string | SignalData) => {
      setVideo({ ...video, callAccepted: true });
      peer.signal(signal);
    });
  };

  const acceptCall = () => {
    setVideo({
      ...video,
      callAccepted: true,
      receivingCall: false,
    });

    // create new peer after call accepted
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: video.stream,
    });

    peer.on('signal', (data) => {
      socket.emit('acceptCall', { signal: data, to: video.caller });
    });

    peer.on('stream', (stream) => {
      if (partnerVideo.current) {
        partnerVideo.current.srcObject = stream;
      }
    });

    peer.signal(video.callerSignal);
  };

  // --------

  let UserVideo;
  if (video.stream) {
    UserVideo = (
      <video playsInline muted ref={userVideo} autoPlay className="video" />
    );
  }

  let PartnerVideo;
  if (video.callAccepted) {
    PartnerVideo = <video playsInline muted ref={partnerVideo} autoPlay />;
  }

  let incomingCall;
  if (video.receivingCall) {
    incomingCall = (
      <div>
        <h1>{video.caller} is calling you</h1>
        <Button onClick={acceptCall}>Accept</Button>
      </div>
    );
  }

  return (
    <Container>
      <div>
        {UserVideo}
        {PartnerVideo}
      </div>
      <div>
        {Object.keys(users).map((key) => {
          if (key === video.yourId) {
            return null;
          }

          return (
            !video.callAccepted && (
              <Button key={key} onClick={() => callPeer(key)}>
                Call {key}
              </Button>
            )
          );
        })}
      </div>
      <div>{incomingCall}</div>
    </Container>
  );
};

export default Video;
