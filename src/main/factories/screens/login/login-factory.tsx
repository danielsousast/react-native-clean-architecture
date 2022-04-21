import React from 'react';
import {Login} from '@/presentation/screens/Login';
import {makeLoginValidation} from './login-validation-factory';
import {
  makeRemoteAuthentication,
  makeLocalSaveAccessToken,
} from '@/main/factories/usecases';

export const MakeLoginScreen: React.FC = () => {
  return (
    <Login
      authentication={makeRemoteAuthentication()}
      validation={makeLoginValidation()}
      saveAccessToken={makeLocalSaveAccessToken()}
    />
  );
};
