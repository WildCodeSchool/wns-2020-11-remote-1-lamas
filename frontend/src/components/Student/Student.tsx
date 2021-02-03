import React, { useEffect, useState } from 'react';
import './Student.css';
import Emojis from '../Emojis/Emojis';
import socket from '../../socket/socket';
import { User } from '../../shared/Users';

const Student = (): JSX.Element => {
  const [studentInfos, setStudentInfos] = useState<User>({
    socketId: '',
    mood: '',
    actions: [],
  });

  useEffect(() => {
    socket.emit('join', {});
    socket.on('userInfos', (user: User) => {
      setStudentInfos(user);
    });
  }, []);

  const handleClick = (name: string, category: string): void => {
    socket.emit('changeMood', name, category);
  };

  return (
    <div role="heading" aria-level={2} className="student">
      <div className="student_visio" />
      <div className="student_lateral_panel">
        <div className="student_emojis_container">
          <Emojis
            handleClick={handleClick}
            isStudent
            studentInfos={studentInfos}
          />
        </div>
      </div>
    </div>
  );
};

export default Student;
