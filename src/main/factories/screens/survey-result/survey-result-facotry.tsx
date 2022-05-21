import React from 'react';
import SurveyResult from '@/presentation/screens/SurveyResult';
import {makeRemoteLoadSurveyResult} from '../../usecases';
import {useRoute} from '@react-navigation/native';

interface RouteParams {
  surveyId: string;
}

export const SurveyResultScreenFactory: React.FC = () => {
  const route = useRoute();
  const routeParams = route.params as RouteParams;
  return (
    <SurveyResult
      loadSurveyResult={makeRemoteLoadSurveyResult(routeParams?.surveyId)}
    />
  );
};
