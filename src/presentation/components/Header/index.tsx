import React from 'react';
import {Container, HeaderTitle} from './styles';

type HeaderProps = {
  title: string;
};

const Header: React.FC<HeaderProps> = ({title}) => {
  return (
    <Container>
      <HeaderTitle>{title}</HeaderTitle>
    </Container>
  );
};

export default Header;
