import React, { useState, useEffect, useContext } from 'react';
import io from 'socket.io-client';
import AppContext from '../../context/AppContext';
import './Teacher.css';

const Teacher = () => {
  const emojis = useContext(AppContext);
  const [emojisList, setEmojisList] = useState(emojis);
  const [studentLength, setStudentLength] = useState(0);

  let socket;
  const ENDPOINT = 'localhost:8000';

  useEffect(() => {
    socket = io(ENDPOINT, {
      transports: ['websocket'],
    });

    socket.on('getIncrement', (emojiObject) => {
      setEmojisList(
        emojisList.map((emoji) => {
          return emoji.id === emojiObject.id
            ? { ...emoji, counter: emojiObject.counter }
            : emoji;
        })
      );
    });
  }, [emojisList, ENDPOINT]);

  useEffect(() => {
    socket.on('getLength', (length) => {
      setStudentLength(length);
    });
  }, [studentLength]);

  return (
    <div className="teacher">
      <div className="teacher_visio" />
      <div className="teacher_vertical_panel">
        <div className="teacher_emojis_container">
          <div className="teacher_emojis">
            {emojis.map((emoji) => (
              <div key={emoji.name} className="teacher_emoji_headband">
                <img
                  className="teacher_emoji_img"
                  src={emoji.image}
                  alt={emoji.name}
                />
                <p>{emoji.counter}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Teacher;
