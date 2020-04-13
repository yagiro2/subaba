import React, { useCallback} from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

import SearchBox from '../SearchBox';
import { getSelectedLanguageCode } from '../../reducers/rootReducer';
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

    const actions = useActions({ searchSubtitlesByText });
    const selectedLanguageCode = useSelector(getSelectedLanguageCode);

    const handleSearch = useCallback(query => {
        actions.searchSubtitlesByText(query, selectedLanguageCode);
    }, [ actions, selectedLanguageCode ]);


    return (
        <Container>
            <SearchBox onSearch={ handleSearch }/>
        </Container>
    );
}

export default SearchSubtitlesByText;