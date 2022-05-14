import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {AuthStack} from './AuthStack';
import {AppStack} from './AppStack';
import {useAuth} from '@/presentation/context/auth-context';

export const Navigator: React.FC = () => {
  const {account} = useAuth();

  return (
    <NavigationContainer>
      {account?.accessToken ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};
