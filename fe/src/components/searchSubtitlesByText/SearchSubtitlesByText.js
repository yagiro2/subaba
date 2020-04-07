import React, { useState, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

import { searchSubtitleByQuery } from '../../api/api.js';
import SearchBox from '../SearchBox';
import Subtitle from '../common/Subtitle';
import { getSelectedLanguageCode } from '../../reducers/rootReducer';
import { sortSubsArrByVipAndAlphabet } from '../../utils';
import Loader from '../common/Loader.js';
import NoSubtitles from '../common/NoSubtitles';
import usePrev from '../../hooks/usePrev';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    > :not(:first-child) {
        margin-top: 30px;
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

const renderResults = (subsArr, fetching) => {
    if (fetching !== undefined && (!subsArr || !subsArr.length)) {
        return <NoSubtitles/>
    }
    return (
        <Results>
            { subsArr.map((sub, i) => <Subtitle key={ i } { ...sub }/>) }
        </Results>
    );
};

const SearchSubtitlesByText = () => {

    const [ latestQuery, setLatestQuery ] = useState();
    const [ results, setResults ] = useState([]);
    const [ fetching, setFetching ] = useState();
    const selectedLanguageCode = useSelector(getSelectedLanguageCode);
    const prevLangCode = usePrev(selectedLanguageCode);

    useEffect(
        () => {
            if (latestQuery && prevLangCode && selectedLanguageCode) {
                /** re-run the latest search automatically when switching language */
                handleSearch(latestQuery);
            }
        },
        [ selectedLanguageCode ]
    );

    const handleSearch = useCallback(query => {
        setLatestQuery(query);
        setFetching(true);
        searchSubtitleByQuery(query, selectedLanguageCode)
            .then(normalizeResultsResponse)
            .then(setResults)
            .finally(() => setFetching(false));
    }, [ setResults, selectedLanguageCode ]);

    return (
        <Container>
            <SearchBox onSearch={ handleSearch }/>
            {
                fetching
                    ? <Loader/>
                    : renderResults(results, fetching)
            }
        </Container>
    );
}

export default SearchSubtitlesByText;