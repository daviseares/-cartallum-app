import React, { useEffect, useState, useRef } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Alert,
    SafeAreaView,
    ScrollView,
    FlatList
} from 'react-native';
import { TextInputMask } from 'react-native-masked-text';
import { MaterialIcons } from '@expo/vector-icons';
import Card from '../components/Card';
import api from '../services/api';

function Main({ navigation }) {
    const [dataFamilia, setDataFamilia] = useState(null);
    const [isVisible, setIsVisible] = useState(false);
    const [isvalue, setIsValue] = useState('');
    const [isErro, setErro] = useState('');
    const [isBusca, setBusca] = useState(false);

    useEffect(() => {
       
        getAllFamilias()
    }, []);

    async function getAllFamilias() {
        try {
            const response = await api.get('data/get_familia');
            console.log("response",response)
            if (response.data.success) {
                setDataFamilia(response.data.familia);
                const timer = setTimeout(() => {
                    setIsVisible(true)
                }, 500);
                return () => clearTimeout(timer);

            }
        } catch (error) {
            setErro('Erro ao carrega familias')
        }

    }

    function limparTex() {
        if (isBusca) {
            setIsVisible(false)
            setIsValue('')
            setErro('')
            getAllFamilias()
            setBusca(false)
        } else {
            setIsValue('')
        }

    }

    async function buscarFamilia() {

        if (isvalue.length > 12) {
            setIsVisible(false)
            try {
                const response = await api.post('data/busca_familia', {
                    cpf: isvalue
                })

                if (response.data.length > 0) {
                    setDataFamilia(response.data);
                    const timer = setTimeout(() => {
                        setIsVisible(true)
                    }, 1000);

                    return () => clearTimeout(timer);
                } else {
                    setErro('Nenhuma família foi encontrada')
                }


                setBusca(true)
            } catch (error) {
                setErro('Erro! Não foi possivel encontrar integrante/familía')
                getAllFamilias()
                setBusca(false)
                console.log(error)
            }
        } else {
            Alert.alert('Insira um CPF válido e tente novamente')
        }

    }


    return (
        <SafeAreaView>
            <ScrollView style={styles.scroll}>
                <TouchableOpacity
                    style={styles.cadastrar}
                    onPress={() => navigation.navigate("CadastrarFamilia")}
                >
                    <Text style={styles.txtCadastrar}>Cadastrar Nova Família </Text>
                    <MaterialIcons name="chevron-right" size={30} color="#272936" />
                </TouchableOpacity>
                <View style={styles.cardContainer}>
                    {
                        isErro ?
                            <View style={styles.loading}>
                                <Text>{isErro}</Text>
                            </View>
                            :

                            < FlatList
                                style={styles.flatlist}
                                data={dataFamilia}
                                extraData={dataFamilia}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={({ item }) =>
                                    <TouchableOpacity onPress={() => navigation.navigate('DetalhesFamilia', { item: item })}>
                                        <Card item={item} isVisible={isVisible} />
                                    </TouchableOpacity>

                                }
                            />
                    }
                </View>
                <View style={styles.searchForm}>
                    <View style={styles.searchInput}>
                        <TextInputMask
                            style={{ flex: 1 }}
                            type={'cpf'}
                            value={isvalue}
                            placeholderTextColor="#666"
                            placeholder="Busque uma família por CPF.."
                            onChangeText={setIsValue}
                        />
                        <View>
                            {
                                isvalue.length > 0 ?
                                    <MaterialIcons name="close" size={20} color="#000" onPress={limparTex} />
                                    :
                                    <></>
                            }
                        </View>
                    </View>
                    <TouchableOpacity onPress={buscarFamilia}
                        style={styles.loadButton}>
                        <MaterialIcons name="search" size={30} color="#fff" />
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    loading: {

        marginTop: 50,
        alignSelf: 'center'

    },
    scroll: {

    },
    cadastrar: {
        borderRadius: 25,
        backgroundColor: "#fff",
        marginTop: 20,
        marginLeft: 20,
        marginRight: 20,
        paddingHorizontal: 20,
        paddingVertical: 10,
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowOffset: {
            width: 4,
            height: 4,
        },
        elevation: 3,
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row"
    },
    txtCadastrar: {
        fontSize: 16,
        color: "#333",
    },
    cardContainer: {
        marginTop: 80,
        marginHorizontal: 20,
        height: "100%"
    },
    searchForm: {
        position: "absolute",
        top: 95,
        left: 20,
        right: 20,
        zIndex: 10,
        flexDirection: "row",
    },
    searchInput: {
        flexDirection: 'row',
        flex: 1,
        height: 50,
        alignItems: 'center',
        backgroundColor: "#fff",
        color: "#333",
        borderRadius: 25,
        paddingHorizontal: 20,
        fontSize: 20,
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowOffset: {
            width: 4,
            height: 4,
        },
        elevation: 3,
    },
    loadButton: {
        width: 50,
        height: 50,
        backgroundColor: "#272936",
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 15
    },
    limparBusca: {
        position: "absolute",
        top: 150,
        left: 90,
        right: 100,
        borderRadius: 25,
        backgroundColor: "red",
        alignItems: 'center',
        fontSize: 18,
    },
    flatlist: {
        marginTop: 25,
    },
})

export default Main;