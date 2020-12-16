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

export interface Emoji {
  id: number;
  name: string;
  image: string;
  category: string;
}

const emojis: Emoji[] = [
  {
    id: 1,
    name: 'Thinking',
    image: Thinking,
    category: 'Emotion',
  },
  {
    id: 2,
    name: 'Dead',
    image: Dead,
    category: 'Emotion',
  },
  {
    id: 3,
    name: 'Happy',
    image: Happy,
    category: 'Emotion',
  },
  {
    id: 4,
    name: 'Break',
    image: Break,
    category: 'Action',
  },
  {
    id: 5,
    name: 'SlowDown',
    image: SlowDown,
    category: 'Action',
  },
];

function App(): JSX.Element {
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
