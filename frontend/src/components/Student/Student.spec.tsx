import React from 'react';
import Student from './Student';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import "@testing-library/jest-dom";

jest.mock('../../socket/socket');

describe('Student', () => {
    it('renders student component', () => {
        render(<Student />);
        expect(screen.queryByRole('heading', { level: 2 })).toBeInTheDocument();
    })

    // emit join
    // it('emit join on mounting', () => {
        
    //     socket.emit = jest.fn()
    //     render(<Student />)
    //     expect(mSocket.emit).toHaveBeenCalledWith('join', {});
    // })

    describe('Student renders Emojis component', () => {
        it('renders emojis component in student component', () => {
            render(<Student />);
            expect(screen.queryAllByRole('button')).toHaveLength(5);
        })
    })

    // test emit changeMood
    describe('When an emoji is clicked, socket message is emitted', () => {
        it('Socket changeMood is emitting',() => {
            const mSocket = {
                emit: jest.fn()
            }
            render(<Student />);
            fireEvent.click(screen.getByAltText('Happy'));      
            expect(mSocket.emit.mock.calls.length).toBe(1)
        })
    })
})

