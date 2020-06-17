import React from 'react';
import styled from 'styled-components';

import Move from './Move';
import AddMove from './AddMove';

const Container = styled.div`
    display: flex;
    flex-direction: column;
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

const Player = ({ name, moves, onAddMove }) => {
    return (
        <Container>
            <div>{ name }</div>
            <MovesContainer>
                { moves?.map((move, i) =>
                    <Move key={ ++moveId } { ...move } />) }
                <AddMove onAddMove={ onAddMove } />
            </MovesContainer>
        </Container>
    );
}

export default Player;