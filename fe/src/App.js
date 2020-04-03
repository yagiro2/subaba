import React, { useCallback, useState } from 'react';
import './App.css';
import SearchBox from './components/SearchBox';

import { searchSubtitleByQuery } from './api.js';

function App() {

  const [ res, setRes ] = useState();

  const handleSearch = useCallback(query => {
    searchSubtitleByQuery(query)
      .then(json => setRes(json))
  }, [ setRes ]);

  return (
    <div>
        <SearchBox onSearch={ handleSearch }/>
        <div>{ JSON.stringify(res) }</div>
    </div>
  );
}

export default App;
