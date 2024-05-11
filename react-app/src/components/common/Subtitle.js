import React from 'react';
import styled from 'styled-components';

import A from './A';
import { createEllipsisTextOverflowMixin } from '../../mixins/ellipsisTextOverflowMixin';
import { createChildMarginMixin } from '../../mixins/childMarginMixin';
import SubtitleTag from './SubtitleTag';
import theme from '../../theme/theme';

const childMarginMixin = createChildMarginMixin('left', '10px');

const Container = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 5px;
    background-color: ${ theme.colors.active };
    border: solid 2px ${ theme.colors.brown1 };
    ${ childMarginMixin }
    max-width: 100%;
    &:hover {
        background-color: ${ theme.colors.active2 };
    }
`;

const StyledA = styled(A)`
    display: flex;
    text-decoration: none;
    color: ${ theme.colors.brown1 };
    max-width: 100%;
`;

const ellipsisTextOverflowMixin = createEllipsisTextOverflowMixin('100%');

const Description = styled.div`
    ${ ellipsisTextOverflowMixin }
`;

const tagsChildMarginMixin = createChildMarginMixin('left', '10px');

const Row = styled.div`
    display: flex;
    ${ tagsChildMarginMixin }
`;

const renderTags = tags => {
    if (!tags) return null;
    return tags.map((tag, i) => <SubtitleTag { ...tag } key={ i }/>);
};

const Subtitle = (props) => {
    const { LanguageName, directDownloadLink, description, tags } = props;
    return (
        <StyledA href={ directDownloadLink }>
            <Container>
                <Row>
                    <SubtitleTag label={ LanguageName } />
                    { renderTags(tags) }
                </Row>
                <Description>{ description }</Description>
            </Container>
        </StyledA>
    );
}

export default Subtitle;