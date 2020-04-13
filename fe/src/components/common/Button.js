import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
    font-size: 1rem;
    padding: 10px 15px;
    color: white;
    background-color: black;
    border: none;
    cursor: pointer;
    box-sizing: border-box;
    outline: none;
    transition: background-color .2s, color .2s;
    :hover {
        padding: 9px 14px;
        background-color: #ff6969;
        border: 1px solid black;
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