import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Alert,
    SafeAreaView,
    ScrollView,
    FlatList,
    TouchableHighlight
} from 'react-native';
import { TextInputMask } from 'react-native-masked-text';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Card from '../components/Card';
import api from '../services/api';
import { connect } from "react-redux";
import { familiaAll, familiaFilter } from '../store/actions/actionFamilia';
import SideMenu from 'react-native-side-menu';
import Menu from '../components/Menu';
import Toolbar from '../components/Toolbar';

function Main({ navigation, listaFamilia, familiaAll, familiaFilter }) {
    const [isOpen, setIsOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [isvalue, setIsValue] = useState('');
    const [isErro, setErro] = useState('');
    const [isBusca, setBusca] = useState(false);

    const menu = <Menu navigator={navigator} />;

    useEffect(() => {

        getAllFamilias();

    }, []);

    async function getAllFamilias() {
        try {
            await familiaAll()
            const timer = setTimeout(() => {
                setIsVisible(true)
            }, 500);
            return () => clearTimeout(timer);

        } catch (error) {
            console.log(error)
            setErro('Erro ao carrega familias')
        }

    }

    function limparTex() {
        console.log("fooooi", isBusca)
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
                console.log('response', response);
                if (response.data.length > 0) {

                    familiaFilter(response.data);
                    setBusca(true);

                    const timer = setTimeout(() => {
                        setIsVisible(true)
                    }, 1000);

                    return () => clearTimeout(timer);

                } else {
                    setErro('Nenhuma família foi encontrada')
                }



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
    function updateMenuState(isOpen) {
        console.log(isOpen);
    }


    return (
        <>
            <Toolbar
                title="Família Alegre"
                navigation={() => navigation.toggleDrawer()}
                menu={true}
            />
            <ScrollView style={styles.scrollView}>
                <TouchableOpacity
                    style={styles.cadastrar}
                    onPress={() => navigation.navigate('CadastrarFamilia')}
                >
                    <Text style={styles.txtCadastrar}>Cadastrar Nova Família </Text>
                    <Icon name="chevron-right" size={30} color="#272936" />
                </TouchableOpacity>
                <View style={styles.cardContainer}>
                    {
                        isErro ?
                            <View style={styles.loading}>
                                <Text>{isErro}</Text>
                            </View>
                            :

                            <FlatList
                                style={styles.flatlist}
                                data={listaFamilia}
                                extraData={listaFamilia}
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
                            onChangeText={(value) => setIsValue(value)}
                        />
                        <View>
                            {
                                isvalue.length > 0 ?
                                    <Icon name="close" size={20} color="#000" onPress={() => limparTex()} />
                                    :
                                    <></>
                            }
                        </View>
                    </View>
                    <TouchableOpacity onPress={buscarFamilia}
                        style={styles.loadButton}>
                        <Icon name="search" size={30} color="#fff" />
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </>
    )
}

const styles = StyleSheet.create({
    loading: {

        marginTop: 50,
        alignSelf: 'center'
    },
    scrollView: {
        backgroundColor: "#eee"
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
});

const mapStateToProps = state => {
    return {
        listaFamilia: state.reducerFamilia.listaFamilia
    };
};

const mapDispatchToProps = dispatch => ({
    familiaAll: () => dispatch(familiaAll()),
    familiaFilter: (value) => dispatch(familiaFilter(value))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Main);  