import React, { useEffect, useState, useRef, cloneElement } from 'react';
import styled from 'styled-components';

import './Animated.css';

const Container = styled.div`
    animation-name: slide-vertical;
    animation-duration: ${ ({ animationDuration }) => animationDuration };
    animation-direction: ${ ({ animationDirection }) => animationDirection };
    animation-play-state: ${ ({ animationPlayState }) => animationPlayState };
    animation-timing-function: ease-out;
`;

const usePrev = value => {
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    });
    return ref.current;
};

const Animated = (props) => {

    const { delayMs = 300, exist = true, children } = props;
    const prevExist = usePrev(exist);
    
    const [ visible, setVisible ] = useState();

    const [ entering, setEntering ] = useState();
    const [ leaving, setLeaving ] = useState();

    useEffect(() => {
        if (prevExist !== exist) {
            if (exist) {
                setVisible(true);
                setEntering(true);
                setTimeout(() => {
                    setEntering(false);
                }, delayMs);
            }
            else {
                setLeaving(true);
                setTimeout(() => {
                    setLeaving(false);
                    setVisible(false);
                }, delayMs);

                setVisible(false);
                setTimeout(() => { setVisible(true) }, 0);

            }
        }

    }, [ exist ]);

    if (!visible) return null;

    return (
        <Container
            animationDuration={ `${ delayMs }ms` }
            animationPlayState={ entering || leaving ? 'running' : 'paused' }
            animationDirection={ !leaving ? 'normal' : 'reverse' }
        >
            { visible && children }
        </Container>
    );
}

export default Animated;