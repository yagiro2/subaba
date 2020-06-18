import React, { useMemo } from 'react';
import styled from 'styled-components';

import Move from './Move';
import AddMove from './AddMove';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    background-color: #ffeb3b;
    border-radius: 1rem;
    padding: 20px;
    > :not(:first-child) {
      margin-top: 20px;
    }
`;

const MovesContainer = styled.div`
    display: flex;
    flex-direction: column;
    > :not(:first-child) {
      margin-top: 10px;
  }
`;

let moveId = 1;

const getScore = (moves) => {
    return !moves ? 0 : moves.reduce(
        (sum, move) => sum + move.value,
        0
    );
};

const NameContainer = styled.div`
    font-size: 2rem;
`;

const ScoreContainer = styled.div`
    font-size: 2.3rem;
`;

const Player = ({ name, moves, onAddMove, showScore }) => {

    const score = useMemo(
        () => !showScore ? null : getScore(moves),
        [ moves, showScore ]
    );

    return (
        <Container>
            <NameContainer>{ name }</NameContainer>
            <MovesContainer>
                { moves && moves.map(move =>
                    <Move key={ ++moveId } { ...move } />) }
                <AddMove onAddMove={ onAddMove } />
            </MovesContainer>
            { showScore && <ScoreContainer>{ score }</ScoreContainer> }
        </Container>
    );
}

export default Player;