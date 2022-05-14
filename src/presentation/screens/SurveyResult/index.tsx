import {Button} from '@/presentation/components';
import {useNavigation} from '@react-navigation/native';
import React, {useCallback} from 'react';
import {
  AnswerTitle,
  AnswerWrapper,
  Container,
  Title,
  List,
  AnswerLabel,
} from './styles';

const SurveyResult: React.FC = () => {
  const {goBack} = useNavigation();

  const handleOnBackPress = useCallback(() => {
    goBack();
  }, [goBack]);

  const renderItem = () => {
    return (
      <AnswerWrapper>
        <AnswerTitle>React JJ</AnswerTitle>
        <AnswerLabel>50%</AnswerLabel>
      </AnswerWrapper>
    );
  };

  return (
    <Container>
      <Title>Qual seu framework favorito?</Title>
      <List data={['1', '2']} renderItem={renderItem} />
      <Button title="Votlar" onPress={handleOnBackPress} />
    </Container>
  );
};

export default SurveyResult;
