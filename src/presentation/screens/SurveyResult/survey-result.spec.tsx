import React from 'react';

import {renderWithAuthProvider} from '@/../jest/helpers';
import SurveyResult from '.';
import {RenderAPI} from '@testing-library/react-native';
import {LoadSurveyResultSpy} from '@/presentation/test/mock-load-survey-result';
import {waitForComponent} from '@/presentation/test/form-helper';

type SutTypes = {
  sut: RenderAPI;
  laodSurveyResultSpy: LoadSurveyResultSpy;
};

const makeSut = (): SutTypes => {
  const laodSurveyResultSpy = new LoadSurveyResultSpy();
  const sut = renderWithAuthProvider({
    component: <SurveyResult loadSurveyResult={laodSurveyResultSpy} />,
    setCurrentAccount: jest.fn(),
  });

  return {sut, laodSurveyResultSpy};
};

describe('SurveyResult Screen', () => {
  test('should present inital state', () => {
    const {sut} = makeSut();
    const error = sut.queryByTestId('error-wrapper');
    const spinner = sut.queryByTestId('spinner');
    expect(error).toBeFalsy();
    expect(spinner).toBeFalsy();
  });

  test('should call LoadSurveyResult', async () => {
    const {sut, laodSurveyResultSpy} = makeSut();
    await waitForComponent(sut, 'survey-result-container');
    expect(laodSurveyResultSpy.callsCount).toBe(1);
  });
});
