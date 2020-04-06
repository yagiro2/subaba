import React from 'react';
import styled from 'styled-components';
import { Provider } from 'react-redux';
import Skeleton from './components/skeleton/Skeleton';
import configureStore from './configureStore';

const store = configureStore();

const Container = styled.div`
  display: flex;
  width: 100vw;
  padding: 3vw;
`;

function App() {
  return (
    <Provider store={ store }>
      <Container>
          <Skeleton/>
      </Container>
    </Provider>
  );
}

export default App;
