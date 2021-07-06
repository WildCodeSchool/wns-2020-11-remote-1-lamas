import React, { ReactElement, useState, useEffect } from 'react';
import { currentUser } from '../../../cache';
import { Emoji, MoodCounter } from '../../../shared/Emojis';
import socket from '../../../socket/socket';
import './EmojiIcon.css';

interface EmojiIconProps {
  emoji: Emoji;
  emojisCounts: MoodCounter | null;
  roomId: string;
}

interface IUserList {
  firstname: string;
  lastname: string;
  _id: string;
}

const EmojiIcon = ({
  emoji,
  emojisCounts,
  roomId,
}: EmojiIconProps): ReactElement => {
  const [isPopinOpen, setIsPopinOpen] = useState(false);
  const [userList, setUserList] = useState<IUserList[]>([]);
  const user = currentUser();

  useEffect(() => {
    if (user) {
      socket.on(`userListPerEmoji-${emoji.name}`, (list: IUserList[]) => {
        setUserList(list);
      });
    }
  }, [emoji.name, roomId, user]);

  const handlePopin = (name: string) => {
    if (user && roomId) {
      socket.emit('getListUsersPerEmoji', roomId, name);
      setIsPopinOpen(true);
    }
  };

  return (
    <div
      key={emoji.name}
      className={`teacher_emoji_headband ${
        emojisCounts &&
        emojisCounts[emoji.name] === 0 &&
        'teacher_emoji_headband--none'
      }`}
      onMouseEnter={() => handlePopin(emoji.name)}
      onMouseLeave={() => setIsPopinOpen(false)}
    >
      {isPopinOpen && userList?.length > 0 && (
        <div className="popin">
          {userList.map((userFromList) => (
            <p key={userFromList._id}>
              {userFromList.firstname} {userFromList.lastname}
            </p>
          ))}
        </div>
      )}
      <img className="teacher_emoji_img" src={emoji.image} alt={emoji.name} />
      <p role="paragraph" className="teacher_emoji_count">
        {emojisCounts && emojisCounts[emoji.name]}
      </p>
    </div>
  );
};

export default EmojiIcon;
