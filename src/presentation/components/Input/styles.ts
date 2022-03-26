import {TextInput as RNTextInput} from 'react-native';
import styled, {css} from 'styled-components/native';

type ContainerProps = {
  error: boolean;
};

export const Container = styled.View<ContainerProps>`
  width: 100%;
  height: 7%;
  justify-content: center;
  background-color: #3e3c47;
  border-radius: 4px;
  ${({error}) =>
    error &&
    css`
      border: 1px solid red;
    `}
`;

export const TextInput = styled(RNTextInput).attrs({
  placeholderTextColor: '#eee',
})`
  width: 100%;
  color: #fff;
  padding: 0 16px;
`;
