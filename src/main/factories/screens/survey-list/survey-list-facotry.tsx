import React from 'react';
import SurveyListScreen from '@/presentation/screens/SurveyList';
import {makeRemoteLoadSurveyList} from '@/main/factories/usecases';

export const SurveyListScreenFactory: React.FC = () => {
  return <SurveyListScreen loadSurveyList={makeRemoteLoadSurveyList()} />;
};
