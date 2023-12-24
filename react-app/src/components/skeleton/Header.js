import React from 'react';
import styled from 'styled-components';
import RandomQuote from './RandomQuote';
import { createChildMarginMixin } from '../../mixins/childMarginMixin';
import { getRandomItem } from '../../lib/utils';

const childMargin = createChildMarginMixin('top', '10px');

const Container = styled.div`
    ${ childMargin }
`;

const Title = styled.div`
    font-size: 3rem;
    line-height: 3rem;
`;

const suffixes = [ '.', '?' ];

const Header = () => {
    return (
        <Container>
            <Title>subaba{ getRandomItem(suffixes) }</Title>
            <RandomQuote/>
        </Container>
    );
}

export default Header;