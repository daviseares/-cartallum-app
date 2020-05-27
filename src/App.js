
import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar, YellowBox } from 'react-native';
import { Provider } from "react-redux";
import Routes from './routes';


import { store, persistor } from './store/storeConfig';
import { PersistGate } from 'redux-persist/es/integration/react';

YellowBox.ignoreWarnings([
  'Unrecognized WebSocket'
])
console.disableYellowBox = true;


function App() {

  return (
    <>
      <StatusBar barStyle={"light-content"} backgroundColor='#272936' />

      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor} >
          <Routes />
        </PersistGate>
      </Provider>
    </>

  );
}


export default App