import { useReducer } from 'react';


const parseJsonSafe = json => {
    try {
        return JSON.parse(json);
    }
    catch(e) {
        return;
    }
};

const getInitialState = () => {
    return parseJsonSafe(localStorage.blankoState) ?? {};
};

const initialState = getInitialState();

const actionTypes = {
    ADD_PLAYER: 'ADD_PLAYER',
    ADD_MOVE: 'ADD_PLAYADD_MOVE',
    RESET: 'RESET',
};

const reduceReset = () => {
    return {};
};

const reduceAddPlayer = (state, action) => {
    const player = action.payload;
    return {
        ...state,
        players: {
            ...state.players,
            [player.name]: player,
        },
    };
};

const reduceAddMove = (state, action) => {
    const { playerName, move } = action.payload;
    const player = state.players[playerName];
    return {
        ...state,
        players: {
            ...state.players,
            [playerName]: {
                ...player,
                moves: (player?.moves ?? []).concat([ move ])
            },
        },
    };
};

const blankoReducer = (state, action) => {
    switch (action.type) {
        case actionTypes.ADD_PLAYER:
            return reduceAddPlayer(state, action);
        case actionTypes.ADD_MOVE:
            return reduceAddMove(state, action);
        case actionTypes.RESET:
            return reduceReset();
        default:
            return state;
    }
};

const blankoReducerWithMiddleware = (state, action) => {
    const newState = blankoReducer(state, action);
    localStorage.blankoState = JSON.stringify(newState);
    return newState;
};

export const useBlankoReducer = (predefinedState = initialState) => {
    return useReducer(blankoReducerWithMiddleware, predefinedState);
};

const createAction = (type, payload, meta, error) => ({ type, payload, meta, error });

export const actions = {
    addPlayer: player => createAction(actionTypes.ADD_PLAYER, player),
    addMove: (playerName, move) => createAction(actionTypes.ADD_MOVE, { playerName, move }),
    reset: () => createAction(actionTypes.RESET),
};