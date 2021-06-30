import React, { useState } from 'react';
import CallEndIcon from '@material-ui/icons/CallEnd';
import VideocamIcon from '@material-ui/icons/Videocam';
import VideocamOffIcon from '@material-ui/icons/VideocamOff';
import MicIcon from '@material-ui/icons/Mic';
import MicOffIcon from '@material-ui/icons/MicOff';
import ScreenShareIcon from '@material-ui/icons/ScreenShare';
import StopScreenShareIcon from '@material-ui/icons/StopScreenShare';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles({
  iconButton: {
    color: '#00396a',
    backgroundColor: 'white',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.15)',
    objectFit: 'cover',
    '&:hover': {
      backgroundColor: 'white',
      boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
    },
  },
  iconButtonCallEnd: {
    backgroundColor: '#D70909',
    color: 'white',
    '&:hover': {
      backgroundColor: '#D70909',
    },
  },
});

const IconCalls = ({ id }: { id: string }) => {
  const classes = useStyles();
  const history = useHistory();
  const [micOn, setMicOn] = useState(true);
  const [videoOn, setVideoOn] = useState(true);
  const [screenOn, setScreenOn] = useState(false);

  return (
    <div className="icons_call">
      <IconButton
        className={classes.iconButton}
        aria-label="mic-on"
        onClick={() => setMicOn(!micOn)}
      >
        {!micOn ? <MicIcon /> : <MicOffIcon />}
      </IconButton>
      <IconButton
        className={`${classes.iconButton} ${classes.iconButtonCallEnd}`}
        aria-label="call-end"
        onClick={() => history.push(`/dashboard/${id}`)}
      >
        <CallEndIcon />
      </IconButton>
      <IconButton
        className={classes.iconButton}
        aria-label="video-on"
        onClick={() => setVideoOn(!videoOn)}
      >
        {!videoOn ? <VideocamIcon /> : <VideocamOffIcon />}
      </IconButton>
      <IconButton
        className={classes.iconButton}
        aria-label="screen-on"
        onClick={() => setScreenOn(!screenOn)}
      >
        {!screenOn ? <ScreenShareIcon /> : <StopScreenShareIcon />}
      </IconButton>
    </div>
  );
};

export default IconCalls;
