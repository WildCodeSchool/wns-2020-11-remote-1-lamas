import React, { ReactElement, useState, useEffect } from 'react';
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
  useEffect(() => {
    socket.on('userListPerEmoji', (list: any) => {
      setUserList(list);
    });
  }, [isPopinOpen]);

  const handlePopin = (name: string) => {
    setIsPopinOpen(true);
    socket.emit('getListUsersPerEmoji', roomId, name);
  };
  const list = [
    { _id: '1', firstname: 'Bertrand', lastname: 'Boulard' },
    { _id: '1', firstname: 'Bertrand', lastname: 'Boulard' },
    { _id: '1', firstname: 'Jean-michel sdffsdg ', lastname: 'Boulard' },
    { _id: '1', firstname: 'Bertrand', lastname: 'Boulard' },
    { _id: '1', firstname: 'Bertrand', lastname: 'Boulard' },
    { _id: '1', firstname: 'Bertrand', lastname: 'Boulard' },
    { _id: '1', firstname: 'Bertrand', lastname: 'Boulard' },
    { _id: '1', firstname: 'Bertrand', lastname: 'Boularddefrezferfr' },
  ];

  return (
    <div
      key={emoji.name}
      className={`teacher_emoji_headband ${
        emojisCounts &&
        emojisCounts[emoji.name] === 0 &&
        'teacher_emoji_headband--none'
      }`}
      onMouseEnter={() => handlePopin(emoji.name)}
      onMouseOver={() => handlePopin(emoji.name)}
      onFocus={() => handlePopin(emoji.name)}
      onMouseLeave={() => setIsPopinOpen(false)}
    >
      {isPopinOpen && userList?.length > 0 && (
        <div className="popin">
          {list.map((user) => (
            <p key={user._id}>
              {user.firstname} {user.lastname}
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
