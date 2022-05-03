/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable curly */
import React, {useCallback, useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  Spinner,
  LinkButton,
  Input,
  Button,
  ErrorMessage,
} from '@/presentation/components';
import {Validation} from '@/presentation/protocols/validation';
import {Registration} from '@/domain/usecases/registration';
import {useAuth} from '@/presentation/context/auth-context';
import {AccountModel} from '@/domain/models';
import {Container} from './styles';

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
  const [registrationError, setRegistrationError] = React.useState<
    string | undefined
  >();

  const validate = useCallback(
    (fieldname: string, fieldvalue: string) => {
      const validationError = validation?.validate(fieldname, {
        [fieldname]: fieldvalue,
      });
      if (!validationError && error) setError(undefined);
      if (validationError) setError(validationError);
    },
    [validation, error],
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
      const account = await registration.execute({
        name,
        email,
        password,
        passwordConfirmation,
      });
      setCurrentAccount(account as AccountModel);
    } catch (e) {
      setRegistrationError((e as Error).message);
    } finally {
      setLoading(false);
    }
  }

  function onLinkPress() {
    navigation.navigate('Login' as any);
  }

  return (
    <Container testID="register-container">
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
        title="Cadastrar"
        testID="submit"
        marginTop={16}
        disabled={!password || !email || !name || !passwordConfirmation}
        onPress={onSubmit}
      />
      <LinkButton testID="login-button" onPress={onLinkPress}>
        Fazer login
      </LinkButton>
      <ErrorMessage error={registrationError || error} />
    </Container>
  );
};
