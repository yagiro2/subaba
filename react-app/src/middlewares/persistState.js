import { getPersistedState } from '../reducers/rootReducer';
import debouncify from '../lib/debouncify';

const saveStateDebounced = debouncify(
    (state) => {
        localStorage.state = JSON.stringify(state);
        // console.log('==== stored state', state);
    },
    2000,
);

const persistState = store => next => action => {
    const rv = next(action);
    saveStateDebounced(getPersistedState(store.getState()));
    return rv;
};

export default persistState;