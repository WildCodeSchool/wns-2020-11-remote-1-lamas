import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import Student from './Student';
import '@testing-library/jest-dom';
import socket from '../../../socket/socket';

jest.mock('../../socket/socket');

describe('Student', () => {
  it('renders student component', () => {
    render(<Student />);
    expect(screen.queryByRole('heading', { level: 2 })).toBeInTheDocument();
  });

  describe('Student renders Emojis component', () => {
    it('renders emojis component in student component', () => {
      render(<Student />);
      expect(screen.queryAllByRole('button')).toHaveLength(6);
    });
  });

  // test emit changeMood
  describe('When an emoji is clicked, socket message is emitted', () => {
    it('Socket changeMood is emitting', () => {
      render(<Student />);
      expect(socket.emit).toHaveBeenCalledTimes(1);
      expect(socket.emit).toHaveBeenLastCalledWith('join', {});
      fireEvent.click(screen.getByAltText('happy'));
      expect(socket.emit).toHaveBeenCalledTimes(2);
      expect(socket.emit).toHaveBeenLastCalledWith(
        'changeMood',
        'happy',
        'Emotion'
      );
    });
  });
});
