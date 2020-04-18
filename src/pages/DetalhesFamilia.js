import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, Text, TouchableOpacity, Alert, AsyncStorage, Platform } from 'react-native';
import moment from 'moment';
import { ScrollView } from 'react-native-gesture-handler';
import api from '../services/api';
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';
import { familiaAll } from '../store/actions/actionFamilia';
import { connect } from "react-redux";
import Toolbar from '../components/Toolbar';


function DetalhesFamilia({ navigation, familiaAll }) {

    const [isVisible, setIsVisible] = useState(false);
    const [instituicao, setInstituicao] = useState({});
    const [item, setItem] = useState(navigation.getParam('item'))

    //serve para sabe se a família foi cadastrada
    const screen = navigation.getParam('screen');

    const date = new Date();

    useEffect(() => {
        //vericação se veio da tela cadastrar família
        if (screen != undefined) {
            Alert.alert("Família cadastrada com sucesso!");
        }

        /**
         * função para capturar instituição do async storage
         */
        async function getInstituicao() {
            try {

                const instituição = JSON.parse(await AsyncStorage.getItem('@instituicao'));


                setInstituicao(instituição);
            } catch (error) {
                console.log(error)
            }
        };
        getInstituicao()

        const timer = setTimeout(() => {
            setIsVisible(true)
        }, 1000);
        return () => clearTimeout(timer);

    }, [])

    /**
     * esta função exibe um alert para o usuário confirmar a doação da cesta.
     */
    function confirmDonation() {
        Alert.alert(
            'Atenção',
            'Para doar a Cesta para esta família clique em CONFIRMAR, senão clique em cancelar.',
            [
                { text: 'CANCELAR', onPress: () => { } },
                { text: 'CONFIRMAR', onPress: () => donation() },
            ]
        )
    }

    /**
     * esta função faz adiciona uma cesta no array de cestas.
     */
    async function donation() {
        try {
            const response = await api.post('data/update_cesta', {
                id: item._id, //id que vem do item no params.
                cesta: [
                    {
                        nomeInstituicao: instituicao.nomeInstituicao,
                        data: moment().format('DD/MM/YYYY')
                    }
                ]
            })
            setItem(response.data.familia[0])
            familiaAll()
            Alert.alert("Sua cesta foi doada com sucesso! Agradecemos sua doação.")
        } catch (error) {
            console.log(error)
        }
    }

    console.log('item', item);

    return (
        <>
            <Toolbar
                title="Detalhes"
                navigation={() => navigation.navigate('Main')}
            />
            <ScrollView>
                <View style={styles.principal}>
                    <Text style={styles.h1}>Dados Básicos</Text>
                    <View style={styles.container}>
                        <View style={styles.row}>

                            <ShimmerPlaceHolder autoRun={true} visible={isVisible} width={90} style={{ marginRight: 10 }}>
                                <Text style={styles.titulo}>Última Cesta:</Text>
                            </ShimmerPlaceHolder>
                            <ShimmerPlaceHolder autoRun={true} visible={isVisible} width={90}>
                                {
                                    item.dataCestas.length > 0 && item.dataCestas != undefined ?
                                        <Text style={{ color: "green" }}>
                                            Recebida em {item.dataCestas[item.dataCestas.length - 1].data}
                                        </Text>
                                        : <Text style={{ color: "red" }}>Ainda não receberam</Text>
                                }
                            </ShimmerPlaceHolder>
                        </View>
                        <View style={styles.row}>
                            {item.dataCestas.length > 0 && item.dataCestas != undefined ?
                                <>
                                    <ShimmerPlaceHolder autoRun={true} visible={isVisible} width={100} style={{ marginRight: 10 }}>
                                        <Text style={styles.titulo}>Doada por:</Text>
                                    </ShimmerPlaceHolder>
                                    <ShimmerPlaceHolder autoRun={true} visible={isVisible} width={60}>
                                        <Text>{item.dataCestas[item.dataCestas.length - 1].nomeInstituicao}</Text>
                                    </ShimmerPlaceHolder>
                                </>
                                : null
                            }

                        </View>
                        <View style={styles.row}>
                            <ShimmerPlaceHolder autoRun={true} visible={isVisible} width={100} style={{ marginRight: 10 }}>
                                <Text style={styles.titulo}>Renda Percapita:</Text>
                            </ShimmerPlaceHolder>
                            <ShimmerPlaceHolder autoRun={true} visible={isVisible} width={60}>
                                <Text>{"R$ " + item.rendaPercapita}</Text>
                            </ShimmerPlaceHolder>
                        </View>
                        <View style={[styles.row, { marginBottom: 20 }]}>
                            <ShimmerPlaceHolder autoRun={true} visible={isVisible} width={100} style={{ marginRight: 10 }}>
                                <Text style={styles.titulo}>Endereço:</Text>
                            </ShimmerPlaceHolder>
                            <ShimmerPlaceHolder autoRun={true} visible={isVisible} height={30} width={280} style={{ marginTop: 10 }}>
                                <Text>{item.endereco.rua + ", " +
                                    (item.endereco.numero != null ? item.endereco.numero : 's/n') + ", " +
                                    (item.endereco.complemento !== "" && item.endereco.complemento !== undefined ?
                                        item.endereco.complemento + ", " : '') + item.endereco.bairro}
                                </Text>
                            </ShimmerPlaceHolder>
                        </View>
                    </View>
                </View>
                <View style={styles.principal}>
                    {
                        /* item.dataCestas.length > 0 && (
                            moment(date).format('MM/YYYY') == moment(item.dataCestas[item.dataCestas.length - 1].data).format("MM/YYYY") || moment(date).format('MM/YYYY') < moment(item.dataCestas[item.dataCestas.length - 1].data).format("MM/YYYY")) ?
                            <View style={[styles.submitButton, { backgroundColor: '#999' }]} onPress={() => confirmDonation()}>
                                <Text style={[styles.submitButtonText, { color: '#272936' }]}>Doar Cesta</Text>
                            </View>
                            : */
                        <TouchableOpacity style={[styles.submitButton, { backgroundColor: '#272936' }]} onPress={() => confirmDonation()}>
                            <Text style={[styles.submitButtonText, { color: '#fff' }]}>Doar Cesta</Text>
                        </TouchableOpacity>


                    }

                </View>
                <View style={[styles.principal, { marginBottom: 50 }]}>
                    <Text style={styles.h1}>Integrantes da Família</Text>

                    <FlatList
                        style={styles.flatlist}
                        data={item.integrantes}
                        extraData={item.integrantes}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item, index }) =>
                            <View style={[styles.container, { marginBottom: 30 }]}>
                                <View style={styles.row}>
                                    <ShimmerPlaceHolder autoRun={true} visible={isVisible} width={100} style={{ marginRight: 10 }}>
                                        <Text style={styles.titulo}>Nome Completo:</Text>
                                    </ShimmerPlaceHolder>
                                    <ShimmerPlaceHolder autoRun={true} visible={isVisible} width={140}>
                                        <Text>{item.nomeCompleto}</Text>
                                    </ShimmerPlaceHolder>
                                </View>
                                <View style={styles.row}>
                                    <ShimmerPlaceHolder autoRun={true} visible={isVisible} width={50} style={{ marginRight: 10 }}>
                                        <Text style={styles.titulo}>CPF:</Text>
                                    </ShimmerPlaceHolder>
                                    <ShimmerPlaceHolder autoRun={true} visible={isVisible} width={130}>
                                        <Text>{item.cpf}</Text>
                                    </ShimmerPlaceHolder>
                                </View>
                                <View style={[styles.row]}>
                                    <ShimmerPlaceHolder autoRun={true} visible={isVisible} width={130} style={{ marginRight: 10 }}>
                                        <Text style={styles.titulo}>Data de Nascimento:</Text>
                                    </ShimmerPlaceHolder>
                                    <ShimmerPlaceHolder autoRun={true} visible={isVisible} width={100}>
                                        <Text>{moment(item.dataNascimento).format("DD/MM/YYYY")}</Text>
                                    </ShimmerPlaceHolder>
                                </View>
                                <View style={[styles.row, { marginBottom: 20 }]}>
                                    <ShimmerPlaceHolder autoRun={true} visible={isVisible} width={100} style={{ marginRight: 10 }}>
                                        <Text style={styles.titulo}>Telefone:</Text>
                                    </ShimmerPlaceHolder>
                                    <ShimmerPlaceHolder autoRun={true} visible={isVisible} width={100}>
                                        <Text></Text>
                                    </ShimmerPlaceHolder>
                                </View>
                            </View>
                        }
                    />
                </View>

            </ScrollView >

        </>

    );
}
const styles = StyleSheet.create({
    principal: {
        marginTop: 25,
        marginHorizontal: 25,
    },
    container: {
        backgroundColor: "#fff",
        paddingTop: 20,
        paddingBottom: 10,
        paddingHorizontal: 20,
        borderRadius: 15,
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowOffset: {
            width: 4,
            height: 4,
        },
        elevation: 3,
    },
    flatlist: {


    },
    row: {
        flexDirection: "row",
        marginVertical: 5,
        flexWrap: "wrap"
    },
    titulo: {
        fontWeight: "bold",
        marginRight: 5
    },
    h1: {
        fontWeight: "bold",
        fontSize: 18,
        alignSelf: "center",
        marginBottom: 15
    },
    submitButton: {

        borderWidth: 0,
        borderRadius: 4,
        padding: 16,
        alignItems: 'center',
        marginBottom: 10
    },

    submitButtonText: {
        fontWeight: 'bold',

        fontSize: 15,
    },

})

const mapStateToProps = state => {
    return {

    };
};

const mapDispatchToProps = dispatch => ({
    familiaAll: () => dispatch(familiaAll())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DetalhesFamilia);