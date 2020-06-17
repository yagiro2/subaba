import React, { useMemo } from 'react';
import styled from 'styled-components';

import Player from './Player';

const Container = styled.div`
    display: flex;
    > :not(:first-child) {
      margin-left: 20px;
  }
`;

const Players = ({ players, onAddMove }) => {

    const playersArr = useMemo(
        () => players && Object.values(players),
        [ players ]
    );

    return (
        <Container>
            { playersArr?.map(player =>
                <Player
                    key={ player.name }
                    { ...player }
                    onAddMove={ (move) => onAddMove && onAddMove(player.name, move) }
                />) }
        </Container>
    );
}

export default Players;
