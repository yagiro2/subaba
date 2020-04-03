import React, { useState, useCallback } from 'react';
import TextInput from './common/TextInput';
import Button from './common/Button';

const SearchBox = (props) => {

    const { onSearch } = props;

    const [ query, setQuery ] = useState();
    const handleChange = useCallback(e => setQuery(e.target.value), [ setQuery ]);
    const handleClick = useCallback(() => onSearch && onSearch(query), [ query, onSearch ]);

    return (
        <div>
            <TextInput onChange={ handleChange }/>
            <Button
                label="Search"
                disabled={ !query }
                onClick={ handleClick }
            />
        </div>
    );
}

export default SearchBox;