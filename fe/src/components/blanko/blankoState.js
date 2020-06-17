import { useReducer } from 'react';

const initialState = {
    players: {
        yakir: {
            name: 'yakir',
            moves: [
                { value: 10, },
                { value: 20, },
            ]
        },
        dana: {
            name: 'dana',
            moves: [
                { value: 4, },
                { value: 7, },
            ]
        }
    }
};

const actionTypes = {
    ADD_PLAYER: 'ADD_PLAYER',
    ADD_MOVE: 'ADD_PLAYADD_MOVEER',
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
        default:
            return state;
    }
};

export const useBlankoReducer = (predefinedState = initialState) => {
    return useReducer(blankoReducer, predefinedState);
};

const createAction = (type, payload, meta, error) => ({ type, payload, meta, error });

export const actions = {
    addPlayer: player => createAction(actionTypes.ADD_PLAYER, player),
    addMove: (playerName, move) => createAction(actionTypes.ADD_MOVE, { playerName, move }),
};