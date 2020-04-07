import React, { useState, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

import { searchSubtitleByQuery } from '../../api/api.js';
import SearchBox from '../SearchBox';
import Subtitle from '../common/Subtitle';
import { getSelectedLanguageCode } from '../../reducers/rootReducer';
import { sortSubsArrByVipAndAlphabet, removeExtenstion } from '../../lib/utils';
import Loader from '../common/Loader.js';
import NoSubtitles from '../common/NoSubtitles';
import usePrev from '../../hooks/usePrev';
import H3 from '../typography/H3';
import { normalizeSubtitlesResponse } from '../../adapter/subtitlesAdapter';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    > :not(:first-child) {
        margin-top: 40px;
    }
    .extra-margin-top {
        margin-top: 60px;
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

const renderResults = (subsArr, fetching) => {
    if (fetching !== undefined && (!subsArr || !subsArr.length)) {
        return <div className="extra-margin-top"><NoSubtitles/></div>;
    }
    return (
        <Results>
            { subsArr && !!subsArr.length && <H3>> results.</H3> }
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
            .then(normalizeSubtitlesResponse)
            .then(setResults)
            .finally(() => setFetching(false));
    }, [ setResults, selectedLanguageCode ]);

    return (
        <Container>
            <SearchBox onSearch={ handleSearch }/>
            {
                fetching
                    ? <div className="extra-margin-top"><Loader/></div>
                    : renderResults(results, fetching)
            }
        </Container>
    );
}

export default SearchSubtitlesByText;