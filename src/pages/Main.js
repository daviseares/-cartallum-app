import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    TextInput,
    FlatList,
} from 'react-native';
import RadioForm, {
    RadioButton,
    RadioButtonInput,
    RadioButtonLabel
} from 'react-native-simple-radio-button';
import { TextInputMask } from 'react-native-masked-text';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Card from '../components/Card';
import api from '../services/api';
import { connect } from "react-redux";
import { familiaAll, familiaFilter } from '../store/actions/actionFamilia';
import Toolbar from '../components/Toolbar';
import * as parse from '../components/Parse';


const radio_props = [
    { label: 'Nome', value: 0 },
    { label: 'CPF', value: 1 }
]

function Main({ navigation, listaFamilia, familiaAll, familiaFilter, instituicao }) {
    const [searchOption, setSearchOption] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const [isvalue, setIsValue] = useState('');
    const [isBusca, setBusca] = useState(false);
    const [isErro, setErro] = useState(false);


    useEffect(() => {

        navigation.addListener('willFocus', () => {
            console.log("is focused")
            setIsValue('')
            getAllFamilias();
        });
        getAllFamilias();

    }, []);

    async function getAllFamilias() {
        console.log("teste")
        try {
            await familiaAll()
            const timer = setTimeout(() => {
                setIsVisible(true)
            }, 500);
            return () => clearTimeout(timer);

        } catch (error) {
            console.log(error)
            parse.showToast("Não foi possível carregar famílias. Tente novamente.");
        }

    }

    /**
     * 
     * @param {String} value 
     */
    function changeValue(value) {
        if (value.length == 0) {
            limpartText();
        }
        setIsValue(value);
    }

    /**
     * 
     */
    function limpartText() {
        setErro(false)
        if (isBusca) {
            setIsVisible(false)
            setIsValue('')
            getAllFamilias()
            setBusca(false)
        } else {
            setIsValue('')
        }

    }
    console.log(instituicao)
    /**
     * função para filtrar uma família específica
     */
    async function buscarFamilia() {

        if (isvalue.length < 12 && searchOption === 1) {
            parse.showToast("CPF incompleto, tente novamente");
        }
        else if (isvalue !== '') {
            setIsVisible(false)
            try {
                const response = await api.post('data/busca_familia', {
                    nomeCompleto: searchOption == 0 ? isvalue : '',
                    cpf: searchOption == 1 ? isvalue : ''
                })
                console.log('response', response);

                if (parse.isSuccess(response.data)) {

                    familiaFilter(response.data.familia);
                    setBusca(true);

                    const timer = setTimeout(() => {
                        setIsVisible(true)
                    }, 1000);

                    return () => clearTimeout(timer);

                } else {
                    setIsVisible(true)
                    parse.showToast("Nenhuma família encontrada.");
                    setErro(true)
                }



            } catch (error) {
                getAllFamilias()
                setBusca(false)
                console.log(error)
            }
        }
    }



    return (
        <>
            <Toolbar
                title="Família Alegre"
                navigation={() => navigation.toggleDrawer()}
                menu={true}
            />

            <ScrollView style={styles.scrollView}>
                {/*  <TouchableOpacity
                    style={styles.cadastrar}
                    onPress={() => navigation.navigate('CadastrarFamilia')}
                >
                    <Text style={styles.txtCadastrar}>Cadastrar Nova Família </Text>
                    <Icon name="chevron-right" size={30} color="#272936" />
                </TouchableOpacity> */}

                <View style={styles.segment}>
                    <Text style={styles.txtCadastrar}> Buscar por:</Text>
                    <View style={{ marginBottom: -5 }}>
                        <RadioForm
                            formHorizontal={true}
                            animation={true}
                        >
                            {
                                radio_props.map((obj, i) => (
                                    <RadioButton labelHorizontal={true} key={i} >
                                        {/*  You can set RadioButtonLabel before RadioButtonInput */}
                                        <RadioButtonInput
                                            obj={obj}
                                            index={i}
                                            isSelected={searchOption === i}
                                            onPress={(value) => setSearchOption(value)}
                                            borderWidth={1}
                                            buttonInnerColor={'#272936'}
                                            buttonOuterColor={'#272936'}
                                            buttonSize={17}
                                            buttonOuterSize={25}
                                            buttonStyle={{}}
                                            buttonWrapStyle={{ marginLeft: 10 }}
                                        />
                                        <RadioButtonLabel
                                            obj={obj}
                                            index={i}
                                            labelHorizontal={true}
                                            onPress={(value) => setSearchOption(value)}
                                            labelStyle={{ fontSize: 16, color: '#272936' }}
                                            labelWrapStyle={{}}
                                        />
                                    </RadioButton>
                                ))
                            }
                        </RadioForm>
                    </View>
                </View>
                <View style={styles.cardContainer}>
                    {
                        (!isErro) &&
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
                        {searchOption === 0 ?
                            <TextInput
                                style={{ flex: 1 }}
                                autoCapitalize="words"
                                value={isvalue}
                                keyboardType="default"
                                placeholderTextColor="#666"
                                placeholder="Busque uma família por Nome.."
                                onChangeText={(value) => changeValue(value)}
                            /> :
                            <TextInputMask
                                style={{ flex: 1 }}
                                type={'cpf'}
                                value={isvalue}
                                placeholderTextColor="#666"
                                placeholder="Busque uma família por CPF.."
                                onChangeText={(value) => changeValue(value)}
                            />
                        }

                        <View>
                            {
                                isvalue.length > 0 ?
                                    <Icon name="close" size={20} color="#000" onPress={() => limpartText()} />
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
    segment: {
        borderRadius: 25,
        backgroundColor: "#fff",
        marginTop: 20,
        marginHorizontal: 20,
        paddingHorizontal: 20,
        paddingVertical: 11,
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
        top: 90,//160
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
        listaFamilia: state.reducerFamilia.listaFamilia,
        instituicao: state.reducerInstituicao.instituicao
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