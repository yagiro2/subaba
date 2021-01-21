import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
    ${ ({ expanded }) => expanded && 'transform: rotate(90deg);' }
    ${ ({ size }) => size && `font-size: ${ size };` }
`

const CollapseArrow = ({ expanded, size })  => {
    return (
        <Container expanded={ expanded } size={ size }>
            { '>' }
        </Container>
    );
}

CollapseArrow.defaultProps = {
    size: '1rem',
}

export default CollapseArrow