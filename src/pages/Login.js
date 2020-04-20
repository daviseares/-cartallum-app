import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    AsyncStorage,
    ActivityIndicator,
    Alert,
} from 'react-native';
import api from '../services/api';
import { connect } from "react-redux";
//import Toast from 'react-native-simple-toast';
import * as parse from '../components/Parse';
import { dataInstituicao } from '../store/actions/actionInstituicao'
import Loading from '../components/Loading';
function Login({ navigation, dataInstituicao }) {


    const [email, setEmail] = useState('');
    const [isSplash, setIsSplash] = useState(true)
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        async function fetchData() {
            try {
                const token = JSON.parse(await AsyncStorage.getItem('@CodeApi:token'))
                const instituicao = JSON.parse(await AsyncStorage.getItem('@instituicao'))

                /**
                 * Verificação do token do usuario que esta guardado no AsyncStorege
                 * Caso estaeja guadado ele autentica com o axios Permininto que o usuario entre no app sem logar novamente
                 */

                if (token) {
                    api.defaults.headers.common['Authorization'] = `Bearer ${token}`
                    await api.get('/projects')
                    dataInstituicao(instituicao)
                    navigation.navigate("Main")
                    setIsSplash(false);
                } else {
                    setIsSplash(false);
                }
            } catch (erro) {
                console.log(erro);
                parse.showToast("Algo deu errado, tente novamente!");
                setIsSplash(false);
            }
        }
        fetchData();
    }, []);


    /**
     * faz o login da instituição
     */
    async function authentication() {

        if (email != '' && password != '') {
            setIsLoading(true)
            try {
                const response = await api.post('auth/authenticate', {
                    login: email,
                    password: password,
                })
                //validantion passed
                console.log(response);
                try {
                    api.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`
                    //salva token no AsynStorage
                    AsyncStorage.setItem('@CodeApi:token', JSON.stringify(response.data.token))

                    //salva  instituição no AsynStorage
                    AsyncStorage.setItem('@instituicao', JSON.stringify(response.data.instituicao))
                    dataInstituicao(response.data.instituicao)
                } catch (error) {
                    setIsLoading(false)
                    console.log('Erro AsyncStorrage:', error)
                }

                navigation.navigate("Main")
                const welcome = "Bem Vindo! - " + response.data.instituicao.nomeInstituicao

                parse.showToast(welcome, parse.duration.MEDIUM);
                setIsLoading(false)

            } catch (error) {
                setIsLoading(false)
                parse.showToast("Algo deu errado, tente novamente!");
                console.log('Erro Login:', error)
            }

        } else {
            setIsLoading(false)
            parse.showToast('Porfavor digite os campos de email e senha corretamente', parse.duration.MEDIUM)
        }

    }



    if (isSplash) {
        return (
            <Loading
                text="Carregando.."
                isVisible={isSplash}
                textColor="#333"
                backgroundColor="#fff"
                activityColor="#333"
            />
        )
    } else {
        return (
            <>
                <Loading text="Carregando.." isVisible={isLoading} />
                <View style={{ flex: 1, justifyContent: "center", marginHorizontal: 30 }}>
                    <View style={styles.header}>
                        <Text style={styles.textHeader}>Entrar</Text>
                    </View>
                    <View style={styles.container}>
                        <TextInput
                            style={styles.input}
                            placeholder='Email'
                            autoCapitalize="none"
                            placeholderTextColor="#999"
                            autoCorrect={false}
                            onChangeText={setEmail}
                            value={email}

                        />
                        <TextInput
                            style={styles.input}
                            placeholder='Senha'
                            secureTextEntry={true}
                            placeholderTextColor="#999"
                            autoCapitalize="none"
                            autoCorrect={false}
                            onChangeText={setPassword}
                            value={password}

                        />
                        <TouchableOpacity onPress={authentication} style={styles.button}>
                            <Text style={styles.textButton}>Entrar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </>
        )
    }
}

var styles = StyleSheet.create({
    splash: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    container: {
        marginTop: 45
    },
    header: {
        justifyContent: "center"
    },
    textHeader: {
        color: '#47525E',
        fontSize: 28,
        textAlign: "center",
        fontWeight: "300",
    },
    input: {
        marginBottom: 20,
        height: 50,
        backgroundColor: "#fff",
        color: "#333",
        borderRadius: 25,
        paddingHorizontal: 20,
        fontSize: 16,
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowOffset: {
            width: 4,
            height: 4,
        },
        zIndex: 1,
        elevation: 3,
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        marginTop: 40,
        borderRadius: 8,
        backgroundColor: '#272936',
        zIndex: 1,
    },
    textButton: {
        color: 'white',
        fontSize: 18,
        fontWeight: "400",
        zIndex: 1,
    },
    center: {
        flex: 1,
        marginVertical: 40,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center'
    },

    textLine: {
        color: '#47525E'
    },

})
const mapStateToProps = state => {
    {

    }
};

const mapDispatchToProps = dispatch => ({

    dataInstituicao: (value) => dispatch(dataInstituicao(value))
});

export default connect(
    null,
    mapDispatchToProps
)(Login); 