import React, { ReactElement, useState } from 'react';
import { useMutation } from '@apollo/client/react/hooks/useMutation';
import { useQuery } from '@apollo/client/react/hooks/useQuery';
import { CREATE_ROOM } from '../../graphql/mutations/createRoom';
import TextInput from '../component/Input';
import ButtonDashboard from '../component/ButtonDashboard';
import '../component/modalLayout.css';
import './createRoom.css';
import { GET_ROOMS } from '../../graphql/queries/getRooms';
import { IRoom } from '../../types/type';

interface CreationModalProps {
  handleModalClose: () => void;
}

const CreateRoom = ({ handleModalClose }: CreationModalProps): ReactElement => {
  const [name, setName] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const [createRoom] = useMutation(CREATE_ROOM);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length < 150) {
      setName(e.target.value);
    }
  };

  const { loading, error, data } = useQuery(GET_ROOMS);

  const handleClick = () => {
    const roomExist = data.getRooms.find((room: IRoom) => room.name === name);
    if (roomExist) {
      setErrorMessage('La salle existe déjà');
    } else if (name !== '') {
      createRoom({ variables: { name } });
    } else {
      setErrorMessage('Veuillez indiquer un nom de salle');
    }
    handleModalClose();
  };

  return (
    <>
      <div className="create-room">
        <h3 className="create-room__title">Créer une salle</h3>
        <TextInput
          label="Nom de la salle"
          name="room"
          value={name}
          handleOnchange={handleChange}
        />
        {errorMessage && <p className="create-room__error">{errorMessage}</p>}
        <div className="modal__buttons">
          <ButtonDashboard
            label="Annuler"
            handleClick={() => handleModalClose()}
          />
          <ButtonDashboard label="Créer" handleClick={handleClick} />
        </div>
      </div>
    </>
  );
};

export default CreateRoom;
