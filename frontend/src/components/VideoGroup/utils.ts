import Peer, { SignalData } from 'simple-peer';
import socket from '../../socket/socket';

export const createPeer = (
  userToSignal: string,
  callerID: string,
  stream: MediaStream
): Peer.Instance => {
  const peer = new Peer({
    initiator: true,
    trickle: false,
    stream,
  });

  peer.on('signal', (signal) => {
    socket.emit('sending signal', {
      userToSignal,
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
  peer.on('signal', (signal) => {
    socket.emit('returning signal', {
      signal,
      callerID,
    });
  });
  peer.signal(incomingSignal);

  return peer;
};
