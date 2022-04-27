import React from 'react';
import {Login} from '@/presentation/screens/Login';
import {makeLoginValidation} from './login-validation-factory';
import {
  makeRemoteAuthentication,
  makeLocalSaveCurrentAccount,
} from '@/main/factories/usecases';

export const MakeLoginScreen: React.FC = () => {
  return (
    <Login
      authentication={makeRemoteAuthentication()}
      validation={makeLoginValidation()}
      saveCurrentAccount={makeLocalSaveCurrentAccount()}
    />
  );
};
