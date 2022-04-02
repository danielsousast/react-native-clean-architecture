import React, {useState} from 'react';
import {Button} from '@/presentation/components/Button';
import {Input} from '@/presentation/components/Input';
import {Container} from './styles';
import {ErrorMessage} from '@/presentation/components/ErrorMessage';
import Spinner from '@/presentation/components/Spinner';
import LinkButton from '@/presentation/components/LinkButton';
import {Validation} from '@/presentation/protocols/validation';

type LoginProps = {
  validation: Validation;
};

export const Login: React.FC<LoginProps> = ({validation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading] = React.useState(false);
  const [error, setError] = React.useState<string | undefined>('');

  function renderSpinner() {
    return loading && <Spinner />;
  }

  React.useEffect(() => {
    if (email) {
      setError(validation.validate('email', email));
    }
  }, [email, validation]);

  React.useEffect(() => {
    if (password) {
      setError(validation.validate('password', password));
    }
  }, [password, validation]);

  return (
    <Container>
      {renderSpinner()}
      <Input
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        marginBottom={16}
        testID="email-input"
      />
      <Input
        value={password}
        onChangeText={setPassword}
        placeholder="Senha"
        testID="password-input"
      />
      <Button testID="submit" marginTop={16} disabled={!password || !email} />
      <LinkButton>Criar conta</LinkButton>
      <ErrorMessage error={error} testID="error-message" />
    </Container>
  );
};
