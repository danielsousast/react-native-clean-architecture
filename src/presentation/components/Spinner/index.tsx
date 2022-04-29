import React from 'react';
import {ActivityIndicator} from 'react-native';
import {Container} from './styles';

type SpinnerProps = {
  visible: boolean;
};

export const Spinner: React.FC<SpinnerProps> = ({visible = false}) => {
  return visible ? (
    <Container testID="spinner">
      <ActivityIndicator size="large" />
    </Container>
  ) : (
    <></>
  );
};
