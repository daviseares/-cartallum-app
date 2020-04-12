import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, Text, TouchableOpacity, Alert, AsyncStorage, Platform } from 'react-native';
import moment from 'moment';
import Icon from '@expo/vector-icons/FontAwesome';
import Arrow from '@expo/vector-icons/Feather';
import { ScrollView } from 'react-native-gesture-handler';
import api from '../services/api';
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';
import { familiaAll } from '../store/actions/actionFamilia';
import { connect } from "react-redux";


 function DetalhesFamilia({ navigation,familiaAll }) {

    const [isVisible, setIsVisible] = useState(false);
    const [instituicao, setInstituicao] = useState({});
    const [item, setItem] = useState(navigation.getParam('item'))
    //const item = navigation.getParam('item');
    const screen = navigation.getParam('screen');

    const date = new Date();

    useEffect(() => {
        if (screen != undefined) {
            Alert.alert("Família cadastrada com sucesso!");
        }
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

    return (
        <>

            <View style={styles.toolbar}>
                {Platform.OS == 'ios' ?
                    <Icon name="angle-left" size={38} color="#fff"
                        style={styles.toolbarIcon}
                        onPress={() => navigation.navigate('Main')}
                    />
                    :
                    <Arrow name="arrow-left" size={25} color="#fff"
                        style={styles.toolbarIcon}
                        onPress={() => navigation.navigate('Main')}
                    />
                }
                <Text style={styles.txtToolbar}>Detalhes</Text>
            </View>
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
                                            Recebida em {moment(item.dataCestas[item.dataCestas.length - 1].data).format("DD/MM/YYYY")}
                                        </Text>
                                        : <Text style={{ color: "red" }}>Ainda não receberam</Text>
                                }
                            </ShimmerPlaceHolder>
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
                        item.dataCestas.length > 0 && (
                            moment(date).format('MM/YYYY') == moment(item.dataCestas[item.dataCestas.length - 1].data).format("MM/YYYY") || moment(date).format('MM/YYYY') < moment(item.dataCestas[item.dataCestas.length - 1].data).format("MM/YYYY")) ?
                            <View style={[styles.submitButton, { backgroundColor: '#999' }]} onPress={() => confirmDonation()}>
                                <Text style={[styles.submitButtonText, { color: '#272936' }]}>Doar Cesta</Text>
                            </View>
                            :
                            <TouchableOpacity style={[styles.submitButton, { backgroundColor: '#272936' }]} onPress={() => confirmDonation()}>
                                <Text style={[styles.submitButtonText, { color: '#fff' }]}>Doar Cesta</Text>
                            </TouchableOpacity>


                    }

                </View>
                <View style={[styles.principal, { marginBottom: 50 }]}>
                    <Text style={styles.h1}>Integrantes da Família</Text>
                    <View style={styles.container}>
                        <FlatList
                            style={styles.flatlist}
                            data={item.integrantes}
                            extraData={item.integrantes}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item, index }) =>
                                <View>
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
                                    <View style={[styles.row, { marginBottom: 20 }]}>
                                        <ShimmerPlaceHolder autoRun={true} visible={isVisible} width={130} style={{ marginRight: 10 }}>
                                            <Text style={styles.titulo}>Data de Nascimento:</Text>
                                        </ShimmerPlaceHolder>
                                        <ShimmerPlaceHolder autoRun={true} visible={isVisible} width={100}>
                                            <Text>{moment(item.dataNascimento).format("DD/MM/YYYY")}</Text>
                                        </ShimmerPlaceHolder>
                                    </View>
                                </View>
                            }
                        />
                    </View>
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
    toolbar: {
        height: Platform.OS == 'ios' ? 88 : 55,
        backgroundColor: '#272936',
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: Platform.OS == 'ios' ? "center" : "flex-start"
    },
    toolbarIcon: {
        position: "absolute",
        bottom: Platform.OS == 'ios' ? 2 : 12,
        left: Platform.OS == 'ios' ? 7 : 15,
    },
    txtToolbar: {
        fontSize: 20,
        color: "#fff",
        fontWeight: "500",
        marginBottom: Platform.OS == 'ios' ? 8 : 12,
        marginLeft: Platform.OS == 'ios' ? 0 : 80
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