import { createStore, applyMiddleware } from 'redux';
import reduxLogger from 'redux-logger';

import rootReducer from './reducers/rootReducer';

export default function configureStore() {
    const store = createStore(
        rootReducer,
        undefined,
        applyMiddleware(reduxLogger)
    );
    return store;
}