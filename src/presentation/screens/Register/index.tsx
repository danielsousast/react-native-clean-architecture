import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Button} from '@/presentation/components/Button';
import {Input} from '@/presentation/components/Input';
import {ErrorMessage} from '@/presentation/components/ErrorMessage';
import Spinner from '@/presentation/components/Spinner';
import LinkButton from '@/presentation/components/LinkButton';
import {Validation} from '@/presentation/protocols/validation';
import {Container} from './styles';
import {Registration} from '@/domain/usecases/registration';

type RegisterProps = {
  validation: Validation;
  registration: Registration;
};

export const Register: React.FC<RegisterProps> = ({
  validation,
  registration,
}) => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | undefined>();

  React.useEffect(() => {
    if (name) {
      setError(validation?.validate('name', name));
    }
  }, [name, validation]);

  React.useEffect(() => {
    if (email) {
      setError(validation?.validate('email', email));
    }
  }, [email, validation]);

  React.useEffect(() => {
    if (password) {
      setError(validation?.validate('password', password));
    }
  }, [password, validation]);

  React.useEffect(() => {
    if (passwordConfirmation) {
      setError(
        validation?.validate('password-confirmation', passwordConfirmation),
      );
    }
  }, [passwordConfirmation, validation]);

  async function onSubmit() {
    try {
      setLoading(true);
      await registration.register({
        name,
        email,
        password,
        passwordConfirmation,
      });
    } catch (e) {
      setError((e as Error).message);
      setLoading(false);
    }
  }

  function onLinkPress() {
    navigation.navigate('Register' as any);
  }

  return (
    <Container testID="login-container">
      <Spinner visible={loading} />
      <Input
        value={name}
        onChangeText={setName}
        placeholder="Nome"
        marginBottom={16}
        testID="name-input"
      />
      <Input
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        marginBottom={16}
        testID="email-input"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />
      <Input
        value={password}
        onChangeText={setPassword}
        placeholder="Senha"
        testID="password-input"
        marginBottom={16}
      />
      <Input
        value={passwordConfirmation}
        onChangeText={setPasswordConfirmation}
        placeholder="Confirmar senha"
        testID="confirm-password-input"
      />
      <Button
        testID="submit"
        marginTop={16}
        disabled={!password || !email || !name || !passwordConfirmation}
        onPress={onSubmit}
      />
      <LinkButton testID="register-button" onPress={onLinkPress}>
        Fazer login
      </LinkButton>
      <ErrorMessage error={error} />
    </Container>
  );
};
