import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Emojis from './Emojis';

describe('Emojis', () => {
  describe('Emojis for student', () => {
    it('renders 6 emojis buttons', () => {
      render(<Emojis isStudent />);
      expect(screen.queryAllByRole('button')).toHaveLength(6);
    });
    describe('can click on button', () => {
      it('click event is fired', () => {
        const handleClick = jest.fn();
        render(<Emojis isStudent handleClick={handleClick} />);
        fireEvent.click(screen.getByAltText('happy'));
        expect(handleClick).toHaveBeenCalledTimes(1);
        expect(handleClick).toHaveBeenCalledWith('happy', 'Emotion');
      });
    });
  });
  describe('Emoji for teacher', () => {
    it('renders 6 emojis images', () => {
      render(<Emojis />);
      expect(screen.queryAllByRole('img')).toHaveLength(6);
    });

    it('render count emoji', () => {
      // faire un mock
    });
  });
});
