if (__DEV__) {
  import('../config/ReactotronConfig');
}
import React, {Fragment} from 'react';
import {StatusBar} from 'react-native';
import {Navigator} from '@/presentation/navigation';
import {MakeLoginScreen} from './factories/screens/login/login-factory';
import {MakeRegisterScreen} from './factories/screens/register/register-factory';

const App: React.FC = () => {
  return (
    <Fragment>
      <StatusBar barStyle="light-content" translucent />
      <Navigator
        makeLogin={MakeLoginScreen}
        makeRegister={MakeRegisterScreen}
      />
    </Fragment>
  );
};

export default App;
