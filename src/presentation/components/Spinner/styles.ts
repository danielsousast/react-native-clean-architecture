import {colors} from '@/presentation/global/colors';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  background-color: ${colors.background};
  position: absolute;
  z-index: 9999;
`;
