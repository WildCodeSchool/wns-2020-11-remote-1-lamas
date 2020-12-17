import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import "@testing-library/jest-dom";
import Emojis from './Emojis';

describe('Emojis', () => {
    describe('Emojis for student', () => {
        it('renders 5 emojis buttons', () => {
            render(<Emojis isStudent />);
            expect(screen.queryAllByRole('button')).toHaveLength(5);
        })
        describe('can click on button', () => {
            it('click event is fired', () => {
                const handleClick = jest.fn();
                render(<Emojis isStudent handleClick={handleClick} />);
                fireEvent.click(screen.getByAltText('Happy'));               
                expect(handleClick).toHaveBeenCalledTimes(1);
                expect(handleClick).toHaveBeenCalledWith('Happy','Emotion');
            })
        })
    })
    describe('Emoji for teacher', () => {
        it('renders 5 emojis images', () => {
            render(<Emojis />);
            expect(screen.queryAllByRole('img')).toHaveLength(5);
        })
        it('render count emoji', () => {
            // faire un mock
        })
    })
})