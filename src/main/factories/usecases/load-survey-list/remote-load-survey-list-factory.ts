import {RemoteLoadSurveyList} from '@/data/usecases';
import {makeAxiosHttpClient} from '@/main/factories/http';

export const makeRemoteLoadSurveyList = (): RemoteLoadSurveyList => {
  const url = 'http://fordevs.herokuapp.com/api/surveys';
  const axiosHttpClient = makeAxiosHttpClient();
  return new RemoteLoadSurveyList(url, axiosHttpClient);
};
