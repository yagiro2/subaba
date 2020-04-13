import React, { useCallback } from 'react';
import styled from 'styled-components';

const StyledInput = styled.input`
    font-size: 1.1rem;
    padding: 6px 10px;
    border: solid 1px #444;
`;

const TextInput = (props) => {
    const { onEnter, onKeyPress, ...otherProps } = props;

    const handleKeyPress = useCallback(
        e => {
            if (onKeyPress) {
                onKeyPress(e);
            }
            else if (onEnter) {
                if (e.key === 'Enter') {
                    onEnter(e);
                }
            }
        },
        [ onEnter, onKeyPress ]);

    return (
        <StyledInput
            { ...otherProps }
            type="text"
            onKeyPress={ handleKeyPress }
        />
    );
}

export default TextInput;