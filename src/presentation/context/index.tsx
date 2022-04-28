import React from 'react';
import {AuthProvider} from './api/auth-context';
import {setCurrentAccountAdapter} from '@/main/adapters';

const AppProvider: React.FC = ({children}) => (
  <AuthProvider setCurrentAccount={setCurrentAccountAdapter}>
    {children}
  </AuthProvider>
);

export default AppProvider;
