import React, { useEffect, useState } from 'react';
import './Student.css';
import { useParams } from 'react-router';
import { useQuery } from '@apollo/client/react/hooks/useQuery';
import Emojis from '../Emojis/Emojis';
import socket from '../../socket/socket';
import { User } from '../../shared/Users';
import { FIND_USER } from '../../graphql/queries/getUser';
import VideoGroup from '../VideoGroup/VideoGroup';

const Student = (): JSX.Element => {
  const [studentInfos, setStudentInfos] = useState<User>({
    id: '',
    mood: '',
    actions: [],
  });
  const { id, roomId } = useParams<{ id: string; roomId: string }>();

  const { data } = useQuery(FIND_USER, { variables: { userId: id } });

  useEffect(() => {
    return () => {
      console.log('yooo');
      socket.emit('disconnectFromRoom', roomId, id);
    };
  }, [id, roomId]);

  useEffect(() => {
    if (data?.getUser) {
      socket.emit(
        'join',
        roomId,
        id,
        data?.getUser?.firstname,
        data?.getUser?.lastname
      );
      socket.on('userInfos', (user: User) => {
        setStudentInfos(user);
      });
    }
  }, [
    roomId,
    id,
    data?.getUser,
    data?.getUser?.firstname,
    data?.getUser?.lastname,
  ]);

  const handleClick = (name: string, category: string): void => {
    socket.emit('changeMood', roomId, id, name, category);
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
          <VideoGroup roomId={roomId} />
        </div>
      </div>
    </div>
  );
};

export default Student;
