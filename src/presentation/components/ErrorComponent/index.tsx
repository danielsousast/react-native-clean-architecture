import React from 'react';
import {LinkButton} from '../LinkButton';
import {ErrorWrap, ErrorTitle} from './styles';

type Props = {
  message?: string;
  onPress: () => void;
};

const ErrorComponent: React.FC<Props> = ({onPress, message}) => {
  return (
    <ErrorWrap testID="error-wrapper">
      <ErrorTitle testID="error-title">{message}</ErrorTitle>
      <LinkButton onPress={onPress} testID="button-reload">
        Tentar novamente
      </LinkButton>
    </ErrorWrap>
  );
};

export default ErrorComponent;
