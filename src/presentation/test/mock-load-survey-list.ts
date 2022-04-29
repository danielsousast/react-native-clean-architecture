import {SurveyModel} from '@/domain/models';
import {mockSurveyList} from '@/domain/test';
import {LoadSurveyList} from '@/domain/usecases';

export class LoadSurveyListSpy implements LoadSurveyList {
  callsCount: number = 0;
  surveys: SurveyModel[] = mockSurveyList();
  async execute(): Promise<SurveyModel[] | undefined> {
    this.callsCount++;
    return this.surveys;
  }
}
