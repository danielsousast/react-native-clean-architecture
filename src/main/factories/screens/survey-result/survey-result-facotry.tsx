import React from 'react';
import SurveyResult from '@/presentation/screens/SurveyResult';
import {
  makeRemoteLoadSurveyResult,
  makeRemoteSaveSurveyResult,
} from '../../usecases';
import {useRoute} from '@react-navigation/native';

interface RouteParams {
  surveyId: string;
}

export const SurveyResultScreenFactory: React.FC = () => {
  const route = useRoute();
  const routeParams = route.params as RouteParams;
  return (
    <SurveyResult
      saveSurveyResult={makeRemoteSaveSurveyResult(routeParams?.surveyId)}
      loadSurveyResult={makeRemoteLoadSurveyResult(routeParams?.surveyId)}
    />
  );
};
