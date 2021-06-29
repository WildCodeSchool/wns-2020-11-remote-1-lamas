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
import loginValidationSchema from './loginValidationSchema';
import { LOGIN_USER } from '../../graphql/mutations/loginUser';

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

const LoginForm = (): JSX.Element => {
  const classes = useStyles();
  const history = useHistory();
  const [passwordVisibility, setpasswordVisibility] = useState(false);

  const [loginUser, { data, error }] = useMutation(LOGIN_USER, {
    onCompleted: (res) => {
      const token = res?.loginUser?.token;
      if (token) {
        localStorage.setItem('token', token);
        history.push(`/dashboard/${res.loginUser.user._id}`);
      }
    },
    onError: (err) => {
      // eslint-disable-next-line no-console
      console.log('Error on login mutation  :', err);
    },
  });

  const handleClickShowPassword = () => {
    setpasswordVisibility(!passwordVisibility);
  };

  return (
    <div className="background-color">
      <div className="background">
        <Formik
          initialValues={{ email: '', password: '' }}
          onSubmit={(values) => {
            loginUser({ variables: { ...values } });
          }}
          validationSchema={loginValidationSchema}
        >
          {({
            handleChange,
            handleSubmit,
            values,
            errors,
            touched,
            isValid,
          }) => (
            <div className="form">
              <img
                className="auth__form__logo"
                src={logo}
                alt="logo des Lamas"
              />
              <div className="auth__form">
                <h1 className="auth__form__title">
                  Rejoins les autres lamas !
                </h1>
                <div className="auth__form__input">
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
                <div className="auth__form__input">
                  <InputLabel className={classes.label}>
                    Mot de passe
                  </InputLabel>
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
                    onClick={() => history.push('/signup')}
                  >
                    Créer un compte
                  </Button>
                  <Button
                    type="submit"
                    className={classes.button}
                    onClick={() => handleSubmit()}
                  >
                    Se connecter
                  </Button>
                </div>
              </div>
            </div>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default LoginForm;
