import React, { useState, useCallback } from 'react';
import styled from 'styled-components';

import TextInput from './common/TextInput';
import Button from './common/Button';

const Container = styled.div`
    display: flex;
`;

const StyledTextInput = styled(TextInput)`
    min-width: 40vw;
    outline: none;
`;

const StyledButton = styled(Button)`
    margin-left: -1px;
`;

const SearchBox = (props) => {

    const { onSearch } = props;

    const [ query, setQuery ] = useState();
    const handleChange = useCallback(e => setQuery(e.target.value), [ setQuery ]);
    const handleSearchRequest = useCallback(() => onSearch && onSearch(query), [ query, onSearch ]);

    return (
        <Container>
            <StyledTextInput
                onChange={ handleChange }
                placeholder="what?"
                onEnter={ handleSearchRequest }
            />
            <StyledButton
                label="search"
                disabled={ !query }
                onClick={ handleSearchRequest }
            />
        </Container>
    );
}

export default SearchBox;