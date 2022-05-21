/* eslint-disable react-hooks/exhaustive-deps */
import {SurveyModel} from '@/domain/models';
import {LoadSurveyList} from '@/domain/usecases';
import {Spinner} from '@/presentation/components';
import ErrorComponent from '@/presentation/components/ErrorComponent';
import Header from '@/presentation/components/Header';
import SurveyCard from '@/presentation/components/SurveyCard';
import {useErrorHandler} from '@/presentation/hooks/useErrorHandler';
import {useNavigation} from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';
import {Container, Content} from './styles';

type SurveyList = {
  loadSurveyList: LoadSurveyList;
};

const SurveyListScreen: React.FC<SurveyList> = ({loadSurveyList}) => {
  const {navigate} = useNavigation();
  const handleError = useErrorHandler(error => setError(error));
  const [loading, setLoading] = useState(false);
  const [surveyList, setSurveyList] = useState<SurveyModel[]>();
  const [error, setError] = useState<Error>(null as unknown as Error);

  async function handleLoadSurveyList() {
    setLoading(true);
    try {
      const surveyListResponse = await loadSurveyList.execute();
      setSurveyList(surveyListResponse);
    } catch (err) {
      handleError(err as Error);
    }
    setLoading(false);
  }

  useEffect(() => {
    handleLoadSurveyList();
  }, []);

  function renderError() {
    return (
      <ErrorComponent message={error?.message} onPress={handleLoadSurveyList} />
    );
  }

  const handleSurveyPress = useCallback((surveyId: string) => {
    //@ts-ignore
    navigate('SurveyResult', {
      surveyId,
    });
  }, []);

  return (
    <Container testID="survey-list-container">
      <Spinner visible={loading} />
      <Header title="Enquetes" />
      <Content testID="survey-list-content">
        {surveyList?.map((survey, index) => (
          <SurveyCard
            testID={`survey-item-${index}`}
            key={survey.id}
            data={{
              title: survey?.question,
              date: '12/12/2022',
            }}
            onPress={() => handleSurveyPress(survey.id)}
          />
        ))}
      </Content>
      {error && renderError()}
    </Container>
  );
};

export default SurveyListScreen;
