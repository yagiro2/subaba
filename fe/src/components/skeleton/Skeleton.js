import React from 'react';
import styled from 'styled-components';

import Header from './Header';
import Content from './Content';

const Container = styled.div`
    > :not(:first-child) {
        margin-top: 20px;
    }
`;

const Skeleton = () => {
    return (
        <Container>
            <Header/>
            <Content/>
        </Container>
    );
}

export default Skeleton;