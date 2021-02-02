import thinking from '../asset/thinking.svg';
import dead from '../asset/dead.svg';
import happy from '../asset/happy.svg';
import coffee from '../asset/cup.svg';
import slowDown from '../asset/slowdown.svg';
import question from '../asset/question.svg';

export interface Emoji {
  id: number;
  name: 'happy' | 'dead' | 'thinking' | 'coffee' | 'slowDown' | 'question';
  image: string;
  category: string;
}

export interface MoodCounter {
  happy: number;
  dead: number;
  thinking: number;
  coffee: number;
  slowDown: number;
  question: number;
}

export const emojis: Emoji[] = [
  {
    id: 1,
    name: 'happy',
    image: happy,
    category: 'Emotion',
  },
  {
    id: 2,
    name: 'thinking',
    image: thinking,
    category: 'Emotion',
  },
  {
    id: 3,
    name: 'dead',
    image: dead,
    category: 'Emotion',
  },
  {
    id: 4,
    name: 'coffee',
    image: coffee,
    category: 'Action',
  },
  {
    id: 5,
    name: 'slowDown',
    image: slowDown,
    category: 'Action',
  },
  {
    id: 6,
    name: 'question',
    image: question,
    category: 'Action',
  },
];
