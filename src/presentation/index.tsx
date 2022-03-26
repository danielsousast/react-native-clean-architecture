import React, {Fragment} from 'react';
import {StatusBar} from 'react-native';
import Navigator from '@/presentation/navigation';

const App: React.FC = () => {
  return (
    <Fragment>
      <StatusBar barStyle="light-content" translucent />
      <Navigator />
    </Fragment>
  );
};

export default App;
