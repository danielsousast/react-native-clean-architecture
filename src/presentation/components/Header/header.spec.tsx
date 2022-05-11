import React from 'react';
import { renderWithAuthProvider } from "@/../jest/helpers"
import Header from "@/presentation/components/Header"
import { act, fireEvent } from "@testing-library/react-native";

describe("Header component", () => {
    test("should call setCurrentAccount with null value", () => {
        const setCurrentAccountMock = jest.fn();
        const {getByTestId} = renderWithAuthProvider(
            {
                component: <Header title="any"/>, 
                setCurrentAccount: setCurrentAccountMock
            }
        )

        const signOutButton = getByTestId('signout-button');
        act(() => {
            fireEvent.press(signOutButton);
        });
        expect(setCurrentAccountMock).toBeCalledWith(undefined);
    })
})