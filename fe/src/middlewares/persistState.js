const persistState = store => next => action => {
    const rv = next(action);
    localStorage.state = JSON.stringify(store.getState());
    return rv;
};

export default persistState;