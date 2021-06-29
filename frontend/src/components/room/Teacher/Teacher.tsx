import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import { MoodCounter } from '../../../shared/Emojis';
import socket from '../../../socket/socket';
import Emojis from '../../Emojis/Emojis';
import getColorByMood from '../../Methods/getColorByMood';
import './Teacher.css';
import VideoRoom from '../../videoRoom/videoRoom';
import IconCalls from '../../IconCalls/IconCalls';

const Teacher = (): JSX.Element => {
  const [totalStudents, setTotalStudents] = useState(0);
  const [message, setMessage] = useState('');

  const [emojisCounts, setEmojisCounts] = useState<MoodCounter | null>(null);
  const { id, roomId } = useParams<{ id: string; roomId: string }>();

  useEffect(() => {
    socket.emit('studentJoinTheRoom', roomId, id);
    socket.on('sendUserCount', (userCount: number) => {
      setTotalStudents(userCount);
    });
    socket.on('updateEmojisCount', (moodCounter: MoodCounter) => {
      setEmojisCounts(moodCounter);
    });
    socket.on('getDecrement', (moodCounter: MoodCounter) => {
      setEmojisCounts(moodCounter);
    });
  }, [roomId, id]);

  useEffect(() => {
    socket.emit('getMessages', roomId);
    socket.on('getMessagesList', (listMessage: any) => {
      console.log(listMessage);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const temporaryArray = [{ name: 'emeline' }];

  const handleMessage = (): void => {
    socket.emit('createMessage', roomId, id, message);
  };

  return (
    <div className="teacher">
      <div className="teacher_visio">
        {temporaryArray &&
          temporaryArray.map((item) => {
            return (
              <>
                <VideoRoom key={item.name} name={item.name} />
              </>
            );
          })}
      </div>
      <div className="teacher_infos">
        <div
          role="heading"
          aria-level={2}
          className="teacher_vertical_panel"
          style={{
            backgroundColor: emojisCounts
              ? getColorByMood(emojisCounts, totalStudents)
              : 'rgba(148, 234, 72, 0.7)',
          }}
        >
          <div className="teacher_emojis_container">
            <div className="teacher_emojis">
              <Emojis emojisCounts={emojisCounts} />
            </div>
          </div>
        </div>
        <IconCalls id={id} />
      </div>
      <Input
        fullWidth
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setMessage(e.target.value)
        }
        value={message}
        disableUnderline
      />
      <Button onClick={() => handleMessage()}>Envoyer message</Button>
    </div>
  );
};

export default Teacher;
