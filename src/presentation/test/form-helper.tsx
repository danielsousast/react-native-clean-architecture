import faker from '@faker-js/faker';
import {
  act,
  fireEvent,
  RenderAPI,
  waitFor,
} from '@testing-library/react-native';

export const simulateSubmit = (sut: RenderAPI) => {
  act(() => {
    const submit = sut.getByTestId('submit');
    fireEvent.press(submit);
  });
};

export const fillIpunt = (
  sut: RenderAPI,
  testID: string,
  value: string = faker.random.word(),
) => {
  act(() => {
    const input = sut.getByTestId(testID);
    fireEvent(input, 'onChangeText', value);
  });
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

export const testIfIsLoading = async (sut: RenderAPI) => {
  const spinner = sut.getByTestId('spinner');
  await waitFor(() => spinner);
  expect(spinner).toBeTruthy();
};

export const waitForComponent = async (sut: RenderAPI, testID: string) => {
  const registerContainer = sut.getByTestId(testID);
  await waitFor(() => registerContainer);
};
