import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { getLatestSubtitleSearchResults, isFetchingSearchResults } from '../../reducers/rootReducer';
import NoSubtitles from '../common/NoSubtitles';
import H3 from '../typography/H3';
import Subtitle from '../common/Subtitle';
import Loader from '../common/Loader';

const Container = styled.div`
`;

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

const renderResults = (subsArr) => {

    if (!subsArr || !subsArr.length) return null;

    return (
        <Results>
            <H3>> results.</H3>
            { subsArr.map((sub, i) => <Subtitle key={ i } { ...sub }/>) }
        </Results>
    );

}

const SearchResults = () => {
    const results = useSelector(getLatestSubtitleSearchResults);
    const fetching = useSelector(isFetchingSearchResults);

    if (fetching) return (
        <WithExtraMarginTop><Loader/></WithExtraMarginTop>
    );

    const didSearchOnce = fetching !== undefined;
    if (didSearchOnce && (!results || !results.length)) {
        return <WithExtraMarginTop><NoSubtitles/></WithExtraMarginTop>;
    }

    return (
        <Container>
            { renderResults(results, fetching) }
        </Container>
    );
};

export default SearchResults;