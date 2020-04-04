import React, { useCallback } from 'react';
import styled, { css } from 'styled-components';

import RadioButton from './RadioButton';

const Container = styled.div`
    display: flex;
`;

const RadioButtons = (props) => {

    const { selectedOptionId, options, onChange } = props;

    const handleOptionClick = useCallback(
        option => { onChange && onChange(option); },
        [ onChange ]
    );

    return (
        <Container>
            { options.map((option, i) =>
                <RadioButton
                    key={ i }
                    label={ option.label }
                    onClick={ () => handleOptionClick(option) }
                    selected={ option.id === selectedOptionId }
                />) }
        </Container>
    );
}

export default RadioButtons;