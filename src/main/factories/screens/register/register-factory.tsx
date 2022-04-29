import React from 'react';
import {makeRegisterValidation} from './register-validation-factory';
import {Register} from '@/presentation/screens';
import {makeRemoteRegistration} from '@/main/factories/usecases/registration/remote-registration-factory';

export const MakeRegisterScreen: React.FC = () => {
  return (
    <Register
      registration={makeRemoteRegistration()}
      validation={makeRegisterValidation()}
    />
  );
};
