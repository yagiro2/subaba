import React from 'react';
import styled from 'styled-components';
import { Provider } from 'react-redux';
import Skeleton from './components/skeleton/Skeleton';
import configureStore from './configureStore';
import Blanko from './components/blanko/Blanko';

const store = configureStore();

const Container = styled.div`
  display: flex;
  width: 100vw;
  max-width: 100vw;
  padding: 3vmin;
`;

function App() {
  return (
    <Provider store={ store }>
      <Container>
          <Blanko/>
      </Container>
    </Provider>
  );
}

export default App;
