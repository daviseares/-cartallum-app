
import 'react-native-gesture-handler';
import { StatusBar, YellowBox, AsyncStorage } from 'react-native';
import { Provider } from "react-redux";
import RoutesCliente from './RoutesCliente';
import RoutesAdmin from './RoutesAdmin';

import storeConfig from './store/storeConfig';
import React, { useEffect, useState } from 'react';

YellowBox.ignoreWarnings([
  'Unrecognized WebSocket'
])
console.disableYellowBox = true;

const storeConf = storeConfig()

function App() {
  const [data, setData] = useState({});

  useEffect(() => {
    async function fetchData() {
      try {

        const instituicao = JSON.parse(await AsyncStorage.getItem('@instituicao'))
        setData(instituicao)

      } catch (erro) {
        console.log('Erro App: ', erro)
      }
    }
    fetchData();
  }, []);
  console.log(data)
  return (
    <>
      <StatusBar barStyle={"light-content"} backgroundColor='#272936' />
      <Provider store={storeConf}>
        {
          data.tipo === 'cliente' ?
            <RoutesCliente />
            :
            <RoutesAdmin />
        }

      </Provider>
    </>

  );
}


export default App