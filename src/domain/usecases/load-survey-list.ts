import {SurveyModel} from '@/domain/models';

export interface LoadSurveyList {
  execute: () => Promise<SurveyModel[] | undefined>;
}
