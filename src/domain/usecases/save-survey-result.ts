import {SurveyResultModel} from '@/domain/models';

type SaveResultParams = {
  answer: string;
};

export interface SaveSurveyResult {
  execute: (params: SaveResultParams) => Promise<SurveyResultModel | undefined>;
}
