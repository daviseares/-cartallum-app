import { Text, TouchableOpacity } from 'react-native';
import * as React from 'react';
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

import Main from './pages/Main';
import CadastrarFamilia from './pages/CadastrarFamilia';
import Login from './pages/Login';

const Routes = createAppContainer(
    createStackNavigator({
        Login: {
            screen: Login,
            navigationOptions: {
                title: 'Login',
                headerShown: false,
                gestureEnabled: false,
            }
        },
        Main: {
            screen: Main,
            navigationOptions: {
                title: 'Cartallum App',
                headerLeft: () => null,
                gestureEnabled: false,
            }
        },
        CadastrarFamilia: {
            screen: CadastrarFamilia,
            navigationOptions: {
                title: 'Cadastrar Família'
            }
        }
    }, {
        defaultNavigationOptions: {
            headerTintColor: '#fff',
            headerBackTitleVisible: false,
            headerStyle: {
                backgroundColor: '#272936'
            }
        }
    })
)

export default Routes;