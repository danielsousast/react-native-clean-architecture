import {SurveyResultModel} from '@/domain/models';
import {mockSurveyResult} from '@/domain/test';
import {
  LoadSurveyResult,
  SaveSurveyResult,
  SaveSurveyResultParams,
} from '@/domain/usecases';

export class LoadSurveyResultSpy implements LoadSurveyResult {
  callsCount: number = 0;
  surveyResult: SurveyResultModel = mockSurveyResult();
  async execute(): Promise<SurveyResultModel | undefined> {
    this.callsCount++;
    return this.surveyResult;
  }
}

export class SaveSurveyResultSpy implements SaveSurveyResult {
  params: SaveSurveyResultParams | undefined;
  surveyResult: SurveyResultModel = mockSurveyResult();
  async execute(
    params: SaveSurveyResultParams,
  ): Promise<SurveyResultModel | undefined> {
    this.params = params;
    return this.surveyResult;
  }
}
