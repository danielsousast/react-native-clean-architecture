import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Register} from '../screens/Register';

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
      <Screen name="Register" component={Register} />
    </Navigator>
  );
};
