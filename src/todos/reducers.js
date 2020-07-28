import {
    COMPLETE_TODO,
    CREATE_TODO,
    LOAD_TODOS_FAILURE,
    LOAD_TODOS_IN_PROGRESS,
    LOAD_TODOS_SUCCESS,
} from './actions';

export const isLoading = (state = false, action) => {
    const { type, payload } = action;
    switch (type) {
        case LOAD_TODOS_IN_PROGRESS:
            return true;
        case LOAD_TODOS_SUCCESS:
        case LOAD_TODOS_FAILURE:
            return false;
        default:
            return state;
    }
}

const initialState = {
    isLoading: false,
    data: [],
}

export const todos = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case CREATE_TODO: {
            const todo = payload;
            todo.createdAt = Date.now();
            return {
                ...state,
                data: state.data.concat(todo)
            };
        }
        case COMPLETE_TODO: {
            const { text } = payload;
            return {
                ...state,
                data: state.data.map(todo => {
                    if (todo.text === text) {
                        return { ...todo, isCompleted: true }
                    }
                    return todo;
                })
            };
        }
        case LOAD_TODOS_SUCCESS:
            const { todos } = payload;
            return {
                ...state,
                isLoading: false,
                data: todos,
            };
        case LOAD_TODOS_IN_PROGRESS:
            return {
                ...state,
                isLoading: true
            };
        case LOAD_TODOS_FAILURE:
        default:
            return {
                ...state,
                isLoading: false
            };
    }
};