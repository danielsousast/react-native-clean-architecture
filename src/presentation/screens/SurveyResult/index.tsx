//import {SurveyResultModel} from '@/domain/models';
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
  //const [surveyResult, setSurveyResult] = useState<SurveyResultModel>();

  const handleOnBackPress = useCallback(() => {
    goBack();
  }, [goBack]);

  useEffect(() => {
    loadSurveyResult.execute();
  }, [loadSurveyResult]);

  function renderError() {
    return <ErrorComponent message={error?.message} onPress={() => {}} />;
  }

  const renderItem = () => {
    return (
      <AnswerWrapper>
        <AnswerTitle>React JJ</AnswerTitle>
        <AnswerLabel>50%</AnswerLabel>
      </AnswerWrapper>
    );
  };

  return (
    <Fragment>
      <Spinner visible={loading} />
      <Container testID="survey-result-container">
        {error && renderError()}
        {!error && (
          <Fragment>
            <Title>Qual seu framework favorito?</Title>
            <List data={['1', '2']} renderItem={renderItem} />
          </Fragment>
        )}
        <Button title="Votlar" onPress={handleOnBackPress} />
      </Container>
    </Fragment>
  );
};

export default SurveyResult;
