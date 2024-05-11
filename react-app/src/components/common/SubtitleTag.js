import React from 'react';
import styled from 'styled-components';
import theme from '../../theme/theme'

const Conatiner = styled.div`
    background-color: ${ ({ backgroundColor }) => backgroundColor };
    color: ${ ({ color }) => color };
    padding: 5px;
`;

Conatiner.defaultProps = {
    backgroundColor: theme.colors.brown1,
    color: 'white',
};

const SubtitleTag = ({ label, ...otherProps }) => {
    return (
        <Conatiner { ...otherProps }>{ label }</Conatiner>
    );
}

export default SubtitleTag;