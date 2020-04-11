import React from 'react';
import styled from 'styled-components';

import SearchSubtitlesByText from '../searchSubtitlesByText/SearchSubtitlesByText';
import LanguageSelect from '../LanguageSelect';
import { createChildMarginMixin } from '../mixins/childMarginMixin';
import FileDropSearch from '../fileDropSearch/FileDropSearch';
import SearchResults from '../searchResults/SearchResults';

const childMargin = createChildMarginMixin('top', '20px');

const Container = styled.div`
    ${ childMargin }
    max-width: 100%;
`;

const Content = () => {
    return (
        <Container>
            <LanguageSelect/>
            <SearchSubtitlesByText/>
            <FileDropSearch/>
            <SearchResults/>
        </Container>
    );
}

export default Content;