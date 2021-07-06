import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import SendIcon from '@material-ui/icons/Send';
import './message.css';
import TextInput from '../../component/Input';
import socket from '../../../socket/socket';
import { currentUser } from '../../../cache';

const useStyles = makeStyles({
  iconButton: {
    position: 'absolute',
    right: '10px',
    top: '5px',
    color: '#00396a',
    backgroundColor: 'white',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.15)',
    width: '40px',
    height: '40px',
    objectFit: 'cover',
    '&:hover': {
      backgroundColor: 'white',
      boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
    },
  },
  textInputMessage: {
    backgroudColor: '#00396a',
    color: 'white',
  },
});

interface IMessageList {
  id: string;
  firstname: string;
  lastname: string;
  date: string;
  roomId: string;
  message: string;
  userId: string;
}

const Message = (): JSX.Element => {
  const classes = useStyles();
  const [message, setMessage] = useState('');
  const [messageList, setMessageList] = useState<IMessageList[]>([]);

  const { id, roomId } = useParams<{ id: string; roomId: string }>();

  const user = currentUser();
  useEffect(() => {
    if (user) {
      socket.emit('getMessages', roomId);
      socket.on('getMessagesList', (listMessage: IMessageList[]) => {
        setMessageList(listMessage);
      });
    }
  }, [roomId, user]);

  const handleMessage = (): void => {
    if (user) {
      socket.emit('createMessage', roomId, id, message);
      setMessage('');
    }
  };

  return (
    <div className="message">
      <h3 className="message__title">Messages</h3>
      <div className="message__chat">
        {user?._id &&
          messageList.map((messageItem) => {
            const isUser = messageItem.userId === user?._id;
            return (
              <div
                key={messageItem.id}
                className={`messageCard${isUser ? '__user' : '__other'}`}
              >
                <div className="messageCard__name">
                  {messageItem.firstname} {messageItem.lastname}
                </div>
                <div className="messageCard__message">
                  {messageItem.message}
                </div>
              </div>
            );
          })}
      </div>
      <div className="message__send">
        <TextInput
          name="message"
          value={message}
          handleOnchange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setMessage(e.target.value)
          }
          className={classes.textInputMessage}
          placeholder="Tapez votre message"
        />
        <IconButton
          className={classes.iconButton}
          aria-label="send"
          onClick={() => handleMessage()}
        >
          <SendIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default Message;
