import React, { useEffect, useState } from 'react';
import './Student.css';
import { useParams } from 'react-router';
import { useQuery } from '@apollo/client/react/hooks/useQuery';
import { FIND_USER } from '../../../graphql/queries/getUser';
import { User } from '../../../shared/Users';
import socket from '../../../socket/socket';
import Emojis from '../../Emojis/Emojis';
import IconCalls from '../../IconCalls/IconCalls';
import Message from '../Message/Message';
import VideoGroup from '../../VideoGroup/VideoGroup';

const Student = (): JSX.Element => {
  const [studentInfos, setStudentInfos] = useState<User>({
    id: '',
    mood: '',
    actions: [],
  });
  const [videoStatus, setVideoStatus] = useState(true);
  const [microStatus, setMicroStatus] = useState(true);

  const { id, roomId } = useParams<{ id: string; roomId: string }>();

  const { data } = useQuery(FIND_USER, { variables: { userId: id } });

  useEffect(() => {
    if (roomId) {
      socket.emit('studentJoinTheRoom', roomId);

      socket.on('userInfos', (userInfo: User) => {
        setStudentInfos(userInfo);
      });
    }
  }, [roomId]);

  const handleClick = (name: string, category: string): void => {
    if (roomId) {
      socket.emit('changeMood', roomId, id, name, category);
    }
  };

  return (
    <div role="heading" aria-level={2} className="student">
      <div className="student__left">
        <div className="student_visio">
          <VideoGroup
            roomId={roomId}
            videoStatus={videoStatus}
            microStatus={microStatus}
          />
        </div>
        <div className="student_infos">
          <div className="student_lateral_panel">
            <div className="student_emojis_container">
              <div className="student_emojis">
                <Emojis
                  handleClick={handleClick}
                  isStudent
                  studentInfos={studentInfos}
                />
              </div>
            </div>
          </div>
          <IconCalls
            id={id}
            isVideo={videoStatus}
            isMicro={microStatus}
            sendVideoStatus={(video) => setVideoStatus(video)}
            sendMicroStatus={(micro) => setMicroStatus(micro)}
          />
        </div>
      </div>
      <Message />
    </div>
  );
};

export default Student;
