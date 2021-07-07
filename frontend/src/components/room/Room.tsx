import { useQuery } from '@apollo/client';
import React, { ReactElement, useEffect } from 'react';
import { useParams } from 'react-router';
import { GET_CONNECTED_USER } from '../../graphql/queries/getConnectedUser';
import { GET_ROOM } from '../../graphql/queries/getRoom';
import socket from '../../socket/socket';
import { IParams } from '../../types/type';
import Student from './Student/Student';
import Teacher from './Teacher/Teacher';

const Room = (): ReactElement => {
  const params = useParams<IParams>();
  const roomId = params?.roomId ?? '';
  const connectedUser = useQuery(GET_CONNECTED_USER);

  const { loading, error, data } = useQuery(GET_ROOM, {
    variables: { roomId },
  });

  if (connectedUser?.data?.getUserConnected && roomId) {
    const connectedUserCopy = {
      ...connectedUser.data.getUserConnected,
      roomId,
    };
    localStorage.setItem('user', JSON.stringify(connectedUserCopy));
  }

  useEffect(() => {
    if (connectedUser?.data?.getUserConnected) {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      const { _id, firstname, lastname } = connectedUser.data.getUserConnected;
      console.log('socket emit joinTheRoom');
      socket.emit('joinTheRoom', roomId, _id, firstname, lastname);
    }
  }, [connectedUser, roomId]);

  return (
    <>
      {!loading && !connectedUser?.loading && (
        <>
          {data?.getRoom?.owner ===
          connectedUser?.data?.getUserConnected._id ? (
            <Teacher />
          ) : (
            <Student />
          )}
        </>
      )}
    </>
  );
};

export default Room;
