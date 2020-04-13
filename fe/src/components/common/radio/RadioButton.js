import React from 'react';
import styled, { css } from 'styled-components';

const nonSelectedHoverCss = css`
    :hover {
        padding: 8px 13px;
        background-color: #ffe007; // #ffdf00; // #ececec;
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
    transition: background-color .3s;
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