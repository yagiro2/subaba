import React, { useState, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

import SearchBox from '../SearchBox';
import { getSelectedLanguageCode } from '../../reducers/rootReducer';
import usePrev from '../../hooks/usePrev';
import { searchSubtitlesByText } from '../../actions';
import useActions from '../../hooks/useActions';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    > :not(:first-child) {
        margin-top: 40px;
    }
    max-width: 100%;
`;

const SearchSubtitlesByText = () => {

    const [ latestQuery, setLatestQuery ] = useState();
    const actions = useActions({ searchSubtitlesByText });
    const selectedLanguageCode = useSelector(getSelectedLanguageCode);
    const prevLangCode = usePrev(selectedLanguageCode);

    const handleSearch = useCallback(query => {
        setLatestQuery(query);
        actions.searchSubtitlesByText(query, selectedLanguageCode);
    }, [ actions, selectedLanguageCode ]);

    useEffect(
        () => {
            if (selectedLanguageCode !== prevLangCode) {
                if (latestQuery && prevLangCode && selectedLanguageCode) {
                    /** re-run the latest search automatically when switching language */
                    handleSearch(latestQuery);
                }
            }
        },
        [ selectedLanguageCode, latestQuery, prevLangCode, handleSearch ]
    );

    return (
        <Container>
            <SearchBox onSearch={ handleSearch }/>
        </Container>
    );
}

export default SearchSubtitlesByText;