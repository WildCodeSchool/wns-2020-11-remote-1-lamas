import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { MoodCounter } from '../../../shared/Emojis';
import socket from '../../../socket/socket';
import Emojis from '../../Emojis/Emojis';
import getColorByMood from '../../Methods/getColorByMood';
import './Teacher.css';
import VideoRoom from '../../videoRoom/videoRoom';
import IconCalls from '../../IconCalls/IconCalls';

const Teacher = (): JSX.Element => {
  const [totalStudents, setTotalStudents] = useState(0);

  const [emojisCounts, setEmojisCounts] = useState<MoodCounter | null>(null);
  const { id, roomId } = useParams<{ id: string; roomId: string }>();

  useEffect(() => {
    socket.emit('studentJoinTheRoom', roomId, id);
    socket.on('sendUserCount', (userCount: number) => {
      setTotalStudents(userCount);
    });
    socket.on('updateEmojisCount', (moodCounter: MoodCounter) => {
      setEmojisCounts(moodCounter);
    });
    socket.on('getDecrement', (moodCounter: MoodCounter) => {
      setEmojisCounts(moodCounter);
    });
  }, [roomId, id]);

  const temporaryArray = [{ name: 'emeline' }];

  return (
    <div className="teacher">
      <div className="teacher_visio">
        {temporaryArray &&
          temporaryArray.map((item) => {
            return (
              <>
                <VideoRoom name={item.name} />
              </>
            );
          })}
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
        <IconCalls id={id} />
      </div>
    </div>
  );
};

export default Teacher;
