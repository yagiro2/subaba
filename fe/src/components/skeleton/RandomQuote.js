import React from 'react';
import styled from 'styled-components';
import { getRandomQuote } from '../../lib/randomQuotes';

const Container = styled.div`
    display: flex;
`;

const quote = getRandomQuote();

const QuoteSign = styled((props) => (<span className={ props.className }>"</span>))`
    font-size: 2rem;
    line-height: 18px;
    // color: #5effc4; // #ff5e5e; // #b9b9b9;
    line-height: ${ ({ lineHeight }) => lineHeight };
    vertical-align: ${ ({ verticalAlign }) => verticalAlign };
    margin-right: ${ ({ marginRight }) => marginRight };
    margin-left: ${ ({ marginLeft }) => marginLeft };
`;

const RandomQuote = () => {
    return (
        <Container>
            <QuoteSign verticalAlign="top" lineHeight="18px" marginRight="5px"/>
            <span>
                { quote }
                <QuoteSign verticalAlign="bottom" lineHeight="10px" marginLeft="5px"/>
            </span>
        </Container>    
    );
}

export default RandomQuote;