import {AccountModel} from '@/domain/models';
import React, {createContext, useContext} from 'react';

interface ContextData {
  setCurrentAccount: (account: AccountModel) => void;
  getCurrentAccount: () => AccountModel;
}

export const AuthContext = createContext<ContextData>({} as ContextData);

type AuthProviderProps = {
  setCurrentAccount: (account: AccountModel) => void;
  getCurrentAccount: () => AccountModel;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({
  setCurrentAccount,
  getCurrentAccount,
  children,
}) => {
  return (
    <AuthContext.Provider value={{setCurrentAccount, getCurrentAccount}}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): ContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('userAuth must be used within a AuthProvider');
  }

  return context;
}
