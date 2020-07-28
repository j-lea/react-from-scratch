import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import NewTodoForm from './NewTodoForm';
import TodoListItem from './TodoListItem';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { completeTodoRequest, loadTodos, removeTodoRequest } from './thunks';
import { getCompletedTodos, getIsLoading, getPendingTodos } from './selectors';

const BigRedText = styled.div`
    font-size: 48px;
    color: #FF0000;
`;

const ListWrapper = styled.div`
    max-width: 700px;
    margin: auto;
`;

const H3 = styled.h3`
    color: black;
`;

const TodoList = ({ completedTodos, pendingTodos, isLoading, onRemovePressed, onCompletePressed, startLoadingTodos }) => {
    useEffect(() => {
        startLoadingTodos();
    }, []); // Empty array prevents it from reloading constantly

    const loadingMessage = <div>Loading todos...</div>;
    const todoList = (<ListWrapper className='list-wrapper'>
        <BigRedText>I&apos;m a styled component!</BigRedText>
        <NewTodoForm></NewTodoForm>
        <H3>Pending Todos</H3>
        {pendingTodos.map(todo =>
            <TodoListItem
                key={todo.text}
                todo={todo}
                onRemovePressed={onRemovePressed}
                onCompletePressed={onCompletePressed}/>)
        }
        <H3>Completed Todos</H3>
        {completedTodos.map(todo =>
            <TodoListItem
                key={todo.text}
                todo={todo}
                onRemovePressed={onRemovePressed}/>)
        }
    </ListWrapper>);
    return isLoading ? loadingMessage : todoList;
};

TodoList.propTypes =  {
    completedTodos: PropTypes.array,
    pendingTodos: PropTypes.array,
    isLoading: PropTypes.bool,
    onRemovePressed: PropTypes.func,
    onCompletePressed: PropTypes.func,
    startLoadingTodos: PropTypes.func,
};

// Gets the entire redux state from connect
// Returns another object but only with the bits you need for props
const mapStateToProps = state => ({
    completedTodos: getCompletedTodos(state),
    pendingTodos: getPendingTodos(state),
    isLoading: getIsLoading(state),
});

const mapDispatchToProps = dispatch => ({
    onRemovePressed: id => dispatch(removeTodoRequest(id)),
    onCompletePressed: id => dispatch(completeTodoRequest(id)),
    startLoadingTodos: () => dispatch(loadTodos()),
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);