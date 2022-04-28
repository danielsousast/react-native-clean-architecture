if (__DEV__) {
  import('../config/ReactotronConfig');
}
import React from 'react';
import {StatusBar} from 'react-native';
import {Navigator} from '@/main/navigation';
import AppProvider from '@/presentation/context';

const App: React.FC = () => {
  return (
    <AppProvider>
      <StatusBar barStyle="light-content" translucent />
      <Navigator />
    </AppProvider>
  );
};

export default App;
