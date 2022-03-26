import {Login} from '@/presentation/screens/Login';
import React from 'react';
import styled from 'styled-components/native';

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const App: React.FC = () => {
  return (
    <Container>
      <Login />
    </Container>
  );
};

export default App;
