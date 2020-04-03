import React from 'react';
import styled from 'styled-components';

const StyledInput = styled.input`
    font-size: 1.1rem;
    padding: 5px 10px;
`;

const TextInput = (props) => {
    return (
        <StyledInput
            { ...props }
            type="text"
        />
    );
}

export default TextInput;