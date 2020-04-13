import { getPersistedState } from "../reducers/rootReducer";

const persistState = store => next => action => {
    const rv = next(action);
    const stateToPersist = getPersistedState(store.getState());
    localStorage.state = JSON.stringify(stateToPersist);
    return rv;
};

export default persistState;