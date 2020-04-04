import React from 'react';
import styled from 'styled-components';
import Skeleton from './components/skeleton/Skeleton';

const Container = styled.div`
  display: flex;
  width: 100vw;
  padding: 3vw;
`;

function App() {
  return (
    <Container>
        <Skeleton/>
    </Container>
  );
}

export default App;
