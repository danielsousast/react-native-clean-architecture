import {RemoteLoadSurveyList} from '@/data/usecases';
import {makeAuthorizeHttpGetClientDecorator} from '@/main/factories/decorators';

export const makeRemoteLoadSurveyList = (): RemoteLoadSurveyList => {
  const url = 'http://fordevs.herokuapp.com/api/surveys';
  return new RemoteLoadSurveyList(url, makeAuthorizeHttpGetClientDecorator());
};
