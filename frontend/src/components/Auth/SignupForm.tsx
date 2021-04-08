import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { useHistory } from 'react-router-dom';
import { Formik } from 'formik';
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';
import './Auth.css';
import logo from '../../asset/logo-white-lamas_logo.svg';
import signUpValidationSchema from './signUpValidationSchema';
import { CREATE_USER } from '../../graphql/mutations/createUser';

// Specific styles for MUI components
const useStyles = makeStyles({
  button: {
    color: '#00396A',
    backgroundColor: 'white',
    boxShadow: '0px 8px 15px rgba(0, 0, 0, 0.1)',
    fontSize: '16px',
    fontStyle: '800',
    marginBottom: '2em',
    textTransform: 'none',
    borderRadius: '10px',
  },
  button2: {
    color: '#00396A',
    fontSize: '16px',
    fontStyle: '800',
    marginBottom: '2em',
    textTransform: 'none',
    backgroundColor: 'none',
    textDecoration: 'underline',
  },
  textField: {
    backgroundColor: '#00396A',
    borderRadius: '20px',
    color: 'white',
    height: '52px',
    paddingLeft: '15px',
    caretColor: 'white',
    marginTop: '0px',
    '& input': {
      color: 'white',
      fontSize: '14px',
    },
  },
  label: {
    color: '#00396A',
    marginLeft: '15px',
    marginBottom: '5px',
  },
  iconButton: {
    color: 'white',
  },
});

const SignupForm = (): JSX.Element => {
  const classes = useStyles();
  const history = useHistory();
  const [passwordVisibility, setpasswordVisibility] = useState(false);

  const [createUser, { data, error }] = useMutation(CREATE_USER, {
    onCompleted: (res) => {
      const token = res?.createUser?.token;
      if (token) {
        localStorage.setItem('token', token);
      }
    },
  });

  const handleClickShowPassword = () => {
    setpasswordVisibility(!passwordVisibility);
  };

  return (
    <div className="background">
      <Formik
        initialValues={{ firstname: '', lastname: '', email: '', password: '' }}
        onSubmit={(values) => {
          createUser({ variables: { ...values } });
          history.push('/dashboard');
        }}
        validationSchema={signUpValidationSchema}
      >
        {({ handleChange, handleSubmit, values, errors, touched, isValid }) => (
          <div className="form">
            <img
              className="signup__form__logo"
              src={logo}
              alt="logo des Lamas"
            />
            <div className="signup__form">
              <h1 className="signup__form__title">Bienvenue à toi Lama !</h1>
              <div className="signup__form__input">
                <InputLabel className={classes.label}>Prénom</InputLabel>
                <Input
                  fullWidth
                  onChange={handleChange('firstname')}
                  disableUnderline
                  value={values.firstname}
                  error={touched.firstname && Boolean(errors.firstname)}
                  className={classes.textField}
                />
                {errors.firstname && touched.firstname && (
                  <p className="input__error">{errors.firstname}</p>
                )}
              </div>
              <div className="signup__form__input">
                <InputLabel className={classes.label}>Nom</InputLabel>
                <Input
                  fullWidth
                  onChange={handleChange('lastname')}
                  value={values.lastname}
                  error={touched.lastname && Boolean(errors.lastname)}
                  className={classes.textField}
                  disableUnderline
                />
                {errors.lastname && touched.lastname && (
                  <p className="input__error">{errors.lastname}</p>
                )}
              </div>
              <div className="signup__form__input">
                <InputLabel className={classes.label}>E-mail</InputLabel>
                <Input
                  fullWidth
                  onChange={handleChange('email')}
                  className={classes.textField}
                  value={values.email}
                  error={touched.email && Boolean(errors.email)}
                  disableUnderline
                />
                {errors.email && touched.email && (
                  <p className="input__error">{errors.email}</p>
                )}
              </div>
              <div className="signup__form__input">
                <InputLabel className={classes.label}>Mot de passe</InputLabel>
                <Input
                  fullWidth
                  onChange={handleChange('password')}
                  value={values.password}
                  className={classes.textField}
                  type={passwordVisibility ? 'text' : 'password'}
                  error={touched.password && Boolean(errors.password)}
                  disableUnderline
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        className={classes.iconButton}
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                      >
                        {passwordVisibility ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                />
                {errors.password && touched.password && (
                  <p className="input__error">{errors.password}</p>
                )}
              </div>
              <div className="form__button">
                <Button
                  type="submit"
                  className={classes.button2}
                  onClick={() => history.push('/')}
                >
                  Déjà un compte ?
                </Button>
                <Button
                  type="submit"
                  className={classes.button}
                  onClick={() => handleSubmit()}
                >
                  Créer mon compte
                </Button>
              </div>
            </div>
          </div>
        )}
      </Formik>
    </div>
  );
};

// eslint-disable-next-line import/no-default-export
export default SignupForm;
