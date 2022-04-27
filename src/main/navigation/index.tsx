import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {AuthStack} from './AuthStack';
import {AppStack} from './AppStack';

export const Navigator: React.FC = () => {
  const isLogged = true;
  return (
    <NavigationContainer>
      {isLogged ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};
