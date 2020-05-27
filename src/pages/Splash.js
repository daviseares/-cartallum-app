import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    AsyncStorage,
} from 'react-native';
import api from '../services/api';
import { connect } from "react-redux";
import * as parse from '../components/Parse';
import { storeInstituicao, storeToken } from '../store/actions/actionInstituicao';
import Loading from '../components/Loading';


function Splash({ navigation, storeInstituicao, token, instituicao }) {

    const [isSplash, setIsSplash] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                /**
                 * Verificação do token do usuario que esta guardado no AsyncStorege
                 * Caso estaeja guadado ele autentica com o axios Permininto que o usuario entre no app sem logar novamente
                 */
                if (token) {
                    api.defaults.headers.common['Authorization'] = `Bearer ${token}`
                    api.defaults.headers.common['AuthorizationEmail'] = `${instituicao.email}`

                    const response = await api.get('/isLogged/');

                    console.log('Response:', response.data);

                    if (parse.isSuccess(response.data)) {

                        setIsSplash(false);
                        navigation.navigate("Main");


                    } else {
                        storeInstituicao(null);
                        setIsSplash(false);
                        navigation.navigate("Login");
                    }

                } else {
                    setIsSplash(false);
                    navigation.navigate("Login");
                }

            } catch (erro) {
                setIsSplash(false);
                console.log(erro);
                parse.showToast("Algo deu errado, tente novamente!");

            }
        }
        fetchData(instituicao);
    }, []);

    console.log("instituicao", instituicao)
    return (

        <Loading
            text="Carregando.."
            isVisible={isSplash}
            textColor="#333"
            backgroundColor="#fff"
            activityColor="#333"
        />
    )
}

const mapStateToProps = state => {
    return {
        token: state.reducerInstituicao.token,
        instituicao: state.reducerInstituicao.instituicao
    }
};

const mapDispatchToProps = dispatch => ({

    storeInstituicao: (value) => dispatch(storeInstituicao(value))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Splash); 