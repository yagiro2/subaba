import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux'

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

const FileDropSearch = (props) => {

    const dispatch = useDispatch();

    const { className } = props;

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
        dispatch(searchByFile(firstFile));

    }, [ dispatch, handleDragEnd ]);

    useEffect(() => {
        document.body.ondrop = handleDrop;
        document.body.ondragover = handleDragOver;
        document.body.onmouseout = handleDragEnd;
    }, [ handleDrop, handleDragOver, handleDragEnd ]);

    return (
        <DropVideoFile className={ className } dragging={ dragging }/>
    );
}

export default FileDropSearch;