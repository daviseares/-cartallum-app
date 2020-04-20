
import 'react-native-gesture-handler';
import { StatusBar, YellowBox, AsyncStorage } from 'react-native';
import { Provider } from "react-redux";
import Routes from './routes';

import storeConfig from './store/storeConfig';
import React, { useEffect, useState } from 'react';

YellowBox.ignoreWarnings([
  'Unrecognized WebSocket'
])
console.disableYellowBox = true;

const storeConf = storeConfig()

function App() {
  
  return (
    <>
      <StatusBar barStyle={"light-content"} backgroundColor='#272936' />
      <Provider store={storeConf}>
        <Routes />
      </Provider>
    </>

  );
}


export default App