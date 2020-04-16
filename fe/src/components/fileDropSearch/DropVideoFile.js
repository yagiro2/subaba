import React from 'react';
import styled from 'styled-components';
import classnames from 'classnames';

import dropAvi from '../../assets/drop-avi.png'
import { createChildMarginMixin } from '../../mixins/childMarginMixin';

import '../../style/sport-wheel.css';

const Container = styled.div`
    display: flex;
    align-items: center;
    ${ createChildMarginMixin('left', '10px') }
    background-color: #f2f2f2;
    padding: 15px;
    border: 2px dashed black;
`;

const DropVideoFile = ({ className, ...otherProps }) => {
    return (
        <Container className={ classnames(className, 'sport-wheel') } { ...otherProps }>
            <img src={ dropAvi } alt="loading" width="24px"/>
            <div>
                drop a video file to search
            </div>
        </Container>
    );
}

export default DropVideoFile;