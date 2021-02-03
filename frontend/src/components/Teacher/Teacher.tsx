import React, { useState, useEffect } from 'react';
import socket from '../../socket/socket';
import Emojis from '../Emojis/Emojis';
import './Teacher.css';
import getColorByMood from '../Methods/getColorByMood';
import { MoodCounter } from '../../datas/Emojis';

const Teacher = (): JSX.Element => {
  const [emojisCounts, setEmojisCounts] = useState<MoodCounter>({
    happy: 0,
    dead: 0,
    thinking: 0,
    coffee: 0,
    slowDown: 0,
    question: 0,
  });
  const [totalStudents, setTotalStudents] = useState(0);

  useEffect(() => {
    socket.emit('joinTeacher', {});
    socket.on('sendUserCount', (userCount: number) => {
      setTotalStudents(userCount);
    });
    socket.on('getIncrement', (moodCounter: MoodCounter) => {
      setEmojisCounts(moodCounter);
    });
    socket.on('getDecrement', (moodCounter: MoodCounter) => {
      setEmojisCounts(moodCounter);
    });
  }, []);

  return (
    <div className="teacher">
      <div className="teacher_visio" />
      <div
        role="heading"
        aria-level={2}
        className="teacher_vertical_panel"
        style={{ backgroundColor: getColorByMood(emojisCounts, totalStudents) }}
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
