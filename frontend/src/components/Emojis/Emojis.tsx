import React from 'react';
import { useParams } from 'react-router';
import { Emoji, emojis, MoodCounter } from '../../shared/Emojis';
import { User } from '../../shared/Users';
import EmojiIcon from './EmojiIcon/EmojiIcon';

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
  const { roomId } = useParams<{ roomId: string }>();

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
              <>
                {emojisCounts && (
                  <EmojiIcon
                    emoji={emoji}
                    emojisCounts={emojisCounts}
                    roomId={roomId}
                  />
                )}
              </>
            )}
          </div>
        ))}
    </div>
  );
};

export default Emojis;
