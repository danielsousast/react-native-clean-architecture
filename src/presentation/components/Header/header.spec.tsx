import React from 'react';
import { renderWithAuthProvider } from "@/../jest/helpers"
import Header from "@/presentation/components/Header"
import { act, fireEvent, RenderAPI } from "@testing-library/react-native";
import { AccountModel } from '@/domain/models';

type SutTypes = {
    sut: RenderAPI;
    setCurrentAccountMock: (account: AccountModel) => void;
}

const makeSut = ():SutTypes => {
    const setCurrentAccountMock = jest.fn();
    const sut = renderWithAuthProvider(
        {
            component: <Header title="any"/>, 
            setCurrentAccount: setCurrentAccountMock
        }
    )

    return {
        sut, setCurrentAccountMock
    }
}

describe("Header component", () => {
    test("should call setCurrentAccount with null value", () => {
        const {sut,setCurrentAccountMock} = makeSut();
            const signOutButton = sut.getByTestId('signout-button');
        act(() => {
            fireEvent.press(signOutButton);
        });
        expect(setCurrentAccountMock).toBeCalledWith(undefined);
    })
})