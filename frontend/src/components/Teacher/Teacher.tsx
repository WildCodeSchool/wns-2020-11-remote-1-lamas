import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import socket from '../../socket/socket';
import Emojis from '../Emojis/Emojis';
import './Teacher.css';
import getColorByMood from '../Methods/getColorByMood';
import { MoodCounter } from '../../shared/Emojis';

const Teacher = (): JSX.Element => {
  const [totalStudents, setTotalStudents] = useState(0);
  const [emojisCounts, setEmojisCounts] = useState<MoodCounter | null>(null);
  const { id, roomId } = useParams<{ id: string; roomId: string }>();

  useEffect(() => {
    return () => {
      socket.emit('disconnectFromRoom', roomId, id);
    };
  }, [id, roomId]);

  useEffect(() => {
    socket.emit('joinTeacher', roomId, id);
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

  return (
    <div className="teacher">
      <div className="teacher_visio" />
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
          <p>student length: {totalStudents}</p>
        </div>
      </div>
    </div>
  );
};

export default Teacher;
