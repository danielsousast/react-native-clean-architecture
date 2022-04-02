import React, {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {Button} from '@/presentation/components/Button';
import {Input} from '@/presentation/components/Input';
import {ErrorMessage} from '@/presentation/components/ErrorMessage';
import Spinner from '@/presentation/components/Spinner';
import LinkButton from '@/presentation/components/LinkButton';
import {Validation} from '@/presentation/protocols/validation';
import {Authentication} from '@/domain/usecases/authentication';

import {Container} from './styles';

type LoginProps = {
  validation: Validation;
  authentication: Authentication;
};

export const Login: React.FC<LoginProps> = ({validation, authentication}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | undefined>();

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

  async function onSubmit() {
    if (loading) return;

    try {
      setLoading(true);
      const account = await authentication.auth({email, password});
      await AsyncStorage.setItem('accessToken', account?.accessToken as string);
    } catch (e) {
      setError((e as Error).message);
      setLoading(false);
    }
  }

  function onRegisterPress() {}

  return (
    <Container testID="login-container">
      <Spinner visible={loading} />
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
      <Button
        testID="submit"
        marginTop={16}
        disabled={!password || !email}
        onPress={onSubmit}
      />
      <LinkButton testID="register-button" onPress={onRegisterPress}>
        Criar conta
      </LinkButton>
      <ErrorMessage error={error} />
    </Container>
  );
};
