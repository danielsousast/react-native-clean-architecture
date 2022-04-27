import SurveyCard from '@/presentation/components/SurveyCard';
import React from 'react';
import {Container, Content, List} from './styles';

const SurveyList: React.FC = () => {
  function renderItem() {
    return (
      <SurveyCard
        data={{
          title: 'Qual o meu framework favorito?',
          date: '12/12/2022',
        }}
      />
    );
  }

  return (
    <Container>
      <Content>
        <List data={['1', '2']} renderItem={renderItem} />
      </Content>
    </Container>
  );
};

export default SurveyList;
