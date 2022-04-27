import React from 'react';
import {makeLocalSaveCurrentAccount} from '@/main/factories/usecases';
import {makeRegisterValidation} from './register-validation-factory';
import {Register} from '@/presentation/screens/Register';
import {makeRemoteRegistration} from '../../usecases/registration/remote-registration-factory';

export const MakeRegisterScreen: React.FC = () => {
  return (
    <Register
      registration={makeRemoteRegistration()}
      validation={makeRegisterValidation()}
      saveCurrentAccount={makeLocalSaveCurrentAccount()}
    />
  );
};
