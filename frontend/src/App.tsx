import { BrowserRouter as Router, Route } from 'react-router-dom';
import Dashboard from './components/dashboard/Dashboard';
import SignupForm from './components/Auth/SignupForm';
import LoginForm from './components/Auth/LoginForm';
import Room from './components/room/Room';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

const App = (): JSX.Element => {
  // const { data } = useQuery(GET_CONNECTED_USER);

  // if (data) {
  //   getConnectedUser(data);
  // }
  return (
    <>
      <Router>
        <Route exact path="/signup" component={SignupForm} />
        <Route exact path="/" component={LoginForm} />
        <PrivateRoute path="/dashboard/:id" component={Dashboard} />
        <PrivateRoute path="/:id/room/:roomId" component={Room} />
      </Router>
    </>
  );
};

export default App;
