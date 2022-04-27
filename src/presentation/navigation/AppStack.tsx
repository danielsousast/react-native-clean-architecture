import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SurveyList from '../screens/SurveyList';

const {Navigator, Screen} = createNativeStackNavigator();

type AppStackProps = {};

export const AppStack: React.FC<AppStackProps> = () => {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Screen name="SurveyList" component={SurveyList} />
    </Navigator>
  );
};
