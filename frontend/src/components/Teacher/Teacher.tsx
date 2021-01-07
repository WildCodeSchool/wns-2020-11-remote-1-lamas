import React, { useState, useEffect, useContext } from 'react';
import socket from '../../socket/socket'
import Emojis from '../Emojis/Emojis'
import './Teacher.css';

export interface MoodCounter {
  [k: string]: number;
}

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

  const handleConnection = (): void => {
    socket.on('getIncrement', (moodCounter: MoodCounter) => {
      setEmojisCounts(moodCounter);
    });
  };

  useEffect(() => {
    socket.emit('joinTeacher', {});
  });

  useEffect(() => {
    socket.on('joinTeacher', (moodCounter: MoodCounter) => {
      setEmojisCounts(moodCounter);
    });

    socket.on('sendUserCount', (userCount: number) => {
      console.log(userCount);
      setTotalStudents(userCount);
    });
  }, []);

  const getColor = (): string => {
    const unhappys: number = emojisCounts.Thinking + emojisCounts.Dead;
    const unhappysPercentage: number = (unhappys / totalStudents) * 100;

    if (unhappysPercentage >= 20 && unhappysPercentage < 50) {
      return 'rgba(255, 249, 61, 0.7)';
    }
    if (unhappysPercentage >= 50 && unhappysPercentage < 80) {
      return 'rgba(230, 147, 5, 0.7)';
    }
    if (unhappysPercentage >= 80) {
      return 'rgba(235, 0, 0, 0.7)';
    }
    return 'rgba(148, 234, 72, 0.7)';
  };

  useEffect(() => {
    handleConnection();
  }, [emojisCounts]);

  return (
    <div className="teacher">
      <div className="teacher_visio" />
      <div
        role="heading"
        aria-level={2}
        className="teacher_vertical_panel"
        style={{ backgroundColor: getColor() }}
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
