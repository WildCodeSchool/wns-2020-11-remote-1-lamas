import { BrowserRouter as Router, Route } from 'react-router-dom';
import Teacher from './components/Teacher/Teacher';
import Student from './components/Student/Student';
import Dashboard from './components/dashboard/Dashboard';
import SignupForm from './components/Auth/SignupForm';
import LoginForm from './components/Auth/LoginForm';

function App(): JSX.Element {
  return (
    <Router>
      <Route exact path="/signup" component={SignupForm} />
      <Route exact path="/" component={LoginForm} />
      <Route exact path="/:id" component={Dashboard} />
      <Route exact path="/teacher" component={Teacher} />
      <Route exact path="/student" component={Student} />
    </Router>
  );
}

export default App;
