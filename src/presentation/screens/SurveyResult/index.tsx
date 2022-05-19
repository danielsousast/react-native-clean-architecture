import {SurveyResultModel} from '@/domain/models';
import {LoadSurveyResult} from '@/domain/usecases';
import {Button, Spinner} from '@/presentation/components';
import ErrorComponent from '@/presentation/components/ErrorComponent';
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
};

const SurveyResult: React.FC<Props> = ({loadSurveyResult}) => {
  const {goBack} = useNavigation();
  const [loading] = useState(false);
  const [error] = useState<Error>(null as unknown as Error);
  const [surveyResult, setSurveyResult] = useState<SurveyResultModel>();

  const handleOnBackPress = useCallback(() => {
    goBack();
  }, [goBack]);

  const handleLoadSurveyResult = useCallback(async () => {
    try {
      const response = await loadSurveyResult.execute();

      if (response) {
        setSurveyResult(response);
      }
    } catch (err) {}
  }, [loadSurveyResult]);

  useEffect(() => {
    handleLoadSurveyResult();
  }, [handleLoadSurveyResult]);

  function renderError() {
    return <ErrorComponent message={error?.message} onPress={() => {}} />;
  }

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
                <AnswerWrapper key={answer.answer}>
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
        <Button title="Votlar" onPress={handleOnBackPress} />
      </Container>
    </Fragment>
  );
};

export default SurveyResult;
