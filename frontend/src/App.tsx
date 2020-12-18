import { BrowserRouter as Router, Route } from 'react-router-dom';
import Teacher from './components/Teacher/Teacher';
import Student from './components/Student/Student';

function App(): JSX.Element {
  return (
    <Router>
      <Route path="/teacher" component={Teacher} />
      <Route path="/student" component={Student} />
    </Router>
  );
}

export default App;
