import React from 'react';
import {TextInputProps} from 'react-native';
import {Container, TextInput} from './styles';

interface InputProps extends Omit<TextInputProps, 'placeholderTextColor'> {
  error?: boolean;
  marginBottom?: number;
}

export const Input: React.FC<InputProps> = ({
  marginBottom,
  error = false,
  ...rest
}) => {
  return (
    <Container style={{marginBottom}} error={error}>
      <TextInput {...rest} />
    </Container>
  );
};
