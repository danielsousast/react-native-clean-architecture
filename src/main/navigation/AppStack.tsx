import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {MakeSurveyListScreen} from '@/main/factories/screens';

const {Navigator, Screen} = createNativeStackNavigator();

type AppStackProps = {};

export const AppStack: React.FC<AppStackProps> = () => {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Screen name="SurveyList" component={MakeSurveyListScreen} />
    </Navigator>
  );
};
