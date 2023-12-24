import { createStore, applyMiddleware } from 'redux';
import reduxLogger from 'redux-logger';
import { thunk } from 'redux-thunk';

import persistState from './middlewares/persistState';

import rootReducer from './reducers/rootReducer';

export default function configureStore() {
    const store = createStore(
        rootReducer,
        undefined,
        applyMiddleware(reduxLogger, thunk, persistState)
    );
    return store;
}