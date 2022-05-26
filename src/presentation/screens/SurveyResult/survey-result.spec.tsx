import React from 'react';

import {renderWithAuthProvider} from '@/../jest/helpers';
import SurveyResult from '.';
import {fireEvent, RenderAPI} from '@testing-library/react-native';
import {
  LoadSurveyResultSpy,
  SaveSurveyResultSpy,
} from '@/presentation/test/mock-load-survey-result';
import {waitForComponent} from '@/presentation/test/form-helper';
import {UnexpectedError} from '@/domain/errors';

type SutTypes = {
  sut: RenderAPI;
  laodSurveyResultSpy: LoadSurveyResultSpy;
  saveSurveyResultSpy: SaveSurveyResultSpy;
};

type SutParams = {
  laodSurveyResultSpy?: LoadSurveyResultSpy;
  saveSurveyResultSpy?: SaveSurveyResultSpy;
};

const makeSut = ({
  laodSurveyResultSpy = new LoadSurveyResultSpy(),
  saveSurveyResultSpy = new SaveSurveyResultSpy(),
}: SutParams): SutTypes => {
  const sut = renderWithAuthProvider({
    component: (
      <SurveyResult
        loadSurveyResult={laodSurveyResultSpy}
        saveSurveyResult={saveSurveyResultSpy}
      />
    ),
    setCurrentAccount: jest.fn(),
  });

  return {sut, laodSurveyResultSpy, saveSurveyResultSpy};
};

describe('SurveyResult Screen', () => {
  test('should present inital state', async () => {
    const {sut} = makeSut({});
    await waitForComponent(sut, 'survey-result-container');
    const error = sut.queryByTestId('error-wrapper');
    const spinner = sut.queryByTestId('spinner');
    expect(error).toBeFalsy();
    expect(spinner).toBeFalsy();
  });

  test('should call LoadSurveyResult', async () => {
    const {sut, laodSurveyResultSpy} = makeSut({});
    await waitForComponent(sut, 'survey-result-container');
    expect(laodSurveyResultSpy.callsCount).toBe(1);
  });

  test('should present SurveyResult data on success', async () => {
    const {sut, laodSurveyResultSpy} = makeSut({});
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

  test('should render error on UnexpectedError', async () => {
    const laodSurveyResultSpy = new LoadSurveyResultSpy();
    const error = new UnexpectedError();
    jest.spyOn(laodSurveyResultSpy, 'execute').mockRejectedValueOnce(error);
    const {sut} = makeSut({laodSurveyResultSpy});
    await waitForComponent(sut, 'survey-result-container');
    const errorMessage = sut.getByTestId('error-title');
    expect(errorMessage.children[0]).toBe(error.message);
  });

  test('should call error LoadSurveyResult on reload', async () => {
    const laodSurveyResultSpy = new LoadSurveyResultSpy();
    const error = new UnexpectedError();
    jest.spyOn(laodSurveyResultSpy, 'execute').mockRejectedValueOnce(error);
    const {sut} = makeSut({laodSurveyResultSpy});
    await waitForComponent(sut, 'survey-result-container');
    const buttonReload = sut.getByTestId('button-reload');
    fireEvent.press(buttonReload);
    await waitForComponent(sut, 'survey-result-container');
    expect(laodSurveyResultSpy.callsCount).toBe(1);
  });

  test('should call SaveSurveyResult on Answer press', async () => {
    const {laodSurveyResultSpy, saveSurveyResultSpy, sut} = makeSut({});
    await waitForComponent(sut, 'survey-result-container');
    const buttons = sut.queryAllByTestId('answer-button');
    fireEvent.press(buttons[0]);
    await waitForComponent(sut, 'answers');
    expect(saveSurveyResultSpy.params?.answer).toEqual(
      laodSurveyResultSpy.surveyResult.answers[0].answer,
    );
  });
});
