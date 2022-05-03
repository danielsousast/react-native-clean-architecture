/* eslint-disable react-hooks/exhaustive-deps */
import {SurveyModel} from '@/domain/models';
import {LoadSurveyList} from '@/domain/usecases';
import {LinkButton, Spinner} from '@/presentation/components';
import SurveyCard from '@/presentation/components/SurveyCard';
import React, {useEffect, useState} from 'react';
import {Container, Content, ErrorTitle, ErrorWrap} from './styles';

type SurveyList = {
  loadSurveyList: LoadSurveyList;
};

const SurveyListScreen: React.FC<SurveyList> = ({loadSurveyList}) => {
  const [loading, setLoading] = useState(false);
  const [surveyList, setSurveyList] = useState<SurveyModel[]>();
  const [error, setError] = useState<Error>(null as unknown as Error);

  async function load() {
    setLoading(true);
    try {
      const surveyListResponse = await loadSurveyList.execute();
      setSurveyList(surveyListResponse);
    } catch (err) {
      setError(err as Error);
    }
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  function renderError() {
    return (
      <ErrorWrap>
        <ErrorTitle testID="error-title">{error?.message}</ErrorTitle>
        <LinkButton onPress={load}>Tentar novamente</LinkButton>
      </ErrorWrap>
    );
  }

  return (
    <Container testID="survey-list-container">
      <Spinner visible={loading} />
      <Content testID="survey-list-content">
        {surveyList?.map((survey, index) => (
          <SurveyCard
            testID={`survey-item-${index}`}
            key={survey.id}
            data={{
              title: survey?.question,
              date: '12/12/2022',
            }}
          />
        ))}
      </Content>
      {error && renderError()}
    </Container>
  );
};

export default SurveyListScreen;
