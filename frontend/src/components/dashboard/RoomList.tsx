/* eslint-disable */

import React, { ReactElement, useState, useEffect, useRef } from 'react';
import { useQuery } from '@apollo/client/react/hooks/useQuery';
import { useCopyToClipboard } from 'react-use';
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
  const [state, copyToClipboard] = useCopyToClipboard();
  const [isCopied, setIsCopied] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | number | null>(null);
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

      history.push(`/${userId}/room/${roomId}`);
    } else {
      setErrorMessage(true);
    }
  };

  const roomsUser = data?.getRooms?.filter(
    (room: IRoom) => room.owner === userId
  );

  const handleClickRoom = (id: string): void => {
    roomId === id ? setRoomId('') : setRoomId(id);
    copyToClipboard(id);

    if (roomId !== id) {
      setIsCopied(true);
    }
  };

  useEffect(() => {
    const current = timeoutRef.current as number;
    if (timeoutRef.current !== null) {
      clearTimeout(current);
    }

    timeoutRef.current = setTimeout(() => {
      timeoutRef.current = null;
      setIsCopied(false);
    }, 2000);
  }, [isCopied]);

  return (
    <>
      <div className="room-list">
        <div className="create-room__title">Mes salles</div>
        <p className="create-room__info">
          Copies l'id de ta salle en cliquant dessus.
        </p>
        <div className="room-list__content">
          {data &&
            roomsUser?.map((room: IRoom) => {
              return (
                <div
                  key={room._id}
                  onClick={() => handleClickRoom(room._id)}
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
      {isCopied && <p className="create-room__info">Id copié</p>}
    </>
  );
};

export default RoomList;
