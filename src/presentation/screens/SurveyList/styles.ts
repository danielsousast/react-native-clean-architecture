import {colors} from '@/presentation/global/colors';
import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${colors.background};
`;

export const Content = styled.ScrollView.attrs({
  contentContainerStyle: {
    paddingBottom: 24,
  },
})`
  flex: 1;
  padding: 16px;
`;

export const List = styled.FlatList``;
