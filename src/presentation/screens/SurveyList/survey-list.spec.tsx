import React from 'react';
import * as Testing from '@testing-library/react-native';
import * as Helper from '@/presentation/test/form-helper';
import SurveyList from '.';
import {LoadSurveyListSpy} from '@/presentation/test/mock-load-survey-list';
import {renderWithAuthProvider} from '@/../jest/helpers';
import {AccountModel} from '@/domain/models';

type SutTypes = {
  sut: Testing.RenderAPI;
  loadSurveyListSpy: LoadSurveyListSpy;
  setCurrentAccountMock: (account: AccountModel) => void;
};

const makeSut = (loadSurveyListSpy = new LoadSurveyListSpy()): SutTypes => {
  const setCurrentAccountMock = jest.fn();
  const sut = renderWithAuthProvider({
    component: <SurveyList loadSurveyList={loadSurveyListSpy} />,
    setCurrentAccount: setCurrentAccountMock,
  });
  return {
    sut,
    loadSurveyListSpy,
    setCurrentAccountMock,
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

  /*  test('should logout on AccessDeniedError', async () => {
    const {sut, loadSurveyListSpy, setCurrentAccountMock} = makeSut();
    jest
      .spyOn(loadSurveyListSpy, 'execute')
      .mockRejectedValueOnce(new AccessDeniedError());
    await Helper.waitForComponent(sut, 'survey-list-container');
    expect(setCurrentAccountMock).toHaveBeenCalledWith(undefined);
  });
   test('should render errorMessage on fails', async () => {
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
