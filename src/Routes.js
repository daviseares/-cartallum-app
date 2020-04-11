import * as React from 'react';
import { createAppContainer, NavigationActions } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import Main from './pages/Main';
import CadastrarFamilia from './pages/CadastrarFamilia';
import DetalhesFamilia from './pages/DetalhesFamilia';
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
        DetalhesFamilia: {
            screen: DetalhesFamilia,
            navigationOptions: {
                title: 'Detalhes',
                headerShown: false,
                gestureEnabled: false,
            }
        },
        CadastrarFamilia: {
            screen: CadastrarFamilia,
            navigationOptions: {
                title: 'Cadastrar Família'
            }
        },

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