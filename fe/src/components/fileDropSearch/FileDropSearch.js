import React, { useCallback, useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import useActions from '../../hooks/useActions';

import { searchByFile } from '../../actions';
import DropVideoFile from './DropVideoFile';

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

const visibleCss = css`
    border: 3px black dashed;
    z-index: 3;
    background-color: #fff700;
    opacity: .5;
`;

const marginVal = 1;
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
    ${ ({ visible }) => !visible ? '' : visibleCss }
`;

const actionCreators = {
    searchByFile,
};

const FileDropSearch = (props) => {

    const { className } = props;

    const actions = useActions(actionCreators)
    const [ dragging, setDragging ] = useState(false);

    const handleDragEnd = useCallback(() => {
        setDragging(false);
    }, [ setDragging ]);

    const handleDragOver = useCallback((ev) => {
        ev.preventDefault();
        setDragging(true);
    }, [ setDragging ]);

    const handleDrop = useCallback(ev => {
        // Prevent default behavior (Prevent file from being opened)
        ev.preventDefault();
        
        handleDragEnd();
        
        const files = getDroppedFilesFromDropEvent(ev);
        const firstFile = files && files[0];
        if (!firstFile) return;
        actions.searchByFile(firstFile);
    }, [ actions, handleDragEnd ]);

    useEffect(() => {
        document.body.ondrop = handleDrop;
        document.body.ondragover = handleDragOver;
        document.body.onmouseout = handleDragEnd;
    }, [ handleDrop, handleDragOver, handleDragEnd ]);

    return (
        <>
            <Container visible={ dragging }/>
            <DropVideoFile className={ className }/>
        </>
    );
}

export default FileDropSearch;