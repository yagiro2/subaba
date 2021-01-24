import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { fetchAllQuotes } from '../../api/api';
import { getRandomItem } from '../../lib/utils';

const Container = styled.div`
    display: flex;
`;

const QuoteSign = styled((props) => (<span className={ props.className }>"</span>))`
    font-size: 2rem;
    line-height: 18px;
    line-height: ${ ({ lineHeight }) => lineHeight };
    vertical-align: ${ ({ verticalAlign }) => verticalAlign };
    margin-right: ${ ({ marginRight }) => marginRight };
    margin-left: ${ ({ marginLeft }) => marginLeft };
`;

const Loading = styled.span`
    color: grey;
`

const FALLBACK_QUOTE = 'Sometimes you eat the bar, and sometimes the bar eats you.'

const Quote = ({ quote }) => (
    <>
        <QuoteSign verticalAlign="top" lineHeight="18px" marginRight="5px"/>
        <span>
            { quote }
            <QuoteSign verticalAlign="bottom" lineHeight="10px" marginLeft="5px"/>
        </span>
    </>
)

function useRandomQuote() {
    const [ quote, setQuote ] = useState();
    const [ fetching, setFetching ] = useState();

    useEffect(() => {
        setFetching(true)
        fetchAllQuotes()
            .then(quotes => setQuote(getRandomItem(quotes) || FALLBACK_QUOTE))
            .catch(() => setQuote(FALLBACK_QUOTE))
            .finally(() => setFetching(false))
    }, [ setQuote, setFetching ])

    return [ quote, fetching ];
}

const RandomQuote = () => {

    const [ quote, fetching ] = useRandomQuote()

    return (
        <Container>
        {
            fetching
                ? <Loading>fetching a random quote from space...</Loading>
                : <Quote quote={ quote }/>
        }
        </Container>    
    );
}

export default RandomQuote;