import {SurveyResultModel} from '@/domain/models';

export type SaveSurveyResultParams = {
  answer: string;
};

export interface SaveSurveyResult {
  execute: (
    params: SaveSurveyResultParams,
  ) => Promise<SurveyResultModel | undefined>;
}
