import React from 'react';
import { render, screen } from '@testing-library/react';
import Teacher from './Teacher';
import '@testing-library/jest-dom';
import socket from '../../socket/socket';

jest.mock('../../socket/socket');

describe('Teacher component', () => {
  it('Renders teacher component', () => {
    render(<Teacher />);
    expect(screen.queryByRole('heading', { level: 2 })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { level: 2 })).toHaveStyle(
      'background-color: rgba(148, 234, 72, 0.7)'
    );
  });

  it('Handle students connection', () => {
    // socket on updateEmojisCount => change emojiCount
  });

  it('Handle teacher connection', () => {
    render(<Teacher />);
    expect(socket.emit).toHaveBeenCalledTimes(1);
    expect(socket.emit).toHaveBeenLastCalledWith('joinTeacher', {});
  });

  describe('Teacher render emojis component', () => {
    it('Renders 6 paragraphs for emojiCount', () => {
      render(<Teacher />);
      expect(screen.getAllByRole('paragraph')).toHaveLength(6);
    });
    it('Renders 6 emojis', () => {
      render(<Teacher />);
      expect(screen.queryAllByRole('img')).toHaveLength(6);
    });
  });

  describe('Student count', () => {
    it('Renders total of students to equal 0 when mounted', () => {
      render(<Teacher />);
      expect(screen.getByText('student length: 0')).toBeInTheDocument();
    });

    it('handle new student connection', () => {
      // on socket.on => verify studentCount display ++
    });
  });
});
