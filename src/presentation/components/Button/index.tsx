import React from 'react';
import {Container, Text} from './styles';

interface ButtonProps {
  marginTop?: number;
  testID?: string;
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  marginTop,
  disabled,
  testID,
}) => {
  return (
    <Container style={{marginTop}} testID={testID} disabled={disabled}>
      <Text>Entrar</Text>
    </Container>
  );
};
