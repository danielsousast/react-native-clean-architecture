import React from 'react';
import {Container, Message} from './styles';

interface ErrorMessageProps {
  error?: string;
  testID?: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({error, testID}) => {
  function renderError() {
    if (error) {
      return <Message testID={testID}>{error}</Message>;
    }
  }
  return <Container>{renderError()}</Container>;
};
