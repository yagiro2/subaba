import React from 'react';
import styled from 'styled-components';

import SadFace from './SadFace';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const NoSubtitles = () => {
    return (
        <Container>
            <div>No subtitles for you!</div>
            <SadFace/>
        </Container>
    );
}

export default NoSubtitles;