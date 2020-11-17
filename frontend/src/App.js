import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Teacher from './components/Teacher/Teacher';
import Student from './components/Student/Student';
import Thinking from './asset/thinking.svg';
import Dead from './asset/dead.svg';
import Happy from './asset/happy.svg';
import Break from './asset/cup.svg';
import SlowDown from './asset/turtle.svg';

import AppContext from './context/AppContext';

const emojis = [
  {
    id: 1,
    name: 'Thinking',
    counter: 0,
    image: Thinking,
    category: 'Emotion',
  },
  {
    id: 2,
    name: 'Dead',
    counter: 0,
    image: Dead,
    category: 'Emotion',
  },
  {
    id: 3,
    name: 'Happy',
    counter: 0,
    image: Happy,
    category: 'Emotion',
  },
  {
    id: 4,
    name: 'Break',
    counter: 0,
    image: Break,
    category: 'Action',
  },
  {
    id: 5,
    name: 'Slow down',
    counter: 0,
    image: SlowDown,
    category: 'Action',
  },
];

function App() {
  return (
    <Router>
      <AppContext.Provider value={emojis}>
        <Route path="/teacher" component={Teacher} />
        <Route path="/student" component={Student} />
      </AppContext.Provider>
    </Router>
  );
}

export default App;
