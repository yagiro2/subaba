import React, { useCallback } from 'react';
import styled from 'styled-components';
import AddPlayer from './AddPlayer';
import Players from './Players';
import { useBlankoReducer, actions } from './blankoState';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  > :not(:first-child) {
      margin-top: 20px;
  }
`;

function Blanko() {

    const [ state, dispatch ] = useBlankoReducer();

    const handleAddPlayer = useCallback(
        (player) => {
            dispatch(actions.addPlayer(player));
        }, [ dispatch, actions.addPlayer ]
    );

    const handleAddMove = useCallback(
        (playerName, move) => {
            dispatch(actions.addMove(playerName, move));
        }, [ dispatch, actions.addMove ]
    );

    return (
        <Container>
            <div>Blanko!</div>
            <AddPlayer
                players={ state.players }
                onAddPlayer={ handleAddPlayer }
            />
            <Players
                players={ state.players }
                onAddMove={ handleAddMove }
            />
        </Container>
    );
}

export default Blanko;
