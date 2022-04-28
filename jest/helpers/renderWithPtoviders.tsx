import {AuthProvider} from '@/presentation/context/api/auth-context';
import {NavigationContainer} from '@react-navigation/native';
import * as Testing from '@testing-library/react-native';
import React from 'react';

type params = {
  component: JSX.Element;
  setCurrentAccount: any;
};

export const renderWithAuthProvider = ({
  component,
  setCurrentAccount,
}: params) => {
  return Testing.render(
    <AuthProvider setCurrentAccount={setCurrentAccount}>
      <NavigationContainer>{component}</NavigationContainer>
    </AuthProvider>,
  );
};
