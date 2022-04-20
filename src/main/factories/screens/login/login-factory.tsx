import React from 'react';
import {Login} from '@/presentation/screens/Login';
import {makeRemoteAuthentication} from '../../usecases/authentication/remote-authentication-factory';
import {makeLoginValidation} from './login-validation-factory';

export const MakeLoginScreen: React.FC = () => {
  const remoteAuthentication = makeRemoteAuthentication();
  const validation = makeLoginValidation();

  return (
    <Login authentication={remoteAuthentication} validation={validation} />
  );
};
