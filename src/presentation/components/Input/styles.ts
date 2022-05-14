import {colors} from '@/presentation/global/colors';
import {TextInput as RNTextInput} from 'react-native';
import styled, {css} from 'styled-components/native';

type ContainerProps = {
  error: boolean;
};

export const Container = styled.View<ContainerProps>`
  width: 100%;
  height: 44px;
  justify-content: center;
  border-bottom-width: 1px;
  border-bottom-color: ${colors.border};
  border-radius: 4px;
  ${({error}) =>
    error &&
    css`
      border: 1px solid red;
    `}
`;

export const TextInput = styled(RNTextInput).attrs({
  placeholderTextColor: colors.lightText,
})`
  width: 100%;
  color: ${colors.text};
  padding: 0 16px;
`;
