import React from 'react';
import styled from 'styled-components';

import theme from '../../theme/theme';
import { createChildMarginMixin } from '../../mixins/childMarginMixin';

const Wrapper = styled.div`
    position: relative;
    max-width: fit-content;
`

const Container = styled.div`
    display: flex;
    align-items: center;
    ${ createChildMarginMixin('left', '10px') }
    padding: 15px;
    border: 1px solid black;
    user-select: none;
    position: relative;
    z-index: 2;
    background: ${ ({ dragging }) => dragging ? theme.colors.active : 'white' };
`;

const CoolBack = styled.div`
    position: absolute;
    top: 8px;
    left: 8px;
    background: black;
    width: 100%;
    height: 100%;
    z-index: 1;
`

const DropVideoFile = ({ dragging }) => {

    return (
        <Wrapper>
            <Container dragging={ dragging }>
                <span>or just drop a video, don't be a hero</span>
            </Container>
            <CoolBack dragging={ dragging }/>
        </Wrapper>

    );
}

export default DropVideoFile;