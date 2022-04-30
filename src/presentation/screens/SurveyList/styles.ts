import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;

  background-color: #2a2931;
`;

export const Content = styled.View`
  flex: 1;
  padding: 16px;
`;

export const List = styled.FlatList``;

export const ErrorWrap = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const ErrorTitle = styled.Text`
  font-size: 16px;

  color: #fff;
`;
