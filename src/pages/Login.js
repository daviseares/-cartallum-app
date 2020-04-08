import React from 'react';
import axios from 'axios';
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

        const json = await AsyncStorage.getItem('userData')
        const userData = JSON.parse(json) || null
        /**
         * Verificação do token do usuario que esta guardado no AsyncStorege
         * Caso estaeja guadado ele autentica com o axios Permininto que o usuario entre no app sem logar novamente
         */
        if (userData != null) {
            if (userData.password_digest) {
                try {
                    console.log('Error AuthOrApp:', userData.password_digest)
                    axios.defaults.headers.common['Authorization'] = `bearer ${userData.password_digest}`
                    setData(true)
                } catch (error) {
                    console.log('Error AuthOrApp:', error)
                }
                this.props.navigation.navigate('Route')

            } else {
                this.props.navigation.navigate('Auth')
            }
        } else {
            setData(false)
        }
    }, []);


    authentication = async () => {
        if (email != '' && password != '') {
            try {
                const response = await api.get('/projects', {
                    params: {
                        latitude,
                        longitude,
                        techs
                    }
                })
                console.log('authentication:', response)

                if (request.data.logged_in) {
                    try {
                        axios.defaults.headers.common['Authorization'] = `bearer ${request.data.user.password_digest}`
                        AsyncStorage.setItem('userData', JSON.stringify(request.data.user))

                    } catch (error) {
                        setData(false)
                        console.log('Erro AsyncStorrage:', error)
                    }

                    

                } else if (request.data.status) {
                    setData(false)
                    Alert.alert('Email ou senha errados!')
                } else {
                    setData(false)
                    Alert.alert('Falha no login!', err.request._response)
                }

            } catch (error) {
                setData(false)
                Alert.alert('Falha no login!', err.request._response)
            }

        } else {
            setData(false)
            Alert.alert('Porfavor digite os campos de email e senha corretamente')
        }

    }



    if (data == null) {
        return (
            <View style={styles.container}>
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
                <View style={styles.container}>
                    <TextInput style={styles.inputEmail} placeholderTextColor='#1F2D3D' placeholder='Email' onChangeText={setEmail} value={email} />
                    <TextInput style={styles.inputSenha} placeholderTextColor='#1F2D3D' placeholder='Senha' secureTextEntry={true} onChangeText={setPassword} value={password} />
                    <TouchableOpacity onPress={() => this.authentication()} style={styles.buttom}>
                        <Text style={styles.textButom}>Entrar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => { }} style={{ alignItems: 'center' }}>
                        <Text style={{ marginTop: 20, fontSize: 18, color: '#8190A5', height: 60 }}>Esqueceu sua senha?</Text>
                    </TouchableOpacity>

                </View>
            </View>
        )

    }


}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFF'
    },
    header: {
        justifyContent: "center"
    },
    textHeader: {
        color: '#47525E',
        fontSize: 28,
        textAlign: "center",
        fontWeight: "300",
        fontFamily: 'Roboto-Medium',
    },
    inputEmail: {
        marginHorizontal: 1,
        fontSize: 17,
        color: "#8190A5",
        borderColor: '#8492A6',
        borderWidth: 0.5,
    },
    inputSenha: {
        marginHorizontal: 1,
        fontSize: 17,
        color: "#8190A5",
        borderColor: '#8492A6',
        borderWidth: 0.5,
        marginTop: 15
    },
    buttom: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        marginTop: 40,
        borderRadius: 8,
        backgroundColor: "#57D799"
    },
    textButom: {
        color: 'white',
        fontSize: 18,
        fontFamily: 'Roboto-Medium',
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
        fontFamily: 'Roboto-Medium'
    }

})
export default Login