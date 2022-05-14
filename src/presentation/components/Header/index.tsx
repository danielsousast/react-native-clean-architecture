/* eslint-disable react-hooks/exhaustive-deps */
import {AccountModel} from '@/domain/models';
import {useAuth} from '@/presentation/context/auth-context';
import React, {useEffect, useState} from 'react';
import {
  Container,
  HeaderTitle,
  SignOutButton,
  SignOutButtonText,
  UserName,
  UserWrapper,
  WelcomeText,
  WelcomeWrapper,
} from './styles';

type HeaderProps = {
  title: string;
};

const Header: React.FC<HeaderProps> = ({title}) => {
  const [user, setUser] = useState<AccountModel>();
  const {signOut, getCurrentAccount} = useAuth();

  useEffect(() => {
    async function getUser() {
      const userStoraged = await getCurrentAccount();
      if (userStoraged) setUser(userStoraged);
    }

    getUser();
  }, []);

  return (
    <Container testID="header-container">
      <WelcomeWrapper>
        <UserWrapper>
          <WelcomeText>Olá,</WelcomeText>
          <UserName testID="user-name">{user?.name}</UserName>
        </UserWrapper>
        <SignOutButton onPress={signOut} testID="signout-button">
          <SignOutButtonText>Sair</SignOutButtonText>
        </SignOutButton>
      </WelcomeWrapper>
      <HeaderTitle>{title}</HeaderTitle>
    </Container>
  );
};

export default Header;
