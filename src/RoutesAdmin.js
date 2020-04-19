import * as React from 'react';
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack';
import DetalhesFamilia from './pages/DetalhesFamilia';
import { createDrawerNavigator } from 'react-navigation-drawer';
import Main from './pages/Main';
import CadastrarFamilia from './pages/CadastrarFamilia';
import CadastrarInstituicao from './pages/CadastrarInstituicao'
import CustomDrawer from './components/Drawer/customDrawer';
import Login from './pages/Login';

const Drawer = createAppContainer(createDrawerNavigator({
    Main: {
        screen: Main,
        navigationOptions: {
            title: 'Início',
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

    CadastrarInstituicao: {
        screen: CadastrarInstituicao,
        navigationOptions: {
            title: 'Cadastrar Instituição'
        }
    },


}, {

    contentComponent: CustomDrawer
})
)


const Routes = createStackNavigator({
    Login: {
        screen: Login,
        navigationOptions: {
            title: 'Login',
            headerShown: false,
            gestureEnabled: false,
        }
    },
    Drawer: {
        screen: Drawer,
        navigationOptions: {
            gestureEnabled: false,
            headerShown: false
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
})

export default createAppContainer(Routes);