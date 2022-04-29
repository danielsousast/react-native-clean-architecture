/* eslint-disable react-hooks/exhaustive-deps */
import {SurveyModel} from '@/domain/models';
import {LoadSurveyList} from '@/domain/usecases';
import SurveyCard from '@/presentation/components/SurveyCard';
import React, {useEffect, useState} from 'react';
import {Container, Content, ErrorTitle, ErrorWrap} from './styles';

type SurveyList = {
  loadSurveyList: LoadSurveyList;
};

const SurveyListScreen: React.FC<SurveyList> = ({loadSurveyList}) => {
  const [surveyList, setSurveyList] = useState<SurveyModel[]>();
  const [error, setError] = useState<Error>(null as unknown as Error);

  useEffect(() => {
    async function load() {
      try {
        const surveyListResponse = await loadSurveyList.execute();
        setSurveyList(surveyListResponse);
      } catch (err) {
        setError(err as Error);
      }
    }

    load();
  }, []);

  function renderError() {
    return (
      <ErrorWrap>
        <ErrorTitle testID="error-title">{error?.message}</ErrorTitle>
      </ErrorWrap>
    );
  }

  return (
    <Container testID="survey-list-container">
      <Content testID="survey-list-content">
        {surveyList &&
          surveyList?.map(survey => (
            <SurveyCard
              key={survey.id}
              data={{
                title: 'Qual o meu framework favorito?',
                date: '12/12/2022',
              }}
            />
          ))}
        {error && renderError()}
      </Content>
    </Container>
  );
};

export default SurveyListScreen;
