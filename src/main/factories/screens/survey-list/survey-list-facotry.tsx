import React from 'react';
import SurveyListScreen from '@/presentation/screens/SurveyList';
import {makeRemoteLoadSurveyList} from '../../usecases';

export const MakeSurveyListScreen: React.FC = () => {
  return <SurveyListScreen loadSurveyList={makeRemoteLoadSurveyList()} />;
};
