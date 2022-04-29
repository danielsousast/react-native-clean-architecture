import React from 'react';
import {Login} from '@/presentation/screens';
import {makeLoginValidation} from './login-validation-factory';
import {makeRemoteAuthentication} from '@/main/factories/usecases';

export const MakeLoginScreen: React.FC = () => {
  return (
    <Login
      authentication={makeRemoteAuthentication()}
      validation={makeLoginValidation()}
    />
  );
};
