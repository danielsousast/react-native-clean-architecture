if (__DEV__) {
  import('../config/ReactotronConfig');
}
import React, {Fragment} from 'react';
import {StatusBar} from 'react-native';
import {Navigator} from '@/main/navigation';

const App: React.FC = () => {
  return (
    <Fragment>
      <StatusBar barStyle="light-content" translucent />
      <Navigator />
    </Fragment>
  );
};

export default App;
