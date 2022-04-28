import React from 'react';
import * as Testing from '@testing-library/react-native';
import {LoadSurveyList} from '@/domain/usecases';
import {SurveyModel} from '@/domain/models';
import {mockSurveyList} from '@/domain/test';
import SurveyList from '.';
import {UnexpectedError} from '@/domain/errors';

class LoadSurveyListSpy implements LoadSurveyList {
  callsCount: number = 0;
  surveys: SurveyModel[] = mockSurveyList();
  async execute(): Promise<SurveyModel[] | undefined> {
    this.callsCount++;
    return this.surveys;
  }
}

type SutTypes = {
  sut: Testing.RenderAPI;
  loadSurveyListSpy: LoadSurveyListSpy;
};

const makeSut = (loadSurveyListSpy = new LoadSurveyListSpy()): SutTypes => {
  const sut = Testing.render(<SurveyList loadSurveyList={loadSurveyListSpy} />);
  return {
    sut,
    loadSurveyListSpy,
  };
};

describe('SurveyListScreen', () => {
  test('should call LoadSurveyList', async () => {
    const {sut, loadSurveyListSpy} = makeSut();
    const surveyListContainer = sut.getByTestId('survey-list-container');
    await Testing.waitFor(() => surveyListContainer);
    expect(loadSurveyListSpy.callsCount).toBe(1);
  });

  test('should render List on success', async () => {
    const {sut} = makeSut();
    const surveyListContent = sut.getByTestId('survey-list-content');
    await Testing.waitFor(() => surveyListContent);
    expect(surveyListContent.children).toHaveLength(3);
  });

  /*   test('should render errorMessage on fails', async () => {
    const loadSurveyListSpy = new LoadSurveyListSpy();
    const {sut} = makeSut(loadSurveyListSpy);
    const error = new UnexpectedError();
    jest.spyOn(loadSurveyListSpy, 'execute').mockRejectedValueOnce(error);
    const surveyListContent = sut.getByTestId('survey-list-content');
    await Testing.waitFor(() => surveyListContent);
    const errorTitle = sut.queryByTestId('error-title');
    console.log(errorTitle);
    expect(errorTitle?.children[0]).toBe(error.message);
  }); */
});
