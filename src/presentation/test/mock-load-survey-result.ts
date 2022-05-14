import {SurveyResultModel} from '@/domain/models';
import {mockSurveyResult} from '@/domain/test';
import {LoadSurveyResult} from '@/domain/usecases';

export class LoadSurveyResultSpy implements LoadSurveyResult {
  callsCount: number = 0;
  surveyResult: SurveyResultModel = mockSurveyResult();
  async execute(): Promise<SurveyResultModel | undefined> {
    this.callsCount++;
    return this.surveyResult;
  }
}
