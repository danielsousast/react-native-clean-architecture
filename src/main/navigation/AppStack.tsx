import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  SurveyListScreenFactory,
  SurveyResultScreenFactory,
} from '@/main/factories/screens';

const {Navigator, Screen} = createNativeStackNavigator();

type AppStackProps = {
  SurveyResult: {};
  SurveyList: {};
};

export const AppStack: React.FC<AppStackProps> = () => {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Screen name="SurveyList" component={SurveyListScreenFactory} />
      <Screen name="SurveyResult" component={SurveyResultScreenFactory} />
    </Navigator>
  );
};
