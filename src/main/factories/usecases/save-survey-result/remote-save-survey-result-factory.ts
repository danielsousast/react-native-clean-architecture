import {RemoteSaveSurveyResult} from '@/data/usecases';
import {makeAuthorizeHttpClientDecorator} from '@/main/factories/decorators';

export const makeRemoteSaveSurveyResult = (
  id: string,
): RemoteSaveSurveyResult => {
  const url = `http://fordevs.herokuapp.com/api/surveys/${id}/results`;
  return new RemoteSaveSurveyResult(url, makeAuthorizeHttpClientDecorator());
};
