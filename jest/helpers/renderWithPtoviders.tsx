import {AuthProvider} from '@/presentation/context/auth-context';
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
    <AuthProvider
      setCurrentAccount={setCurrentAccount}
      getCurrentAccount={jest.fn()}>
      <NavigationContainer>{component}</NavigationContainer>
    </AuthProvider>,
  );
};
