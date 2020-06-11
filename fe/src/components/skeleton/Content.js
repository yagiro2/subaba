import React from 'react';
import styled from 'styled-components';

import SearchSubtitlesByText from '../searchSubtitlesByText/SearchSubtitlesByText';
import LanguageSelect from '../LanguageSelect';
import { createChildMarginMixin } from '../../mixins/childMarginMixin';
import FileDropSearch from '../fileDropSearch/FileDropSearch';
import AllSearchResults from '../searchResults/AllSearchResults';
import Animated from '../common/animated/Animated';

const Container = styled.div`
    ${ createChildMarginMixin('top', '20px') }
    max-width: 100%;
    display: flex;
    flex-direction: column;
`;

const Row = styled.div`
    display: flex;
    ${ createChildMarginMixin('left', '20px') }
`;

const StyledFileDropSearch = styled(FileDropSearch)`
    align-self: flex-start;
`;

const Content = () => {
    return (
        <Animated delayMs={ 700 }>
        <Container>
            <Row>
                <LanguageSelect/>
            </Row>
            <SearchSubtitlesByText/>
            <StyledFileDropSearch/>
            <AllSearchResults/>
        </Container>
        </Animated>
    );
}

export default Content;