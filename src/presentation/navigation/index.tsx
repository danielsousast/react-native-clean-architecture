import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {AuthStack} from './AuthStack';

type NavigatorProps = {
  makeLogin: React.FC;
  makeRegister: React.FC;
};

export const Navigator: React.FC<NavigatorProps> = ({
  makeLogin,
  makeRegister,
}) => {
  return (
    <NavigationContainer>
      <AuthStack makeLogin={makeLogin} makeRegister={makeRegister} />
    </NavigationContainer>
  );
};
