import { BrowserRouter as Router, Route } from 'react-router-dom';
import Teacher from './components/Teacher/Teacher';
import Student from './components/Student/Student';
import Dashboard from './components/dashboard/Dashboard';
import SignupForm from './components/Auth/SignupForm';

function App(): JSX.Element {
  return (
    <Router>
      <Route path="/" component={SignupForm} />
      <Route path="/:id" component={Dashboard} />
      <Route path="/teacher" component={Teacher} />
      <Route path="/student" component={Student} />
    </Router>
  );
}

export default App;
