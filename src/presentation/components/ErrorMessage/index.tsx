import React from 'react';
import {Container, Message} from './styles';

interface ErrorMessageProps {
  error: string;
  testId?: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({error, testId}) => {
  function renderError() {
    if (error) {
      return <Message testID={testId}>{error}</Message>;
    }
  }
  return <Container>{renderError()}</Container>;
};
