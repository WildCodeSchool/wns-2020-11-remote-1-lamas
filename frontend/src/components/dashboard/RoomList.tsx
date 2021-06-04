import React, { ReactElement, useState, useEffect } from 'react';
import { useQuery } from '@apollo/client/react/hooks/useQuery';

import { useHistory, useParams } from 'react-router-dom';
import ButtonDashboard from '../component/ButtonDashboard';
import { GET_ROOMS } from '../../graphql/queries/getRooms';
import { IParams, IRoom } from '../../types/type';
import '../component/modalLayout.css';

interface RoomListProps {
  handleModalClose: () => void;
}

const RoomList = ({ handleModalClose }: RoomListProps): ReactElement => {
  const [roomId, setRoomId] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<boolean>(false);

  const history = useHistory();
  const params = useParams<IParams>();
  const userId = params?.id ?? '';

  const { loading, error, data } = useQuery(GET_ROOMS);

  useEffect(() => {
    if (roomId !== '' && errorMessage) setErrorMessage(false);
  }, [roomId, errorMessage]);

  const handleClick = () => {
    const selected = data.getRooms.find((item: IRoom) => item._id === roomId);
    if (selected) {
      setErrorMessage(false);

      if (userId === selected.owner) {
        history.push(`/teacher/${userId}/room/${roomId}`);
      } else {
        history.push(`/student/${userId}/room/${roomId}`);
      }
    } else {
      setErrorMessage(true);
    }
  };

  const roomsUser = data?.getRooms?.filter(
    (room: IRoom) => room.owner === userId
  );

  return (
    <>
      <div className="room-list">
        <div className="create-room__title">Mes salles</div>

        <div className="room-list__content">
          {data &&
            roomsUser?.map((room: IRoom) => {
              return (
                <div
                  key={room._id}
                  onClick={() =>
                    roomId === room._id ? setRoomId('') : setRoomId(room._id)
                  }
                  className={`room-list__name room-list__name${
                    room._id === roomId && '--active'
                  }`}
                >
                  {room.name}
                </div>
              );
            })}
        </div>
        {errorMessage && (
          <p className="input__error">Veuillez sélectionner une salle</p>
        )}
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

export default RoomList;
