import { useQuery } from '@apollo/client';
import React, { ReactElement } from 'react';
import { useParams } from 'react-router';
import { GET_CONNECTED_USER } from '../../graphql/queries/getConnectedUser';
import { GET_ROOM } from '../../graphql/queries/getRoom';
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

  return (
    <>
      {!loading && !connectedUser?.loading && (
        <>
          {data?.getRoom?.owner === connectedUser?.data?.getUserConnected ? (
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
