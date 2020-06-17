import React, { useState, useCallback, useMemo } from 'react';
import styled from 'styled-components';

import TextAndButton from './TextAndButton';

const StyledTextAndButton = styled(TextAndButton)`
    input {
        width: 30%;
        min-width: 50px;
    }
`;

function AddMove({ onAddMove }) {

    const [ moveScore, setMoveScore ] = useState('');
    
    const handleScoreChange = useCallback(
        e => {
            const value = e.target.value;
            setMoveScore(value);
        }, [ setMoveScore ]
    );

    const handleAddMove = useCallback(
        () => {
            onAddMove && onAddMove({ value: parseInt(moveScore) });
            setMoveScore('');
        }, [ moveScore, onAddMove ]
    );
    
    const isValidMoveScore = moveScore.match(/^\d+$/);

    const inputProps = useMemo(
        () => ({ value: moveScore, onChange: handleScoreChange }),
        [ moveScore, handleScoreChange ]
    );

    const buttonProps = useMemo(
        () => ({
            label: '+',
            disabled: !isValidMoveScore,
            onClick: handleAddMove,
        }),
        [ isValidMoveScore, handleAddMove ]
    );

    return (
        <StyledTextAndButton
            inputProps={ inputProps }
            buttonProps={ buttonProps }
        />
    );
}

export default AddMove;
