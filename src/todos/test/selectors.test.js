import { expect } from 'chai';
import {getCompletedTodos, selectors} from '../selectors';

describe('GetCompletedTodos', () => {
   it('returns only todos with complete = true', () => {
       const allTodos = [
           { text: 'one', isCompleted: true },
           { text: 'two', isCompleted: false },
           { text: 'three', isCompleted: true },
       ];

        const filtered = getCompletedTodos.resultFunc(allTodos);

        expect(filtered).to.deep.equal([
            { text: 'one', isCompleted: true },
            { text: 'three', isCompleted: true },
        ]);
   });
});