import React from 'react';
import {Container, Text} from './styles';

interface ButtonProps {
  title: string;
  marginTop?: number;
  testID?: string;
  disabled?: boolean;
  onPress: () => void;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  marginTop,
  disabled,
  testID,
  onPress,
}) => {
  return (
    <Container
      style={{marginTop}}
      testID={testID}
      disabled={disabled}
      onPress={onPress}>
      <Text>{title}</Text>
    </Container>
  );
};
