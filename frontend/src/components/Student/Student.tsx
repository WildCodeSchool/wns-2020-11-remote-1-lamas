import React, { useEffect, useContext } from 'react';
import { io, Socket } from 'socket.io-client';
import './Student.css';
import Emojis from '../Emojis/Emojis';

const ENDPOINT =
  process.env.NODE_ENV === 'production'
    ? 'https://lamass-project.herokuapp.com'
    : 'localhost:8000';

const socket: Socket = io(ENDPOINT, {
  transports: ['websocket'],
});

const Student = (): JSX.Element => {
  useEffect(() => {
    socket.emit('join', {});
  }, []);

  const handleClick = (category: string, name: string): void => {
    socket.emit('changeMood', category, name);
  };

  return (
    <div role='heading' aria-level={2} className="student">
      <div className="student_visio" />
      <div className="student_lateral_panel">
        <div className="student_emojis_container">
          <Emojis handleClick={handleClick} isStudent />
        </div>
      </div>
    </div>
  );
};

export default Student;
