import React from 'react';
import styled from 'styled-components';

import A from './A';
import { createEllipsisTextOverflowMixin } from '../mixins/ellipsisTextOverflowMixin';
import { createChildMarginMixin } from '../mixins/childMarginMixin';

const childMarginMixin = createChildMarginMixin('top', '10px');

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 10px;
    background-color: pink;
    ${ childMarginMixin }
    transition: background-color 100ms;
    :hover {
        background-color: #ff6969;
    }
`;

const StyledA = styled(A)`
    display: flex;
    text-decoration: none;
    color: black;
`;


const Language = styled.div`
    background-color: black;
    color: white;
    padding: 5px;
`;

const ellipsisTextOverflowMixin = createEllipsisTextOverflowMixin('90vw');

const Description = styled.div`
    ${ ellipsisTextOverflowMixin }
`;

const Subtitle = (props) => {
    const { LanguageName, SubDownloadLink, description } = props;
    return (
        <StyledA href={ SubDownloadLink }>
            <Container>
                <Language>{ LanguageName }</Language>
                <Description>{ description }</Description>
            </Container>
        </StyledA>
    );
}

export default Subtitle;