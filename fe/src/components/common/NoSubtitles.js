import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const Sad = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    font-size: 4rem;
    transform: rotate(90deg);
    background-color: #ffec0e;
    border-radius: 50%;
    width: 80px;
    height: 80px;
    > div {
        margin-bottom: -10px;
    }
`;

const NoSubtitles = () => {
    return (
        <Container>
            <div>No subtitles for you!</div>
            <Sad><div>:(</div></Sad>
        </Container>
    );
}

export default NoSubtitles;