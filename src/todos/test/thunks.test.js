import 'node-fetch';
import fetchMock from 'fetch-mock';
import { expect } from 'chai';
import sinon from 'sinon';
import { loadTodos } from '../thunks';

describe('Load todos thunk', () => {
    it('load todos dispatches LOAD_TODOS_IN_PROGRESS', async () => {
        const dispatchSpy = sinon.spy();

        const fetchedTodos = [{text: 'one'}, {text: 'two'}];
        fetchMock.get('http://localhost:8080/todos', fetchedTodos);

        await loadTodos()(dispatchSpy);

        expect(dispatchSpy.getCall(0).args[0]).to.deep.equal({
            type: 'LOAD_TODOS_IN_PROGRESS',
        });

        expect(dispatchSpy.getCall(1).args[0]).to.deep.equal({
            type: 'LOAD_TODOS_SUCCESS',
            payload: {
                todos: fetchedTodos,
            },
        });

        fetchMock.reset();
    });
})