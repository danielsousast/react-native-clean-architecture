/* eslint-disable react-hooks/exhaustive-deps */
import {SurveyResultModel} from '@/domain/models';
import {LoadSurveyResult, SaveSurveyResult} from '@/domain/usecases';
import {Button, Spinner} from '@/presentation/components';
import ErrorComponent from '@/presentation/components/ErrorComponent';
import {useErrorHandler} from '@/presentation/hooks/useErrorHandler';
import {useNavigation} from '@react-navigation/native';
import React, {Fragment, useCallback, useEffect, useState} from 'react';
import {
  AnswerTitle,
  AnswerWrapper,
  Container,
  Title,
  List,
  AnswerLabel,
} from './styles';

type Props = {
  loadSurveyResult: LoadSurveyResult;
  saveSurveyResult: SaveSurveyResult;
};

const SurveyResult: React.FC<Props> = ({
  loadSurveyResult,
  saveSurveyResult,
}) => {
  const {goBack} = useNavigation();
  const [loading] = useState(false);
  const [surveyResult, setSurveyResult] = useState<SurveyResultModel>();
  const handleError = useErrorHandler(error => setError(error));
  const [error, setError] = useState<Error>(null as unknown as Error);

  const handleLoadSurveyResult = useCallback(async () => {
    try {
      const response = await loadSurveyResult.execute();
      if (response) {
        setSurveyResult(response);
      }
    } catch (err) {
      handleError(err as Error);
    }
  }, [loadSurveyResult]);

  useEffect(() => {
    handleLoadSurveyResult();
  }, [handleLoadSurveyResult]);

  function renderError() {
    return (
      <ErrorComponent
        message={error?.message}
        onPress={handleLoadSurveyResult}
      />
    );
  }

  const handleAnswer = async (answer: string) => {
    await saveSurveyResult.execute({answer});
  };

  return (
    <Fragment>
      <Spinner visible={loading} />
      <Container testID="survey-result-container">
        {error && renderError()}
        {!error && (
          <Fragment>
            <Title testID="question">{surveyResult?.question}</Title>
            <List testID="answers">
              {surveyResult?.answers.map((answer, index) => (
                <AnswerWrapper
                  key={answer.answer}
                  onPress={() => handleAnswer(answer.answer)}
                  testID="answer-button">
                  <AnswerTitle testID={`answer-${index}`}>
                    {answer.answer}
                  </AnswerTitle>
                  <AnswerLabel testID={`percent-${index}`}>
                    {answer.percent}
                  </AnswerLabel>
                </AnswerWrapper>
              ))}
            </List>
          </Fragment>
        )}
        <Button title="Votlar" onPress={goBack} />
      </Container>
    </Fragment>
  );
};

export default SurveyResult;
