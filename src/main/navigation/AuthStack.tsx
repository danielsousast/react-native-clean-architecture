import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {MakeLoginScreen} from '../factories/screens/login/login-factory';
import {MakeRegisterScreen} from '../factories/screens/register/register-factory';

const {Navigator, Screen} = createNativeStackNavigator();

export const AuthStack: React.FC = () => {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Screen name="Login" component={MakeLoginScreen} />
      <Screen name="Register" component={MakeRegisterScreen} />
    </Navigator>
  );
};
