import React from 'react';
import {Button} from '@/presentation/components/Button';
import {Input} from '@/presentation/components/Input';
import {Container} from './styles';
import {ErrorMessage} from '@/presentation/components/ErrorMessage';
import Spinner from '@/presentation/components/Spinner';
import LinkButton from '@/presentation/components/LinkButton';

export const Login: React.FC = () => {
  const [loading] = React.useState(false);
  const [error] = React.useState('');

  function renderSpinner() {
    return loading && <Spinner />;
  }

  return (
    <Container>
      {renderSpinner()}
      <Input placeholder="Email" marginBottom={16} />
      <Input placeholder="Senha" />
      <Button marginTop={16} />
      <LinkButton>Criar conta</LinkButton>
      <ErrorMessage error={error} />
    </Container>
  );
};
