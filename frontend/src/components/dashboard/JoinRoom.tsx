import React, { ReactElement, useState } from 'react';
import { useQuery } from '@apollo/client/react/hooks/useQuery';

import { useHistory, useParams } from 'react-router-dom';
import ButtonDashboard from '../component/ButtonDashboard';
import { GET_ROOMS } from '../../graphql/queries/getRooms';
import { IParams, IRoom } from '../../types/type';
import '../component/modalLayout.css';
import './joinRoom.css';
import TextInput from '../component/Input';

interface RoomListProps {
  handleModalClose: () => void;
}

const JoinRoom = ({ handleModalClose }: RoomListProps): ReactElement => {
  const [roomId, setRoomId] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const history = useHistory();
  const params = useParams<IParams>();
  const userId = params?.id ?? '';

  const { data } = useQuery(GET_ROOMS);

  const handleClick = () => {
    const selectedRoom = data.getRooms.find(
      (item: IRoom) => item._id === roomId
    );
    if (!selectedRoom) {
      setErrorMessage("Cette salle n'existe pas");

      // error message
    } else {
      if (userId === selectedRoom.owner) {
        history.push(`/teacher/${userId}/room/${roomId}`);
      } else {
        history.push(`/student/${userId}/room/${roomId}`);
      }

      setRoomId('');
      setErrorMessage('');
    }
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRoomId(e.target.value);
  };

  return (
    <>
      <div className="join-room">
        <div className="join-room__title">Rejoindre une salle</div>
        <TextInput
          label="id de la salle"
          name="salle"
          handleOnchange={handleOnChange}
          value={roomId}
        />
        {errorMessage && <p className="join-room__error">{errorMessage}</p>}
        <div className="modal__buttons">
          <ButtonDashboard
            label="Annuler"
            handleClick={() => handleModalClose()}
          />
          <ButtonDashboard label="Rejoindre" handleClick={handleClick} />
        </div>
      </div>
    </>
  );
};

export default JoinRoom;
