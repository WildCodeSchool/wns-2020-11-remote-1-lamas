import React, { useEffect, useContext } from 'react';
import io from 'socket.io-client';
import './Student.css';
import AppContext from '../../context/AppContext';

const ENDPOINT =
  process.env.NODE_ENV === 'production'
    ? 'https://lamass-project.herokuapp.com'
    : 'localhost:8000';

const socket = io(ENDPOINT, { transports: ['websocket'] });

const Student = () => {
  const emojis = useContext(AppContext);

  useEffect(() => {
    socket.emit('join', {});
  }, []);

  const handleClick = (category, name) => {
    socket.emit('changeMood', category, name);
  };

  return (
    <div className="student">
      <div className="student_visio" />
      <div className="student_lateral_panel">
        <div className="student_emojis_container">
          <div className="student_emojis">
            {emojis.map((emoji) => (
              <button
                key={emoji.name}
                className="student_emoji_button"
                type="button"
                onClick={() => handleClick(emoji.name, emoji.category)}
              >
                <img
                  className="student_emoji_img"
                  src={emoji.image}
                  alt={emoji.name}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Student;
