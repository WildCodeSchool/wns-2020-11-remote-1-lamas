import React, { ReactElement, useRef } from 'react';
import './videoRoom.css';

interface VideoRoomProps {
  name: string;
}

const VideoRoom = ({ name }: VideoRoomProps): ReactElement => {
  const userVideoRef = useRef<HTMLVideoElement>(null);

  return (
    <>
      <div className="video-room">
        <video
          playsInline
          muted
          ref={userVideoRef}
          autoPlay
          className="video-room-item"
        />
        <span className="video-room-name">{name}</span>
      </div>
    </>
  );
};

export default VideoRoom;
