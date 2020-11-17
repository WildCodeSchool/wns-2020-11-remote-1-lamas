import React, { useEffect, useContext } from 'react';
import io from 'socket.io-client';
import './Student.css';
import AppContext from '../../context/AppContext';

const Student = () => {
  let socket;
  const ENDPOINT = 'localhost:8000';
  const emojis = useContext(AppContext);

  useEffect(() => {
    socket = io(ENDPOINT, {
      transports: ['websocket'],
    });

    socket.emit('join');
  }, [ENDPOINT]);

  const handleClick = () => {
    // eslint-disable-next-line no-console
    console.log('clicked');
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
                onClick={handleClick}
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
