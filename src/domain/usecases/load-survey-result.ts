import {SurveyResultModel} from '@/domain/models';

export interface LoadSurveyResult {
  execute: () => Promise<SurveyResultModel | undefined>;
}
