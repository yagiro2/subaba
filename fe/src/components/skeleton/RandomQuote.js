import React from 'react';
import styled from 'styled-components';
import { getRandomQuote } from '../../lib/randomQuotes';
import { createChildMarginMixin } from '../mixins/childMarginMixin';

const childMargin = createChildMarginMixin('left', '2px');

const Container = styled.div`
    display: flex;
    align-items: flex-end;
    ${ childMargin }
`;

const quote = getRandomQuote();

const QuoteSign = styled((props) => (<div className={ props.className }>"</div>))`
    font-size: 2rem;
    line-height: 13px;
`;

const RandomQuote = () => {
    return (
        <Container>
            <QuoteSign/>
            <div>{ quote }</div>
            <QuoteSign/>
        </Container>
    );
}

export default RandomQuote;