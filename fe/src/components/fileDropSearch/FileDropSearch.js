import React, { useCallback, useEffect } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import useActions from '../../hooks/useActions';
import osHash from '../../lib/osHash';
import { searchSubtitlesByMovieHash } from '../../actions';
import { getSelectedLanguageCode } from '../../reducers/rootReducer';

function dragOverHandler(ev) {
    // Prevent default behavior (Prevent file from being opened)
    ev.preventDefault();
}

function getDroppedFilesFromDropEvent(ev) {

    const droppedFiles = [];
  
    if (ev.dataTransfer.items) {
      // Use DataTransferItemList interface to access the file(s)
      for (let i = 0; i < ev.dataTransfer.items.length; i++) {
        // If dropped items aren't files, reject them
        if (ev.dataTransfer.items[i].kind === 'file') {
          const file = ev.dataTransfer.items[i].getAsFile();
          droppedFiles.push(file);
          //   console.log('... file[' + i + '].name = ' + file.name);
        }
    }
} else {
    // Use DataTransfer interface to access the file(s)
    for (let i = 0; i < ev.dataTransfer.files.length; i++) {
        const file = ev.dataTransfer.files[i];
        droppedFiles.push(file);
        // console.log('... file[' + i + '].name = ' + file.name);
      }
    }

    return droppedFiles;
}

const marginVal = 2;
const marginUnit = 'vmin';
const margin = marginVal + marginUnit;

const Container = styled.div`
    z-index: -1;
    position: fixed;
    margin: 0 !important;
    width: calc(100vw - ${ marginVal * 2 }${ marginUnit });
    height: calc(100vh - ${ marginVal * 2 }${ marginUnit });
    top: ${ margin };
    left: ${ margin };
`;

const FileDropSearch = () => {

    const selectedLanguageCode = useSelector(getSelectedLanguageCode);

    const actions = useActions({ searchSubtitlesByMovieHash })

    const searchByHash = useCallback(movieHash => {
        actions.searchSubtitlesByMovieHash(movieHash, selectedLanguageCode);
    }, [ actions, selectedLanguageCode ]);

    const handleDrop = useCallback(ev => {
        // Prevent default behavior (Prevent file from being opened)
        ev.preventDefault();
        
        const files = getDroppedFilesFromDropEvent(ev);
        const firstFile = files && files[0];
        if (!firstFile) return;
        osHash(firstFile)
            .then(searchByHash);
    }, [ searchByHash ]);

    useEffect(() => {
        document.body.ondrop = handleDrop;
        document.body.ondragover = dragOverHandler;
    }, [ handleDrop ]);

    return (
        <Container/>
    );
}

export default FileDropSearch;