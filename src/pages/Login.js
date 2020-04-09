import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ActivityIndicator,
    StyleSheet,
    AsyncStorage,
    StatusBar,
    Alert,
} from 'react-native';
import api from '../services/api';


function Login({ navigation }) {

    const [data, setData] = useState(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')

    useEffect(() => {
        async function fetchData() {
            const token = JSON.parse(await AsyncStorage.getItem('@CodeApi:token'))
            /**
             * Verificação do token do usuario que esta guardado no AsyncStorege
             * Caso estaeja guadado ele autentica com o axios Permininto que o usuario entre no app sem logar novamente
             */
            if (token) {
                try {
                    api.defaults.headers.common['Authorization'] = `Bearer ${token}`
                    const response = await api.get('/projects');
                    if (response.data.success) {
                        setData(null)
                        navigation.navigate("Main")
                    } else {
                        setData(false)
                    }

                } catch (error) {
                    setData(false)
                    console.log('Error AuthOrApp:', error)
                }

            } else {
                setData(false)
            }
        }
        fetchData();
    }, []);


    async function authentication() {
        if (email != '' && password != '') {
            try {
                const response = await api.post('auth/authenticate', {

                    login: email,
                    password: password,

                })
                console.log('authentication:', response.data.success)

                if (response.data.success) {
                    try {
                        api.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`
                        AsyncStorage.setItem('@CodeApi:token', JSON.stringify(response.data.token))

                    } catch (error) {
                        setData(false)
                        console.log('Erro AsyncStorrage:', error)
                    }

                    navigation.navigate("Main")

                } else if (response.data.status) {
                    setData(false)
                    Alert.alert('Email ou senha errados!')
                } else {
                    setData(false)
                    Alert.alert('Falha no login!')
                }

            } catch (error) {
                setData(false)
                console.log('Erro Login:', error)
                Alert.alert('Falha no login!')
            }

        } else {
            setData(false)
            Alert.alert('Porfavor digite os campos de email e senha corretamente')
        }

    }



    if (data == null) {
        return (
            <View style={styles.container1}>
                {/* <Image style={{ resizeMode: "center" }} source={require("../Imagens/ic_vertical.png")} /> */}
                <ActivityIndicator size='large' />
            </View>
        )
    } else if (data == false) {
        return (

            <View style={{ flex: 1, justifyContent: "center", marginHorizontal: 30 }}>
                <View style={styles.header}>
                    <Text style={styles.textHeader}>Entrar</Text>
                </View>
                <View style={styles.container2}>
                    <TextInput
                        style={styles.inputEmail}
                        placeholder='Email'
                        placeholderTextColor="#999"
                        autoCapitalize="words"
                        autoCorrect={false}
                        onChangeText={setEmail}
                        value={email}

                    />
                    <TextInput
                        style={styles.inputSenha}
                        placeholder='Senha'
                        secureTextEntry={true}
                        placeholderTextColor="#999"
                        autoCapitalize="words"
                        autoCorrect={false}
                        onChangeText={setPassword}
                        value={password}

                    />
                    <TouchableOpacity onPress={authentication} style={styles.buttom}>
                        <Text style={styles.textButom}>Entrar</Text>
                    </TouchableOpacity>

                    {/* <TouchableOpacity onPress={() => { }} style={{ alignItems: 'center' }}>
                        <Text style={{ marginTop: 20, fontSize: 18, color: '#8190A5', height: 60 }}>Esqueceu sua senha?</Text>
                    </TouchableOpacity> */}

                </View>
            </View>
        )

    }


}

var styles = StyleSheet.create({
    container1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFF'
    },
    container2: {
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
    inputEmail: {
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
        elevation: 3,
    },
    inputSenha: {
        marginTop: 15,
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
        elevation: 3,
    },
    buttom: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        marginTop: 40,
        borderRadius: 8,
        backgroundColor: '#272936'
    },
    textButom: {
        color: 'white',
        fontSize: 18,
        fontWeight: "400",

    },
    center: {
        flex: 1,
        marginVertical: 40,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center'
    },
    line: {
        width: 120,
        height: 0.5,
        alignItems: 'center',
        backgroundColor: '#C0CCDA',
    },
    textLine: {
        color: '#47525E'
    },
    textButomGoogle: {
        color: '#5A6978',
        fontSize: 18,
        marginLeft: 30,
    }

})
export default Login