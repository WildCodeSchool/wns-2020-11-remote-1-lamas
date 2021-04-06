import React from 'react';
import { Emoji, emojis, MoodCounter } from '../../shared/Emojis';
import { User } from '../../shared/Users';

interface EmojisProps {
  handleClick?: (name: string, category: string) => void;
  isStudent?: boolean;
  emojisCounts?: MoodCounter | null;
  studentInfos?: User;
}

const Emojis: React.FC<EmojisProps> = ({
  handleClick,
  isStudent,
  emojisCounts,
  studentInfos,
}) => {
  const activeButton = (emojiName: string): string => {
    if (
      emojiName === studentInfos?.mood ||
      studentInfos?.actions?.includes(emojiName)
    )
      return 'student_emoji_button--active';
    return '';
  };

  return (
    <div className={`${isStudent ? 'student_emojis' : 'teacher_emojis'}`}>
      {emojis &&
        emojis.map((emoji: Emoji) => (
          <div key={emoji.name}>
            {isStudent ? (
              <button
                key={emoji.name}
                className={`student_emoji_button ${activeButton(emoji.name)}`}
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
