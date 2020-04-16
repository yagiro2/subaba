import React from 'react';
import styled from 'styled-components';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import logo from '../../assets/mia-vincent.png';

import '../../style/spin.css';
import '../../style/vape.css';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    > :not(:first-child) {
        margin-top: 20px;
    }
`;

const Logo = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 3rem;
`;

const Label = styled.div`
`;

const Loader = ({ label, withVapeAnimation }) => {
    return (
        <Container className={ classnames({ vape: withVapeAnimation }) } height="100px">
            <Logo className="spin">
                <img src={ logo } alt="loading" width="100px"/>
            </Logo>
            { label && <Label>{ label }</Label> }
        </Container>
    );
}

Loader.propTypes = {
    withVapeAnimation: PropTypes.bool,
};

export default Loader;