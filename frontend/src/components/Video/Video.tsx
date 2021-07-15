import './video.css';
import React, { useRef, useEffect } from 'react';
import Peer from 'simple-peer';
import socket from '../../socket/socket';

export interface IPeer {
  peer: Peer.Instance;
  microStatus: boolean;
  videoStatus: boolean;
  peerId: string;
  videoPeerId: string;
  firstname: string;
  lastname: string;
}

const Video = ({
  peer,
  microStatus,
  videoStatus,
  peerId,
  videoPeerId,
  firstname,
  lastname,
}: IPeer): JSX.Element => {
  const ref = useRef<HTMLVideoElement>(null);
  const isUser = peerId === videoPeerId;

  useEffect(() => {
    peer.on('stream', (stream: MediaStream) => {
      if (ref && ref.current) {
        ref.current.srcObject = stream;
      }
    });
  }, [peer]);

  useEffect(() => {
    if (ref?.current?.srcObject && isUser) {
      (ref.current
        .srcObject as MediaStream).getVideoTracks()[0].enabled = videoStatus;
    }
  }, [videoStatus, isUser, videoPeerId]);

  useEffect(() => {
    socket.emit('switch', { peerId, videoStatus, microStatus });
  }, [videoStatus, microStatus, peerId]);

  useEffect(() => {
    socket.on('receive change', (mediaChange: any) => {
      if (videoPeerId === mediaChange.peerId && ref && ref.current) {
        (ref.current.srcObject as MediaStream).getVideoTracks()[0].enabled =
          mediaChange.videoStatus;

        (ref.current.srcObject as MediaStream).getAudioTracks()[0].enabled =
          mediaChange.microStatus;
      }
    });
  }, [videoStatus, microStatus, peerId, videoPeerId]);

  useEffect(() => {
    if (ref?.current?.srcObject && isUser) {
      (ref.current
        .srcObject as MediaStream).getAudioTracks()[0].enabled = microStatus;
    }
  }, [microStatus, isUser, videoPeerId]);

  return (
    <div className="video">
      <video
        className="video-content"
        playsInline
        autoPlay
        ref={ref}
        muted={peerId === videoPeerId}
      />
      <span className="video-room-name">
        {firstname} {lastname}
      </span>
    </div>
  );
};

export default Video;
