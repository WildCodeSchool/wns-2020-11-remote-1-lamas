import { createContext } from 'react';
import { Emoji } from '../App';

const AppContext = createContext<Emoji[] | null>(null);

export default AppContext;
