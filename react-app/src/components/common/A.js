import React from 'react';

const A = ({ children, ...otherProps }) => {
    return (
        <a { ...otherProps }>{ children }</a>
    );
}

export default A;