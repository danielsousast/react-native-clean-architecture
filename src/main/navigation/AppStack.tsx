import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {MakeSurveyListScreen} from '@/main/factories/screens';
import SurveyResult from '@/presentation/screens/SurveyResult';

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
      <Screen name="SurveyList" component={MakeSurveyListScreen} />
      <Screen name="SurveyResult" component={SurveyResult} />
    </Navigator>
  );
};
