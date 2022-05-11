import { useAuth } from '@/presentation/context/auth-context';
import React from 'react';
import {Container, HeaderTitle, SignOutButton, SignOutButtonText} from './styles';

type HeaderProps = {
  title: string;
};

const Header: React.FC<HeaderProps> = ({title}) => {
  const {setCurrentAccount} = useAuth()

  function handleSignOut() {
    setCurrentAccount(undefined);
  }
  return (
    <Container>
      <HeaderTitle>{title}</HeaderTitle>
      <SignOutButton onPress={handleSignOut} testID="signout-button">
        <SignOutButtonText>Sair</SignOutButtonText>
      </SignOutButton>
    </Container>
  );
};

export default Header;
