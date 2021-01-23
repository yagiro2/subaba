import React, { useState } from 'react';
import styled from 'styled-components';
import H3 from '../typography/H3';
import Sm from '../typography/Sm';
import Subtitle from '../common/Subtitle';
import Loader from '../common/Loader';
import { searchTypes } from '../../consts';
import CollpaseArrow from '../common/CollapseArrow';

const Container = styled.div`
`;

// todo: code duplication
const WithExtraMarginTop = styled.div`
    margin-top: 60px !important;
`;

const Subject = styled(Sm)`
    margin-top: 3px;
`;

const Results = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    max-width: 100%;
`;

const titlePrefixes = {
    // [searchTypes.text]: 'text',
    [searchTypes.movieHash]: 'exact',
    [searchTypes.flex]: 'flexible',
};

const List = styled.div`
    display: ${ ({ expanded }) => expanded ? 'flex' : 'none' };
    flex-direction: column;
    align-items: flex-start;
    margin-top: 10px;
    & > :not(:first-child) {
        margin-top: 10px;
    }
`

const Row = styled.div`
    display: flex;
    align-items: center;
    & > :not(:first-child) {
        margin-left: 10px;
    }
    .title {
        margin-top: -5px;
    }
`

const renderResults = (searchType, subsArr, subject, expanded, setExpanded) => {

    if (!subsArr || !subsArr.length) return null;

    return (
        <Results>
            <Row className="clickable" onClick={ () => setExpanded(!expanded) }>
                <H3 className="title">{ titlePrefixes[searchType] } results</H3>
                <CollpaseArrow expanded={ expanded } size="1.7rem"/>
            </Row>
            { subject && <Subject>{ subject }</Subject> }
            <List expanded={ expanded }>
                { subsArr.map((sub, i) => <Subtitle key={ i } { ...sub }/>) }
            </List>
        </Results>
    );

}

const SearchResults = ({ subtitles, fetching, type, subject }) => {

    const [ expanded, setExpanded ] = useState(true);

    if (fetching) return (
        <WithExtraMarginTop>
            <Loader/>
        </WithExtraMarginTop>
    );


    return (
        <Container>
            { renderResults(type, subtitles, subject, expanded, setExpanded) }
        </Container>
    );
};

export default SearchResults;