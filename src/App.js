import React from 'react';
import { hot } from 'react-hot-loader';
import styled from 'styled-components';
import './App.css';
import TodoList from './todos/TodoList';

const AppContainer = styled.div`
    margin: 1rem;
    font-family: Arial, Helvetica, sans-serif;
    color: #222222;    
`;

const App = () => (
    <AppContainer className='App'>
        <TodoList />
    </AppContainer>
)

export default hot(module)(App);