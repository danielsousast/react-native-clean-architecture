import React from 'react';
import {Container, Text} from './styles';

type LinkButtonProps = {
  testID?: string;
  onPress: () => void;
};

const LinkButton: React.FC<LinkButtonProps> = ({testID, onPress, children}) => {
  return (
    <Container testID={testID} onPress={onPress}>
      <Text>{children}</Text>
    </Container>
  );
};

export default LinkButton;
