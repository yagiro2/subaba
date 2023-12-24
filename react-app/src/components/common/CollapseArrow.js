import styled from 'styled-components'

const w = 20
const clipPath = `polygon(${w}% 0, ${w+60}% 50%, ${w}% 100%, 0% 100%, 50% 50%, 0 0)`;

const CollapseArrow = styled.div`
    clip-path: ${ clipPath };
    background: black;
    border-radius: 10px;
    ${ ({ size }) => `width: ${ size }; height: ${ size };` }
    ${ ({ expanded }) => expanded && 'transform: rotate(90deg);' }
`

// A.defaultProps = {
//     size: '3rem'
// }

// const CollapseArrow = ({ expanded, size })  => {
//     return (
//         // <Container expanded={ expanded } size={ size }>
//         //     { '>' }
//         // </Container>
//         <A/>
//     );
// }

CollapseArrow.defaultProps = {
    size: '1rem',
}

export default CollapseArrow