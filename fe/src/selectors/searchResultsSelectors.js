import { createSelector } from 'reselect';

import { getSearchData } from '../reducers/rootReducer';
import { searchTypes } from '../consts';
import { sortArrayByType } from '../lib/utils';

const searchOrder = [
    searchTypes.movieHash,
    searchTypes.flex,
    searchTypes.text,
];

export const getAllSearchData = createSelector(
    [ getSearchData ],
    (searchData) => {
        
        const searches =
            sortArrayByType(Object.values(searchData), searchOrder, search => search.type)
            .filter(search => search.visible);
            
        const noResults = searches.length && searches.every( ({ subtitles, fetching }) =>
                fetching === false && (!subtitles || !subtitles.length) );

        return {
            searches,
            noResults,
        };
    }
);
