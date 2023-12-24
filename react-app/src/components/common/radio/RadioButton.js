import React from 'react';
import styled, { css } from 'styled-components';
import theme from '../../../theme/theme';

const nonSelectedHoverCss = css`
    :hover {
        padding: 8px 13px;
        background-color: ${ theme.colors.active };
    }
`;

const Container = styled.div`
    padding: 5px 8px;
    cursor: pointer;
    background-color: ${ ({ selected }) => selected ? 'black' : 'white' };
    color: ${ ({ selected }) => selected ? 'white' : 'black' };
    border: solid 1px black;
    :not(:first-child) {
        margin-left: -1px;
    }
    padding: 8px 13px;
    user-select: none;
    ${ ({ selected }) => selected ? '' : nonSelectedHoverCss }

`;

const RadioButton = ({ label, ...otherProps }) => {
    return (
        <Container { ...otherProps }>
            { label }
        </Container>
    );
}

export default RadioButton;