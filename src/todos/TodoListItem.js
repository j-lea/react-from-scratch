import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const TodoItemContainer = styled.div`
    background: #fff;
    padding: 10px;
    margin-top: 8px;
    border-radius: 5px;
    position: relative;
    box-shadow: 0 4px 8px grey;
`;

const TodoItemContainerWithWarning = styled(TodoItemContainer)`
    border-bottom: ${props => (new Date(props.createdAt) > new Date(Date.now() - 86400000 * 5)
        ? 'none'
        : '2px solid red'
    )};
`;

const ButtonsContainer = styled.div`
    position: absolute;
    right: 12px;
    bottom: 12px;
`;

const Button = styled.button`
    padding: 4px;
    border-radius: 4px;
    cursor: pointer;
    border: none;
    display: inline-block;
`;

const CompletedButton = styled(Button)`
    color: green;
`;

const RemoveButton = styled(Button)`
    color: red;
    margin-left: 8px;
`;

const H3 = styled.h3`
    color: black;
    font-weight: 400;
    margin-top: 0;
    margin-bottom: 8px;
`;

const TodoListItem = ({ todo, onRemovePressed, onCompletePressed }) => {
    const Container = todo.isCompleted ? TodoItemContainer : TodoItemContainerWithWarning;

    return (<Container className={`todo-item-container ${todo.isCompleted ? 'todo-complete' : ''}`}>
        <H3>{todo.text}</H3>
        <p>
            Created at:&nbsp;
            {new Date(todo.createdAt).toLocaleString()}
        </p>
        <ButtonsContainer className='buttons-container'>
            {!todo.isCompleted &&
            <CompletedButton
                className='button-complete'
                onClick={() => onCompletePressed(todo.id)}>
                Mark as completed
            </CompletedButton>
            }
            <RemoveButton
                className='button-remove'
                onClick={() => onRemovePressed(todo.id)}>
                Remove
            </RemoveButton>
        </ButtonsContainer>
    </Container>);
};

TodoListItem.propTypes =  {
    todo: PropTypes.shape({
        id: PropTypes.string,
        text: PropTypes.string,
        createdAt: PropTypes.date,
        isCompleted: PropTypes.bool,
    }),
    onRemovePressed: PropTypes.func,
    onCompletePressed: PropTypes.func,
};

export default TodoListItem;