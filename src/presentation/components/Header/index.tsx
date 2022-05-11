import { AccountModel } from '@/domain/models';
import { useAuth } from '@/presentation/context/auth-context';
import React, { useEffect, useState } from 'react';
import {Container, HeaderTitle, SignOutButton, SignOutButtonText, UserName} from './styles';

type HeaderProps = {
  title: string;
};

const Header: React.FC<HeaderProps> = ({title}) => {
  const[user,setUser]= useState<AccountModel>();
  const {setCurrentAccount, getCurrentAccount} = useAuth();

  function handleSignOut() {
    setCurrentAccount(undefined);
  }

  useEffect(()=>{
    async function getUser() {
      const userStoraged = await getCurrentAccount();
      if(userStoraged) setUser(userStoraged)
    }

    getUser();
  },[]);

  return (
    <Container testID='header-container'>
      <UserName testID='user-name'>{user?.name}</UserName>
      <HeaderTitle>{title}</HeaderTitle>
      <SignOutButton onPress={handleSignOut} testID="signout-button">
        <SignOutButtonText>Sair</SignOutButtonText>
      </SignOutButton>
    </Container>
  );
};

export default Header;

