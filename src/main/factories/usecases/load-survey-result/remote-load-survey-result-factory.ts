import {RemoteLoadSurveyResult} from '@/data/usecases';
import {makeAuthorizeHttpClientDecorator} from '@/main/factories/decorators';

export const makeRemoteLoadSurveyResult = (
  id: string,
): RemoteLoadSurveyResult => {
  const url = `http://fordevs.herokuapp.com/api/surveys/${id}/results`;
  return new RemoteLoadSurveyResult(url, makeAuthorizeHttpClientDecorator());
};
