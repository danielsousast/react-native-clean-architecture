import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Login} from '@/presentation/screens/Login';

const {Navigator, Screen} = createNativeStackNavigator();

export const AuthStack = () => {
  return (
    <Navigator>
      <Screen name="Login" component={Login} />
    </Navigator>
  );
};
