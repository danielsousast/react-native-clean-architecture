import React from 'react';
import {Container, Message} from './styles';

interface ErrorMessageProps {
  error?: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({error}) => {
  function renderError() {
    if (error) {
      return <Message testID="error-message">{error}</Message>;
    }
  }
  return <Container testID="error-wrapper">{renderError()}</Container>;
};
