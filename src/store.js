import { createStore, combineReducers, applyMiddleware } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { isLoading, todos } from './todos/reducers';

const reducers = { todos, isLoading };

const persistConfig = {
    key: 'root',
    storage, // defaults to localstorage on the web
    stateReconciler: autoMergeLevel2
};

const rootReducer = combineReducers(reducers);
const persistentReducer = persistReducer(persistConfig, rootReducer);

export const configureStore = () => createStore(
    persistentReducer,
    composeWithDevTools(applyMiddleware(thunk)),
);