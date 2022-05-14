import React from 'react';
import {renderWithAuthProvider} from '@/../jest/helpers';
import Header from '@/presentation/components/Header';
import {act, fireEvent, RenderAPI} from '@testing-library/react-native';
import {AccountModel} from '@/domain/models';
import {mockAccountModel} from '@/domain/test';
import {waitForComponent} from '@/presentation/test/form-helper';

type SutTypes = {
  sut: RenderAPI;
  setCurrentAccountMock: (account: AccountModel) => void;
};

const makeSut = (account: AccountModel = mockAccountModel()): SutTypes => {
  const setCurrentAccountMock = jest.fn();
  const sut = renderWithAuthProvider({
    component: <Header title="any" />,
    setCurrentAccount: setCurrentAccountMock,
    getCurrentAccount: () => account,
  });

  return {
    sut,
    setCurrentAccountMock,
  };
};

describe('Header component', () => {
  test('should call setCurrentAccount with null value', async () => {
    const {sut, setCurrentAccountMock} = makeSut();
    const signOutButton = sut.getByTestId('signout-button');
    act(() => {
      fireEvent.press(signOutButton);
    });
    await waitForComponent(sut, 'header-container');
    expect(setCurrentAccountMock).toBeCalledWith(undefined);
  });

  test('should render userName correctly', async () => {
    const account = mockAccountModel();
    const {sut} = makeSut(account);
    await waitForComponent(sut, 'header-container');
    const userName = sut.getByTestId('user-name');
    expect(userName.children[0]).toBe(account.name);
  });
});
