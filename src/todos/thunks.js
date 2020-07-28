import {createTodo, loadTodosFailure, loadTodosInProgress, loadTodosSuccess, removeTodo} from "./actions";

export const loadTodos = () => async(dispatch, getState) => {
    dispatch(loadTodosInProgress());
    try {
        const response = await fetch('http://localhost:8080/todos');
        const todos = await response.json();

        dispatch(loadTodosSuccess(todos));
    } catch (e) {
        dispatch(loadTodosFailure());
        dispatch(displayAlert(e));
    }
};

export const createTodoRequest = text => async(dispatch, getState) => {
    try {
        const body = JSON.stringify({ text });
        const response = await fetch('http://localhost:8080/todos', {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'post',
            body,
        });
        const todo = await response.json();

        dispatch(createTodo(todo));
    } catch (e) {
        dispatch(displayAlert(e));
    }
}

export const removeTodoRequest = id => async(dispatch, getState) => {
    try {
        const response = await fetch(`http://localhost:8080/todos/${id}`, {
            method: 'delete'
        });
        const removedTodo = await response.json();

        dispatch(loadTodos());
    } catch (e) {
        dispatch(displayAlert(e));
    }
}

export const completeTodoRequest = id => async(dispatch, getState) => {
    try {
        const response = await fetch(`http://localhost:8080/todos/${id}/completed`, {
            method: 'post'
        });
        const updatedTodo = await response.json();

        dispatch(loadTodos());
    } catch (e) {
        dispatch(displayAlert(e));
    }
}

export const displayAlert = text => () => {
    alert(text);
};

