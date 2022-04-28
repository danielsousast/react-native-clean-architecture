/* eslint-disable curly */
import React, {useCallback, useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Button} from '@/presentation/components/Button';
import {Input} from '@/presentation/components/Input';
import {ErrorMessage} from '@/presentation/components/ErrorMessage';
import Spinner from '@/presentation/components/Spinner';
import LinkButton from '@/presentation/components/LinkButton';
import {Validation} from '@/presentation/protocols/validation';
import {Registration} from '@/domain/usecases/registration';
import {Container} from './styles';
import {useAuth} from '@/presentation/context/api/auth-context';
import {AccountModel} from '@/domain/models';

type RegisterProps = {
  validation: Validation;
  registration: Registration;
};

export const Register: React.FC<RegisterProps> = ({
  validation,
  registration,
}) => {
  const navigation = useNavigation();
  const {setCurrentAccount} = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | undefined>();

  const validate = useCallback(
    (fieldname: string, fieldvalue: string) => {
      const validationError = validation?.validate(fieldname, {
        [fieldname]: fieldvalue,
      });
      if (validationError) setError(validationError);
    },
    [validation],
  );

  useEffect(() => {
    if (name) validate('name', name);
  }, [name, validate, validation]);

  useEffect(() => {
    if (email) validate('email', email);
  }, [email, validate, validation]);

  useEffect(() => {
    if (password) validate('password', password);
  }, [password, validate, validation]);

  useEffect(() => {
    if (passwordConfirmation)
      validate('passwordConfirmation', passwordConfirmation);
  }, [passwordConfirmation, validate, validation]);

  async function onSubmit() {
    if (loading || error) return;
    try {
      setLoading(true);
      const account = await registration.register({
        name,
        email,
        password,
        passwordConfirmation,
      });
      setCurrentAccount(account as AccountModel);
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
