import React from 'react';
import {Button, ButtonText, Container, Title} from './styles';

type SurveyCardProps = {
  data: {
    title: string;
    date: string;
  };
};

const SurveyCard: React.FC<SurveyCardProps> = ({data}) => {
  return (
    <Container>
      <Title testID="survey-card-title">{data?.title}</Title>
      <Button>
        <ButtonText>Ver resultado</ButtonText>
      </Button>
    </Container>
  );
};

export default SurveyCard;
