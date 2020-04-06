import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

import { searchSubtitleByQuery } from '../../api/api.js';
import SearchBox from '../SearchBox';
import Subtitle from '../common/Subtitle';
import { getSelectedLanguageCode } from '../../reducers/rootReducer';
import { sortSubsArrByVipAndAlphabet } from '../../utils';

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

const normalizeResultsResponse = subsArr => {
    const sortedSubsArr = sortSubsArrByVipAndAlphabet(subsArr);
    return sortedSubsArr;
};

const SearchSubtitlesByText = () => {

    const [ results, setResults ] = useState([]);
    const selectedLanguageCode = useSelector(getSelectedLanguageCode);

    const handleSearch = useCallback(query => {
      searchSubtitleByQuery(query, selectedLanguageCode)
        .then(normalizeResultsResponse)
        .then(setResults)
    }, [ setResults, selectedLanguageCode ]);

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