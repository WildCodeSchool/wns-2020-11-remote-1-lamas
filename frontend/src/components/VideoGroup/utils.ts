import Peer, { SignalData } from 'simple-peer';
import socket from '../../socket/socket';

export const createPeer = (
  callerID: string,
  stream: MediaStream
): Peer.Instance => {
  const peer = new Peer({
    initiator: true,
    trickle: false,
    stream,
  });

  console.log('createPeer');
  peer.on('signal', (signal) => {
    console.log('createPeer > sending signal');

    socket.emit('sending signal', {
      callerID,
      signal,
    });
  });

  return peer;
};

export const addPeer = (
  incomingSignal: string | SignalData,
  callerID: string,
  stream: undefined | MediaStream
): Peer.Instance => {
  const peer = new Peer({
    initiator: false,
    trickle: false,
    stream,
  });
  console.log('add peer');
  peer.on('signal', (signal) => {
    console.log('add peer => returning signal');
    socket.emit('returning signal', {
      signal,
      callerID,
    });
  });

  peer.signal(incomingSignal);

  return peer;
};
