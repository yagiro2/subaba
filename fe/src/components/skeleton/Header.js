import React from 'react';
import styled from 'styled-components';

const Title = styled.div`
    font-size: 3rem;
    line-height: 3rem;
`;

const Quote = styled.div`
    margin-top: 2px;
`;

const Header = () => {
    return (
        <div>
            <Title>subaba.</Title>
            <Quote>That rug really tied the room together.</Quote>
        </div>
    );
}

export default Header;