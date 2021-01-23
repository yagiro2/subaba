import React, { useState } from 'react';
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
    const handleChange = e => setQuery(e.target.value);
    const handleSearchRequest = () => onSearch && onSearch(query);

    return (
        <Container>
            <StyledTextInput
                onChange={ handleChange }
                placeholder="search here, tofu schmear"
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