
import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar, YellowBox } from 'react-native';
import { Provider } from "react-redux";
import Routes from './Routes';
import storeConfig from './store/storeConfig';

YellowBox.ignoreWarnings([
  'Unrecognized WebSocket'
])
console.disableYellowBox = true;

const storeConf = storeConfig()

export default function App() {
  return (
    <>
      <StatusBar barStyle={"light-content"} backgroundColor='#272936' />
      <Provider store={storeConf}>
        <Routes />
      </Provider>
    </>

  );
}
