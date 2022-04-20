import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const {Navigator, Screen} = createNativeStackNavigator();

type AuthStackProps = {
  makeLogin: React.FC;
};

export const AuthStack: React.FC<AuthStackProps> = ({makeLogin}) => {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Screen name="Login" component={makeLogin} />
    </Navigator>
  );
};
