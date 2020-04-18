import Main from '../../pages/Main';
import CadastrarFamilia from '../../pages/CadastrarFamilia';
import DetalhesFamilia from '../../pages/DetalhesFamilia';
import { createDrawerNavigator } from 'react-navigation-drawer';
import CustomDrawer from './customDrawer';

export default createDrawerNavigator({
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

}, {

    contentComponent: CustomDrawer
})


