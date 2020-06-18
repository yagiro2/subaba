import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import AddPlayer from './AddPlayer';
import Players from './Players';
import { useBlankoReducer, actions } from './blankoState';
import Button from '../common/Button';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: rebeccapurple;
  padding: 30px 40px;
  > :not(:first-child) {
      margin-top: 20px;
  }
`;

const Controls = styled.div`
  display: flex;
  > :not(:first-child) {
      margin-left: 20px;
  }
`;


const GameTitle = styled.div`
    color: white;
    font-size: 4rem;
`;


function Blanko() {

    const [ showScores, setShowScores ] = useState(true);
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
            <GameTitle>Blanko!</GameTitle>
            <Controls>
                <AddPlayer
                    players={ state.players }
                    onAddPlayer={ handleAddPlayer }
                />
                <Button
                    label={ `${ !showScores ? 'Show' : 'Hide' } Scores` }
                    onClick={ () => setShowScores(!showScores) }
                />
                <Button
                    label="Reset"
                    onClick={ () => dispatch(actions.reset()) }
                />
            </Controls>
            <Players
                players={ state.players }
                onAddMove={ handleAddMove }
                showScores={ showScores }
            />
        </Container>
    );
}

export default Blanko;
