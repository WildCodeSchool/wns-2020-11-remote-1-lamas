import React, { useRef, useEffect, useState } from 'react';
import Peer from 'simple-peer';
import socket from '../../socket/socket';

export interface IPeer {
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
    socket.emit('switch Video', { peerId, videoStatus });
  }, [videoStatus, peerId]);

  useEffect(() => {
    socket.on('receive change video', (newVideoChange: any) => {
      if (videoPeerId === newVideoChange.peerId && ref && ref.current) {
        (ref.current.srcObject as MediaStream).getVideoTracks()[0].enabled =
          newVideoChange.videoStatus;
      }
    });
  }, [videoStatus, peerId, videoPeerId]);

  useEffect(() => {
    if (ref?.current?.srcObject && isUser) {
      (ref.current
        .srcObject as MediaStream).getAudioTracks()[0].enabled = microStatus;
    }
  }, [microStatus, isUser, videoPeerId]);

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

export default Video;
