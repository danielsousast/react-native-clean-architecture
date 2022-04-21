if (__DEV__) {
  import('../config/ReactotronConfig');
}
import React, {Fragment} from 'react';
import {StatusBar} from 'react-native';
import {Navigator} from '@/presentation/navigation';
import {MakeLoginScreen} from './factories/screens/login/login-factory';

const App: React.FC = () => {
  return (
    <Fragment>
      <StatusBar barStyle="light-content" translucent />
      <Navigator makeLogin={MakeLoginScreen} />
    </Fragment>
  );
};

export default App;
