import React, { useEffect } from 'react';
import './Student.css';
import Emojis from '../Emojis/Emojis';
import socket from '../../socket/socket';
import { User } from '../../shared/Users';

const Student = (): JSX.Element => {
  useEffect(() => {
    socket.emit('join', {});
  }, []);

  const handleClick = (category: string, name: string): void => {
    socket.emit('changeMood', category, name);
  };

  return (
    <div role="heading" aria-level={2} className="student">
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
