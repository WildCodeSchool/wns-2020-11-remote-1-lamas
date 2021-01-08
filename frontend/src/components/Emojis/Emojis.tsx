import React from 'react';
import { Emoji, emojis, MoodCounter } from '../../datas/Emojis';

interface EmojisProps {
  handleClick?: (name: string, category: string) => void;
  isStudent?: boolean;
  emojisCounts?: MoodCounter;
}

const Emojis: React.FC<EmojisProps> = ({
  handleClick,
  isStudent,
  emojisCounts,
}) => {
  return (
    <div className={`${isStudent ? 'student_emojis' : 'teacher_emojis'}`}>
      {emojis &&
        emojis.map((emoji: Emoji) => (
          <div key={emoji.name}>
            {isStudent ? (
              <button
                key={emoji.name}
                className="student_emoji_button"
                type="button"
                onClick={() =>
                  handleClick && handleClick(emoji.name, emoji.category)
                }
              >
                <img
                  className="student_emoji_img"
                  src={emoji.image}
                  alt={emoji.name}
                />
              </button>
            ) : (
              <div key={emoji.name} className="teacher_emoji_headband">
                <img
                  className="teacher_emoji_img"
                  src={emoji.image}
                  alt={emoji.name}
                />
                <p role="paragraph">
                  {emojisCounts && emojisCounts[emoji.name]}
                </p>
              </div>
            )}
          </div>
        ))}
    </div>
  );
};

export default Emojis;
