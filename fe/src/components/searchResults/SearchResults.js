import React from 'react';
import styled from 'styled-components';
import H3 from '../typography/H3';
import Sm from '../typography/Sm';
import Subtitle from '../common/Subtitle';
import Loader from '../common/Loader';
import { searchTypes } from '../../consts';

const Container = styled.div`
`;

// todo: code duplication
const WithExtraMarginTop = styled.div`
    margin-top: 60px !important;
`;

const Subject = styled(Sm)`
    margin-top: 5px !important;
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

const renderResults = (searchType, subsArr, subject) => {

    if (!subsArr || !subsArr.length) return null;

    return (
        <Results>
            <H3>> { titlePrefixes[searchType] } results.</H3>
            { subject && <Subject>{ subject }</Subject> }
            { subsArr.map((sub, i) => <Subtitle key={ i } { ...sub }/>) }
        </Results>
    );

}

const SearchResults = ({ subtitles, fetching, type, subject }) => {

    if (fetching) return (
        <WithExtraMarginTop>
            <Loader/>
        </WithExtraMarginTop>
    );


    return (
        <Container>
            { renderResults(type, subtitles, subject) }
        </Container>
    );
};

export default SearchResults;