import React from 'react';
import * as Testing from '@testing-library/react-native';
import * as Helper from '@/presentation/test/form-helper';
import SurveyList from '.';
import {LoadSurveyListSpy} from '@/presentation/test/mock-load-survey-list';
//import {UnexpectedError} from '@/domain/errors';

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
    await Helper.waitForComponent(sut, 'survey-list-container');
    const surveyItem = sut.getByTestId('survey-item-2');
    expect(surveyItem).toBeTruthy();
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
