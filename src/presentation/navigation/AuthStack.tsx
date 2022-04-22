import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const {Navigator, Screen} = createNativeStackNavigator();

type AuthStackProps = {
  makeLogin: React.FC;
  makeRegister: React.FC;
};

export const AuthStack: React.FC<AuthStackProps> = ({
  makeLogin,
  makeRegister,
}) => {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Screen name="Login" component={makeLogin} />
      <Screen name="Register" component={makeRegister} />
    </Navigator>
  );
};
