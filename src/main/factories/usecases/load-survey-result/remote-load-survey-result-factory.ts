import {RemoteLoadSurveyResult} from '@/data/usecases';
import {makeAuthorizeHttpGetClientDecorator} from '@/main/factories/decorators';

export const makeRemoteLoadSurveyResult = (): RemoteLoadSurveyResult => {
  const url = 'http://fordevs.herokuapp.com/api/surveys';
  return new RemoteLoadSurveyResult(url, makeAuthorizeHttpGetClientDecorator());
};
