import React, { useState, useCallback, useMemo } from 'react';

import TextAndButton from './TextAndButton';

function AddPlayer({ players, onAddPlayer }) {

    const [ playerName, setPlayerName ] = useState('');
    
    const validatePlayerName = useCallback(
        playerName => !!playerName && !players?.[playerName],
        [ players ]
    );

    const handleNameChange = useCallback(
        e => {
            const name = e.target.value;
            setPlayerName(name);
        }, [ setPlayerName ]
    );

    const handleAddPlayer = useCallback(
        () => {
            onAddPlayer && onAddPlayer({ name: playerName });
        }, [ playerName, onAddPlayer ]
    );
    
    const isValidName = validatePlayerName(playerName);

    const inputProps = useMemo(
        () => ({ value: playerName, onChange: handleNameChange }),
        [ playerName, handleNameChange ]
    );

    const buttonProps = useMemo(
        () => ({
            label: 'Add Player',
            disabled: !isValidName,
            onClick: handleAddPlayer,
        }),
        [ isValidName, handleAddPlayer ]
    );

    return (
        <TextAndButton
            inputProps={ inputProps }
            buttonProps={ buttonProps }
        />
    );
}

export default AddPlayer;
