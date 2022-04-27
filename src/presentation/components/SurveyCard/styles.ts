import styled from 'styled-components/native';

export const Container = styled.View`
  border-radius: 8px;
  background-color: #3e3c47;
  padding-top: 32px;
  margin-bottom: 16px;
`;

export const Title = styled.Text`
  color: #eee;
  text-align: center;
  font-size: 16px;
  font-weight: bold;
`;

export const Button = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  background-color: #f16605;
  padding: 12px;
  margin-top: 32px;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
`;

export const ButtonText = styled.Text`
  color: #fff;
  font-size: 14px;
`;
