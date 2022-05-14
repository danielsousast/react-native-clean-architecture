import React from 'react';
import {Button, ButtonText, Container, Title} from './styles';

type SurveyCardProps = {
  data: {
    title: string;
    date: string;
  };
  testID: string;
  onPress: () => void;
};

const SurveyCard: React.FC<SurveyCardProps> = ({data, onPress, testID}) => {
  return (
    <Container testID={testID}>
      <Title testID="survey-card-title">{data?.title}</Title>
      <Button onPress={onPress}>
        <ButtonText>Ver resultado</ButtonText>
      </Button>
    </Container>
  );
};

export default SurveyCard;
