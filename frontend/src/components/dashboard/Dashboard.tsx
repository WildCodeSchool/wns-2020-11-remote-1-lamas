import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import PageLayout from '../PageLayout/PageLayout';
import { FIND_USER } from '../../graphql/queries/getUser';
import { MnPortal } from '../portal/Portal';
import CreateRoom from './CreateRoom';
import ModalLayout from '../component/ModalLayout';
import RoomList from './RoomList';
import './Dashboard.css';
import JoinRoom from './JoinRoom';

interface RouteParams {
  id: string;
}

const useStyles = makeStyles({
  button: {
    color: '#00396A',
    backgroundColor: 'white',
    boxShadow: '0px 8px 15px rgba(0, 0, 0, 0.1)',
    fontSize: '16px',
    fontStyle: '800',
    textTransform: 'none',
    borderRadius: '10px',
    padding: '6em 5em',
  },
});

const Dashboard = (): JSX.Element => {
  const { id } = useParams<RouteParams>();
  const classes = useStyles();
  const [openModal, setOpenModal] = useState('');

  const { loading, error, data } = useQuery(FIND_USER, {
    variables: { userId: id },
  });

  const handleModalClose = () => {
    setOpenModal('');
  };

  return (
    <>
      <PageLayout
        headband={`Belle journée pour enseigner le code, maître Lama ${data?.getUser?.firstname} !`}
      >
        {openModal !== '' && (
          <ModalLayout handleModalClose={handleModalClose}>
            <>
              {openModal === 'NEW' && (
                <CreateRoom handleModalClose={handleModalClose} />
              )}
              {openModal === 'ROOMS' && (
                <RoomList handleModalClose={handleModalClose} />
              )}
              {openModal === 'JOIN' && (
                <JoinRoom handleModalClose={handleModalClose} />
              )}
            </>
          </ModalLayout>
        )}
        <div className="dashboard__buttons">
          <Button
            className={classes.button}
            onClick={() => setOpenModal('NEW')}
          >
            Créer une nouvelle salle
          </Button>
          <Button
            className={classes.button}
            onClick={() => setOpenModal('ROOMS')}
          >
            Mes salles
          </Button>
          <Button
            className={classes.button}
            onClick={() => setOpenModal('JOIN')}
          >
            Rejoindre une salle
          </Button>
        </div>
      </PageLayout>
    </>
  );
};

export default Dashboard;
