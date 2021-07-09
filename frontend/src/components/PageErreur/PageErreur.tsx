import { useMutation } from '@apollo/client';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import erreurQuestion from '../../asset/question.svg';
import { currentUser } from '../../cache';
import { SET_COOKIE } from '../../graphql/mutations/cookie';
import './PageErreur.css';

const useStyles = makeStyles({
  button: {
    color: 'white',
    backgroundColor: '#00396A',
    boxShadow: '0px 8px 15px rgba(0, 0, 0, 0.1)',
    fontSize: '16px',
    fontStyle: '800',
    marginBottom: '2em',
    textTransform: 'none',
    borderRadius: '10px',
    '&:hover': {
      backgroundColor: '#00396A',
      boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.3)',
    },
  },
});

const PageErreur = (): JSX.Element => {
  const classes = useStyles();
  const history = useHistory();
  const user = currentUser();
  const [update] = useMutation(SET_COOKIE);

  useEffect(() => {
    if (user) {
      update({
        variables: { _id: user?._id },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [history, user]);

  return (
    <div className="page-erreur__contenu">
      <h2 className="page-erreur__contenu-titre">Erreur 404</h2>
      <img
        className="page-erreur__contenu-illustration"
        src={erreurQuestion}
        alt="erreur"
      />
      <div className="page-erreur__contenu-sous-titre">
        On s&rsquo;est perdu à ce que je vois,
        <br />
        ne t&rsquo;inquiète pas je te montre le chemin!
      </div>
      <Button
        className={classes.button}
        onClick={() =>
          user ? history.push(`/dashboard/${user._id}`) : history.push('/')
        }
      >
        Retour à l&apos;accueil
      </Button>
    </div>
  );
};

export default PageErreur;
