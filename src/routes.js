import * as React from 'react';
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack';
import DetalhesFamilia from './pages/DetalhesFamilia';
import { createDrawerNavigator } from 'react-navigation-drawer';
import Main from './pages/Main';
import DetalhesInstituicao from './pages/DetalhesInstituicao';
import CadastrarFamilia from './pages/CadastrarFamilia';
import CadastrarInstituicao from './pages/CadastrarInstituicao'
import CustomDrawer from './components/Drawer/customDrawer';
import Login from './pages/Login';
import Sobre from './pages/Sobre';
import Splash from './pages/Splash';
import RelatorioGeral from './pages/RelatorioGeral';

const Drawer = createAppContainer(createDrawerNavigator({
    Main: {
        screen: Main,
        navigationOptions: {
            title: 'Início',
            headerShown: false,
            gestureEnabled: false,

        }
    },
    DetalhesInstituicao: {
        screen: DetalhesInstituicao,
        navigationOptions: {
            title: 'Instituições'
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
            title: 'Cadastrar Instituição',
        }
    },
    RelatorioGeral: {
        screen: RelatorioGeral,
        navigationOptions: {
            title: 'Relatório Geral'
        }
    },
    Sobre: {
        screen: Sobre,
        navigationOptions: {
            title: 'Sobre o aplicativo'
        }
    },

}, {
    contentComponent: CustomDrawer
}));


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
            headerShown: false,
            animationEnabled: false,
        }
    },
    DetalhesFamilia: {
        screen: DetalhesFamilia,
        navigationOptions: {
            title: 'Detalhes',
            headerShown: false,
            gestureEnabled: false,
            animationEnabled: false,
        }
    },
    Splash: {
        screen: Splash,
        navigationOptions: {
            headerShown: false,
            gestureEnabled: false,
            animationEnabled: false,
        }
    },
}, {

    initialRouteName: "Splash"
})


export default createAppContainer(Routes);