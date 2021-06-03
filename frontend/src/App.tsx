import { BrowserRouter as Router, Route } from 'react-router-dom';
import Teacher from './components/Teacher/Teacher';
import Student from './components/Student/Student';
import Dashboard from './components/dashboard/Dashboard';
import SignupForm from './components/Auth/SignupForm';
import LoginForm from './components/Auth/LoginForm';

function App(): JSX.Element {
  return (
    <>
      <div id="modal" />
      <Router>
        <Route exact path="/signup" component={SignupForm} />
        <Route exact path="/" component={LoginForm} />
        <Route exact path="/dashboard/:id" component={Dashboard} />
        <Route exact path="/teacher/:id/room/:roomId" component={Teacher} />
        <Route exact path="/student/:id/room/:roomId" component={Student} />
      </Router>
    </>
  );
}

export default App;
