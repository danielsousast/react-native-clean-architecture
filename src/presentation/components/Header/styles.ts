import styled from 'styled-components/native';

export const Container = styled.View`
  margin-top: 40px;
  padding: 0 16px;
  justify-content: space-between;
`;

export const WelcomeWrapper = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
`;

export const HeaderTitle = styled.Text`
  font-size: 16px;
  font-weight: 500;
  margin-top: 32px;
`;

export const WelcomeText = styled.Text``;

export const UserWrapper = styled.View``;

export const UserName = styled.Text`
  font-size: 18px;
  font-weight: 500;
`;

export const SignOutButton = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
`;

export const SignOutButtonText = styled.Text`
  color: #f16605;
`;
