import React from 'react';
import Teacher from './Teacher';
import { render, screen } from '@testing-library/react';
import "@testing-library/jest-dom";


describe('Teacher component', () => {
    it('Renders teacher component', () => {
        render(<Teacher/>);
        expect(screen.queryByRole('heading', { level: 2 })).toBeInTheDocument();
        expect(screen.queryByRole('heading', { level: 2 })).toHaveStyle('background-color: rgba(148, 234, 72, 0.7)');
    })

    it('handle connection students', () => {
        // socket on getincrement => change emojiCount
    })

    it('on connection', () => {
        // on emit joinTeacher
    })


    describe('Teacher render emojis component', () => {
        it('Renders 5 paragraphs for emojiCount', () => {
            render(<Teacher/>);
            expect(screen.getAllByRole('emojiCount')).toHaveLength(5);
        })
        it('Renders 5 emojis', () => {
            render(<Teacher/>);
            expect(screen.queryAllByRole('img')).toHaveLength(5);
        })
    })

    describe('Student count', () => {
        it('Renders total of students to equal 0 when mounted', () => {
            render(<Teacher/>);
            expect(screen.getByText('student length: 0')).toBeInTheDocument();
        })

        it('handle new student connection', () => {
          // on socket.on => verify studentCount display ++
      })
    })

    describe('Student clicks on emoji', () => {
      it('Updates emojiCount', () => {
          
      })
      it('color background changed with emojiCounter', () => {
          
      })
     })
})





