import React from 'react';
import SurveyResult from '@/presentation/screens/SurveyResult';
import {makeRemoteLoadSurveyResult} from '../../usecases';

export const SurveyResultScreenFactory: React.FC = () => {
  return <SurveyResult loadSurveyResult={makeRemoteLoadSurveyResult()} />;
};
