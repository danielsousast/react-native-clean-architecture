import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {AuthStack} from './AuthStack';

type NavigatorProps = {
  makeLogin: React.FC;
};

export const Navigator: React.FC<NavigatorProps> = ({makeLogin}) => {
  return (
    <NavigationContainer>
      <AuthStack makeLogin={makeLogin} />
    </NavigationContainer>
  );
};
