import {act, fireEvent, RenderAPI} from '@testing-library/react-native';

export const simulateSubmit = (sut: RenderAPI) => {
  act(() => {
    const submit = sut.getByTestId('submit');
    fireEvent.press(submit);
  });
};

export const fillIpunt = (sut: RenderAPI, testID: string, value: string) => {
  const input = sut.getByTestId(testID);
  fireEvent(input, 'onChangeText', value);
};

export const testButtonIsEnabled = (sut: RenderAPI, testID: string) => {
  const submit = sut.getByTestId(testID);
  expect(submit.props.accessibilityState.disabled).toBeFalsy();
};

export const testButtonIsDisabled = (sut: RenderAPI, testID: string) => {
  const submit = sut.getByTestId(testID);
  expect(submit.props.accessibilityState.disabled).toBeTruthy();
};

export const testInputIsEmpty = (sut: RenderAPI, testID: string) => {
  const input = sut.getByTestId(testID);
  expect(input.props.value).toBe('');
};
