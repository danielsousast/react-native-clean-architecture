import React from 'react';
import {AuthProvider} from './auth-context';
import {
  setCurrentAccountAdapter,
  getCurrentAccountAdapter,
} from '@/main/adapters';

const AppProvider: React.FC = ({children}) => (
  <AuthProvider
    setCurrentAccount={setCurrentAccountAdapter}
    getCurrentAccount={getCurrentAccountAdapter}>
    {children}
  </AuthProvider>
);

export default AppProvider;
