import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {AuthStack} from './AuthStack';
import {AppStack} from './AppStack';

type NavigatorProps = {
  makeLogin: React.FC;
  makeRegister: React.FC;
};

export const Navigator: React.FC<NavigatorProps> = ({
  makeLogin,
  makeRegister,
}) => {
  const isLogged = true;
  return (
    <NavigationContainer>
      {isLogged ? (
        <AppStack />
      ) : (
        <AuthStack makeLogin={makeLogin} makeRegister={makeRegister} />
      )}
    </NavigationContainer>
  );
};
