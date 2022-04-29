import {RemoteLoadSurveyList} from '@/data/usecases/load-survey-list/remote-load-survey-list';
import {makeAxiosHttpClient} from '@/main/factories/http/axios-http-client-factory';

export const makeRemoteLoadSurveyList = (): RemoteLoadSurveyList => {
  const url = 'http://fordevs.herokuapp.com/api/surveys';
  const axiosHttpClient = makeAxiosHttpClient();
  return new RemoteLoadSurveyList(url, axiosHttpClient);
};
