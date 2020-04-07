import React from 'react';
import styled from 'styled-components';
import RandomQuote from './RandomQuote';
import { createChildMarginMixin } from '../mixins/childMarginMixin';

const childMargin = createChildMarginMixin('top', '5px');

const Container = styled.div`
    ${ childMargin }
`;

const Title = styled.div`
    font-size: 3rem;
    line-height: 3rem;
`;

const Header = () => {
    return (
        <Container>
            <Title>subaba.</Title>
            <RandomQuote/>
        </Container>
    );
}

export default Header;