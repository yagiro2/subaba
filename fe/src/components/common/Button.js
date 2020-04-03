import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
    font-size: 1.1rem;
    padding: 7px;
    color: white;
    background-color: red;
    border: none;
    cursor: pointer;
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