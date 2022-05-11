/* eslint-disable curly */
import {AccountModel} from '@/domain/models';
import React, {createContext, useContext, useEffect, useState} from 'react';

interface ContextData {
  account?: AccountModel;
  setCurrentAccount: (account?: AccountModel) => void;
  getCurrentAccount: () => Promise<AccountModel>;
}

export const AuthContext = createContext<ContextData>({} as ContextData);

type AuthProviderProps = {
  setCurrentAccount: (account?: AccountModel) => void;
  getCurrentAccount: () => Promise<AccountModel>;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({
  setCurrentAccount,
  getCurrentAccount,
  children,
}) => {
  const [account, setAccount] = useState<AccountModel>();

  useEffect(() => {
    async function loadAccount() {
      if (!account?.accessToken) {
        const response = await getCurrentAccount();
        if (response?.accessToken) setAccount(response);
      }
    }
    loadAccount();
  }, [account?.accessToken, getCurrentAccount]);

  return (
    <AuthContext.Provider
      value={{setCurrentAccount, getCurrentAccount, account}}>
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
