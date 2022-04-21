import AsyncStorage from '@react-native-async-storage/async-storage';
import {NativeModules} from 'react-native';
import Reactotron from 'reactotron-react-native';

declare global {
  interface Console {
    tron: typeof Reactotron;
  }
}

let tron: typeof Reactotron = Reactotron;

if (__DEV__ && !process.env.__TEST__) {
  tron = Reactotron.configure({
    name: '4Dev',
    host: NativeModules.SourceCode.scriptURL.split('://')[1].split(':')[0],
  }).setAsyncStorageHandler!(AsyncStorage)
    .useReactNative({
      asyncStorage: false,
      overlay: false,
    })
    .connect();

  tron.clear!();

  console.tron = tron;
}

export default tron;
