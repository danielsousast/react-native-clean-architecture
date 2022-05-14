import {colors} from '@/presentation/global/colors';
import {TouchableOpacity} from 'react-native';
import styled from 'styled-components/native';

export const Container = styled(TouchableOpacity)`
  width: 100%;
  height: 44px;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  background-color: ${colors.primary};
`;

export const Text = styled.Text`
  color: #fff;
  font-weight: bold;
`;
