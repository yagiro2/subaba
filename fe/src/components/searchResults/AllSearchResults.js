import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import NoSubtitles from '../common/NoSubtitles';
import SearchResults from './SearchResults';

import { getAllSearchData } from '../../selectors/searchResultsSelectors';
import { createChildMarginMixin } from '../mixins/childMarginMixin';

// todo: code duplication
const WithExtraMarginTop = styled.div`
    margin-top: 60px !important;
`;


const Container = styled.div`
    ${ createChildMarginMixin('top', '20px') }
`;

const AllSearchResults = () => {
    const { searches, noResults } = useSelector(getAllSearchData);

    if (noResults) {
        return (
            <WithExtraMarginTop>
                <NoSubtitles/>
            </WithExtraMarginTop>
        );
    }

    return (
        <Container>
            {
                searches.map((search, i) =>
                    <SearchResults
                        key={ i }
                        { ...search }
                    />
                )
            }
        </Container>
    );
}

export default AllSearchResults;
