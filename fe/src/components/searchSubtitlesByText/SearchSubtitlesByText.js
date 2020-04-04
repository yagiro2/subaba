import React, { useState, useCallback, useEffect } from 'react';
import styled from 'styled-components';

import { searchSubtitleByQuery } from '../../api.js';
import SearchBox from '../SearchBox';
import Subtitle from '../common/Subtitle';

const Container = styled.div`
    > :not(:first-child) {
        margin-top: 20px;
    }
`;

const Results = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    & > :not(:first-child) {
        margin-top: 10px;
    }
`;

const normalizeResultsResponse = subsRes => {
    return Object.values(subsRes);
};

const SearchSubtitlesByText = () => {

    const [ results, setResults ] = useState([]);

    const handleSearch = useCallback(query => {
      searchSubtitleByQuery(query)
        .then(normalizeResultsResponse)
        .then(setResults)
    }, [ setResults ]);

    return (
        <Container>
            <SearchBox onSearch={ handleSearch }/>
            <Results>
                { results.map((sub, i) => <Subtitle key={ i } { ...sub }/>) }
            </Results>
        </Container>
    );
}

export default SearchSubtitlesByText;