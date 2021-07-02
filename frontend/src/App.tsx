import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import Dashboard from './components/dashboard/Dashboard';
import SignupForm from './components/Auth/SignupForm';
import LoginForm from './components/Auth/LoginForm';
import Room from './components/room/Room';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import { GET_CONNECTED_USER } from './graphql/queries/getConnectedUser';
import { currentUser } from './cache';

const App = (): JSX.Element => {
  // compilation
  const connectedUser = useQuery(GET_CONNECTED_USER);

  if (connectedUser?.data?.getUserConnected) {
    currentUser(connectedUser.data.getUserConnected);
  }
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
