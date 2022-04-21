import styled from 'styled-components/native';

export const Container = styled.View`
  width: 100%;
  height: 12%;
  justify-content: flex-start;
  align-items: center;
  padding: 16px;
  margin-bottom: -20%;
`;

export const Message = styled.Text.attrs({
  numberOfLines: 2,
})`
  font-size: 15px;
  color: pink;
  width: 90%;
  text-align: center;
`;
