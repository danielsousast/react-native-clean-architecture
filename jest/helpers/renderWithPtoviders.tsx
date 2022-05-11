import {AuthProvider} from '@/presentation/context/auth-context';
import {NavigationContainer} from '@react-navigation/native';
import * as Testing from '@testing-library/react-native';
import React from 'react';

type params = {
  component: JSX.Element;
  setCurrentAccount?: any;
  getCurrentAccount?: any;
};

export const renderWithAuthProvider = ({
  component,
  setCurrentAccount,
  getCurrentAccount
}: params) => {
  return Testing.render(
    <AuthProvider
      setCurrentAccount={setCurrentAccount}
      getCurrentAccount={getCurrentAccount}>
      <NavigationContainer>{component}</NavigationContainer>
    </AuthProvider>,
  );
};
