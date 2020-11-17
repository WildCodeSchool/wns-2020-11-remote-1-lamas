import React from 'react';
import './Student.css';
import Thinking from '../../asset/thinking.svg';
import Dead from '../../asset/dead.svg';
import Happy from '../../asset/happy.svg';
import Break from '../../asset/cup.svg';
import SlowDown from '../../asset/turtle.svg';

const emojis = [
  {
    id: 1,
    name: 'Thinking',
    counter: 0,
    image: Thinking,
    category: 'Emotion',
  },
  {
    id: 2,
    name: 'Dead',
    counter: 0,
    image: Dead,
    category: 'Emotion',
  },
  {
    id: 3,
    name: 'Happy',
    counter: 0,
    image: Happy,
    category: 'Emotion',
  },
  {
    id: 4,
    name: 'Break',
    counter: 0,
    image: Break,
    category: 'Action',
  },
  {
    id: 5,
    name: 'Slow down',
    counter: 0,
    image: SlowDown,
    category: 'Action',
  },
];

const Student = () => {
  // const [isClicked, setIsClicked] = useState(false);

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
