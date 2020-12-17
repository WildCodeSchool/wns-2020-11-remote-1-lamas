import React, { useEffect, useContext } from 'react';
import { io, Socket } from 'socket.io-client';
import './Student.css';
import AppContext from '../../context/AppContext';
import { Emoji } from '../../App';

const ENDPOINT =
  process.env.NODE_ENV === 'production'
    ? 'https://lamaswild.herokuapp.com/'
    : 'localhost:8000';

const socket: Socket = io(ENDPOINT, {
  transports: ['websocket'],
});

const Student = (): JSX.Element => {
  const emojis: Emoji[] | null = useContext(AppContext);

  useEffect(() => {
    socket.emit('join', {});
  }, []);

  const handleClick = (category: string, name: string): void => {
    socket.emit('changeMood', category, name);
  };

  return (
    <div className="student">
      <div className="student_visio" />
      <div className="student_lateral_panel">
        <div className="student_emojis_container">
          <div className="student_emojis">
            {emojis &&
              emojis.map((emoji: Emoji) => (
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
