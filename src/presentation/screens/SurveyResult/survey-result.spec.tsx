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
  test('should present inital state', async () => {
    const {sut} = makeSut();
    await waitForComponent(sut, 'survey-result-container');
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

  test('should present SurveyResult data on success', async () => {
    const {sut, laodSurveyResultSpy} = makeSut();
    await waitForComponent(sut, 'survey-result-container');
    expect(sut.getByTestId('question').children[0]).toBe(
      laodSurveyResultSpy.surveyResult.question,
    );
    expect(sut.getByTestId('answer-0').children[0]).toBe(
      laodSurveyResultSpy.surveyResult.answers[0].answer,
    );
    expect(sut.getByTestId('percent-0').children[0]).toBe(
      laodSurveyResultSpy.surveyResult.answers[0].percent,
    );
    expect(sut.getByTestId('answer-1').children[0]).toBe(
      laodSurveyResultSpy.surveyResult.answers[1].answer,
    );
    expect(sut.getByTestId('percent-1').children[0]).toBe(
      laodSurveyResultSpy.surveyResult.answers[1].percent,
    );
  });
});
