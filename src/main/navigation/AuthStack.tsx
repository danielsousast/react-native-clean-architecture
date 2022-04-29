import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {MakeLoginScreen, MakeRegisterScreen} from '@/main/factories/screens';

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
