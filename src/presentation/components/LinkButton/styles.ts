import {colors} from '@/presentation/global/colors';
import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity`
  width: 100%;
  height: 44px;
  justify-content: center;
  align-items: center;
`;

export const Text = styled.Text`
  font-weight: bold;
  color: ${colors.lightText};
`;
