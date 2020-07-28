import { expect } from 'chai';
import { todos } from '../reducers';

describe('Todos Reducer', () => {
    it('Adds a new todo when CREATE_TODO is received', () => {
        const newTodo = {
            text: 'Hello',
            isCompleted: false,
        };

        const action = {
            type: 'CREATE_TODO',
            payload: newTodo,
        };

        const originalState = {
            isLoading: false,
            data: [],
        }
        const actual = todos(originalState, action);

        expect(actual).to.deep.equal({
            isLoading: false,
            data: [newTodo],
        });
    });
})