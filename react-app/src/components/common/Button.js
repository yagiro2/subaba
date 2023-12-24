import React from 'react';
import styled from 'styled-components';

import theme from '../../theme/theme';

const StyledButton = styled.button`
    font-size: 1rem;
    padding: 10px 15px;
    color: white;
    background-color: black;
    border: none;
    cursor: pointer;
    box-sizing: border-box;
    outline: none;
    :hover {
        padding: 9px 14px;
        background-color: ${ theme.colors.active };
        border: 1px solid black;
        color: black;
    }
`;

const Button = (props) => {
    const { label, ...otherProps } = props;
    return (
        <StyledButton { ...otherProps }>
            { label }
        </StyledButton>
    );
}

export default Button;