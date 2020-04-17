import React, { useState, useCallback } from 'react';
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

const useAnimation = (classNameProp) => {

    const [ animationStarted, setAnimationStarted ] = useState(false);

    const startAnimation = useCallback(() => {
        setAnimationStarted(true);
    }, [ setAnimationStarted ]);

    const className = classnames(classNameProp, { 'sport-wheel': animationStarted });

    return {
        className,
        startAnimation,
    };
};

const DropVideoFile = ({ className: classNameProp, ...otherProps }) => {

    const { className, startAnimation } = useAnimation(classNameProp);

    return (
        <Container className={ className } { ...otherProps }>
            <img src={ dropAvi } alt="file" width="24px" onLoad={ startAnimation }/>
            <div>
                drop a video file to search
            </div>
        </Container>
    );
}

export default DropVideoFile;