import {colors} from '@/presentation/global/colors';
import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
  padding: 16px;
  padding-top: 40px;
  background-color: ${colors.background};
`;

export const Title = styled.Text`
  font-weight: bold;
  font-size: 18px;
  margin-bottom: 24px;
  margin-top: 8px;
`;

export const List = styled.ScrollView``;

export const AnswerWrapper = styled.TouchableOpacity`
  background-color: #fff;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 12px;
  flex-direction: row;
  justify-content: space-between;
`;

export const AnswerTitle = styled.Text`
  font-weight: 500;
`;

export const AnswerLabel = styled.Text``;
