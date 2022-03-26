import React from 'react';
import {Text} from 'react-native';
import {Container} from './styles';

interface ButtonProps {
  marginTop?: number;
}

export const Button: React.FC<ButtonProps> = ({marginTop}) => {
  return (
    <Container style={{marginTop}}>
      <Text>Entrar</Text>
    </Container>
  );
};
