import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';

import { useQuery } from '@apollo/client/react/hooks/useQuery';
import { MoodCounter } from '../../../shared/Emojis';
import socket from '../../../socket/socket';
import Emojis from '../../Emojis/Emojis';
import getColorByMood from '../../Methods/getColorByMood';
import './Teacher.css';
import IconCalls from '../../IconCalls/IconCalls';
import { FIND_USER } from '../../../graphql/queries/getUser';
import Message from '../Message/Message';
import VideoGroup from '../../VideoGroup/VideoGroup';
import { currentUser } from '../../../cache';

const Teacher = (): JSX.Element => {
  const [totalStudents, setTotalStudents] = useState(0);
  const [videoStatus, setVideoStatus] = useState(true);
  const [microStatus, setMicroStatus] = useState(true);
  const [emojisCounts, setEmojisCounts] = useState<MoodCounter>({
    happy: 0,
    dead: 0,
    thinking: 0,
    coffee: 0,
    slowDown: 0,
    question: 0,
  });
  const { id, roomId } = useParams<{ id: string; roomId: string }>();
  const { data } = useQuery(FIND_USER, { variables: { userId: id } });
  const user = currentUser();

  useEffect(() => {
    console.log('TEACHER.TSX');

    if (user && roomId) {
      console.log(user);

      socket.emit('teacherJoinTheRoom', roomId);
      socket.on('sendUserCount', (userCount: number) => {
        setTotalStudents(userCount);
      });
      socket.on('updateEmojisCount', (moodCounter: MoodCounter) => {
        setEmojisCounts(moodCounter);
      });
      socket.on('getDecrement', (moodCounter: MoodCounter) => {
        setEmojisCounts(moodCounter);
      });
    }
  }, [roomId, user]);

  return (
    <div className="teacher">
      <div className="teacher__left">
        <div className="teacher_visio">
          <VideoGroup
            roomId={roomId}
            videoStatus={videoStatus}
            microStatus={microStatus}
          />
        </div>
        <div className="teacher_infos">
          <div
            role="heading"
            aria-level={2}
            className="teacher_vertical_panel"
            style={{
              backgroundColor: emojisCounts
                ? getColorByMood(emojisCounts, totalStudents)
                : 'rgba(148, 234, 72, 0.7)',
            }}
          >
            <div className="teacher_emojis_container">
              <div className="teacher_emojis">
                <Emojis emojisCounts={emojisCounts} />
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

export default Teacher;
