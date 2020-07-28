import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { createTodoRequest } from './thunks';
import { getTodos } from './selectors';

const FormContainer = styled.div`
    padding: 16px;
    text-align: center;
`;

const Input = styled.input`
    font-size: 14px;
    padding: 4px;
`;

const Button = styled.button`
    font-size: 14px;
    padding: 6px 8px;
    border-radius: 4px;
    cursor: pointer;
    border: none;
    display: inline-block;
    margin-left: 8px;
`;

const NewTodoForm = ({ todos = [], onCreatePressed }) => {
    const [inputValue, setInputValue] = useState(''); // Set it to an empty string by defaut
    return (<FormContainer className='new-todo-form'>
        <Input
            className='input-new-todo'
            type='text'
            placeholder='Enter your todo here'
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
        />
        <Button
            className='button-create-todo'
            onClick={() => {
                const isEmpty = inputValue === '';
                const isDuplicate = todos.some(todo => todo.text === inputValue);
                if (!isEmpty && !isDuplicate) {
                    onCreatePressed(inputValue);
                    setInputValue('');
                }
            }}>Create</Button>
    </FormContainer>);
};

NewTodoForm.propTypes =  {
    todos: PropTypes.array,
    onCreatePressed: PropTypes.func,
};

// Gets the entire redux state from connect
// Returns another object but only with the bits you need for props
const mapStateToProps = state => ({
    todos: getTodos(state),
});

// Gets the dispatch - allowing components to trigger redux actions
// Return only the actions that you need
const mapDispatchToProps = dispatch => ({
    onCreatePressed: text => dispatch(createTodoRequest(text)),
});

// Connect is a higher order function, so we have to use two sets of parentheses
export default connect(mapStateToProps, mapDispatchToProps)(NewTodoForm);