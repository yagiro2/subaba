import React from 'react';
import styled from 'styled-components';
import H3 from '../typography/H3';
import Subtitle from '../common/Subtitle';
import Loader from '../common/Loader';
import { searchTypes } from '../../consts';

const Container = styled.div`
`;

// todo: code duplication
const WithExtraMarginTop = styled.div`
    margin-top: 60px !important;
`;

const Results = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    & > :not(:first-child) {
        margin-top: 10px;
    }
    max-width: 100%;
`;

const titlePrefixes = {
    // [searchTypes.text]: 'text',
    [searchTypes.movieHash]: 'exact',
    [searchTypes.flex]: 'flexible',
};

const renderResults = (searchType, subsArr) => {

    if (!subsArr || !subsArr.length) return null;

    return (
        <Results>
            <H3>> { titlePrefixes[searchType] } results.</H3>
            { subsArr.map((sub, i) => <Subtitle key={ i } { ...sub }/>) }
        </Results>
    );

}

const SearchResults = ({ subtitles, fetching, type }) => {

    if (fetching) return (
        <WithExtraMarginTop>
            <Loader/>
        </WithExtraMarginTop>
    );


    return (
        <Container>
            { renderResults(type, subtitles) }
        </Container>
    );
};

export default SearchResults;