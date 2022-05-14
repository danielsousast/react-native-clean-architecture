import styled from 'styled-components/native';

export const Container = styled.View`
  border-radius: 8px;
  background-color: #fff;
  padding-top: 32px;
  margin-bottom: 16px;
`;

export const Title = styled.Text`
  text-align: center;
  font-size: 14px;
  font-weight: 600;
`;

export const Button = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  padding: 12px;
  margin-top: 32px;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  border-top-width: 0.5px;
  border-top-color: #eee;
`;

export const ButtonText = styled.Text`
  font-size: 14px;
  color: #f16605;
  font-weight: 500;
`;
