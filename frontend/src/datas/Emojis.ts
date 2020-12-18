import Thinking from '../asset/thinking.svg';
import Dead from '../asset/dead.svg';
import Happy from '../asset/happy.svg';
import Break from '../asset/cup.svg';
import SlowDown from '../asset/turtle.svg';

export interface Emoji {
  id: number;
  name: string;
  image: string;
  category: string;
}

export const emojis: Emoji[] = [
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