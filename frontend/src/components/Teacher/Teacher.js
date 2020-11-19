import React, { useState, useEffect, useContext } from 'react';
import io from 'socket.io-client';
import AppContext from '../../context/AppContext';
import './Teacher.css';

const ENDPOINT =
  process.env.NODE_ENV === 'production'
    ? 'https://lama-project.herokuapp.com'
    : 'localhost:8000';

const socket = io(ENDPOINT, { transports: ['websocket'] });

const Teacher = () => {
  const emojisList = useContext(AppContext);
  const [emojisCounts, setEmojisCounts] = useState({
    Happy: 0,
    Dead: 0,
    Thinking: 0,
    Break: 0,
    SlowDown: 0,
  });
  const [totalStudents, setTotalStudents] = useState(0);

  const handleConnection = () => {
    socket.on('getIncrement', (objectEmoji) => {
      setEmojisCounts(objectEmoji.moodCounter);
    });
  };

  useEffect(() => {
    socket.emit('joinTeacher', {});
  })

  useEffect(() => {

    socket.on('joinTeacher', (objectEmoji) => {
      setEmojisCounts(objectEmoji.moodCounter);
    });

    socket.on('sendUserCount', (userCount) => {
      console.log(userCount)
      setTotalStudents(userCount);
    });
  }, []);

  const getColor = () => {
    const unhappys = emojisCounts.Thinking + emojisCounts.Dead;
    const unhappysPercentage = (unhappys / totalStudents) * 100;

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
        className="teacher_vertical_panel"
        style={{ backgroundColor: getColor() }}
      >
        <div className="teacher_emojis_container">
          <div className="teacher_emojis">
            {emojisList.map((emoji) => (
              <div key={emoji.name} className="teacher_emoji_headband">
                <img
                  className="teacher_emoji_img"
                  src={emoji.image}
                  alt={emoji.name}
                />
                <p>{emojisCounts[emoji.name]}</p>
              </div>
            ))}
          </div>
          <p>student length: {totalStudents}</p>
        </div>
      </div>
    </div>
  );
};

export default Teacher;
