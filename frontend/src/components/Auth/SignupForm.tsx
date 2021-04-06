import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_USER } from '../../graphql/mutations/createUser';

export interface Login {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

const SignupForm = (): JSX.Element => {
  let input: any;
  const [login, setLogin] = useState<Login>({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
  });

  const getData = (e: any) => {
    const { name, value } = e.target;

    setLogin({ ...login, [name]: value });
  };

  const [createUser, { data, error }] = useMutation(CREATE_USER, {
    onCompleted: (res) => {
      const token = res?.createUser?.token;
      if (token) {
        localStorage.setItem('token', res.createUser.token);
      }
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        createUser({ variables: { ...login } });
      }}
    >
      <input name="firstname" onChange={getData} />
      <input name="lastname" onChange={getData} />
      <input name="email" onChange={getData} />
      <input name="password" onChange={getData} />
      <button type="submit">Submit</button>
    </form>
  );
};

export default SignupForm;
