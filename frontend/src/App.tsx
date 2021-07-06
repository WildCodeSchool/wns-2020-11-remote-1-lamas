import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import Dashboard from './components/dashboard/Dashboard';
import SignupForm from './components/Auth/SignupForm';
import LoginForm from './components/Auth/LoginForm';
import Room from './components/room/Room';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import { GET_CONNECTED_USER } from './graphql/queries/getConnectedUser';
import { currentUser } from './cache';
import { SET_COOKIE } from './graphql/mutations/cookie';

const App = (): JSX.Element => {
  // compil
  const connectedUser = useQuery(GET_CONNECTED_USER);
  const [update] = useMutation(SET_COOKIE);

  if (
    connectedUser?.data?.getUserConnected?.firstname &&
    connectedUser?.data?.getUserConnected?.lastname
  ) {
    currentUser(connectedUser.data.getUserConnected);
  }

  useEffect(() => {
    if (connectedUser?.data?.getUserConnected?._id) {
      update({
        variables: { _id: connectedUser?.data?.getUserConnected?._id },
      });
    }
  }, [connectedUser?.data?.getUserConnected?._id, update]);
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/signup" component={SignupForm} />
          <Route exact path="/" component={LoginForm} />
          <PrivateRoute path="/dashboard/:id" component={Dashboard} />
          <PrivateRoute path="/:id/room/:roomId" component={Room} />
        </Switch>
      </Router>
    </>
  );
};

export default App;
