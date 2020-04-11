import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, Text, TouchableOpacity, Alert, AsyncStorage } from 'react-native';
import moment from 'moment';
import { ScrollView } from 'react-native-gesture-handler';
import api from '../services/api';


export default function DetalhesFamilia({ navigation }) {
    const [nomeInstituicao, setNomeInstituicao] = useState('');
    const item = navigation.getParam('item');
    const date = new Date();

    useEffect(() => {
        async function getNomeInstituicao() {
            try {
                const nome = JSON.parse(await AsyncStorage.getItem('@nomeInstituicao'));
                //console.log(nome);
                setNomeInstituicao(nome);
            } catch (error) {
                console.log(error)
            }
        };
        getNomeInstituicao()
    }, [])

    /**
     * esta função exibe um alert para o usuário confirmar a doação da cesta.
     */
    function confirmDonation() {
        Alert.alert(
            'Atenção',
            'Para doar a Cesta para esta família clique em CONFIRMAR, senão clique em cancelar.',
            [
                { text: 'CANCELAR', onPress: () => console.log('Cancel Pressed') },
                { text: 'CONFIRMAR', onPress: () => console.log('Doar Cesta') },
            ]
        )
    }

    /**
     * esta função faz adiciona uma cesta no array de cestas.
     */
    async function donation() {
        try {
            const response = await api.post('/data/update_cesta', {
                //Guilherme, como eu nao sabia os parâmetros certos montei igual vc me mandou no whats
                nomeInstituicao: nomeInstituicao, //nome da instituição que vem do AsyncStorage.
                data: moment(date).format('YYYY-MM-DD') //data do dia de hoje que a cesta está sendo doada.
            })

            console.log(response);//falta testar a api // por favor testar hoje.
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <ScrollView>
            <View style={styles.principal}>
                <Text style={styles.h1}>Dados Básicos</Text>
                <View style={styles.container}>
                    <View style={styles.row}>
                        <Text style={styles.titulo}>Última Cesta:</Text>
                        <Text>
                            {
                                item.dataCestas.length > 0 ?
                                    moment(item.dataCestas[item.dataCestas.length - 1].data).format("DD/MM/YYYY")
                                    : <Text style={{ color: "red" }}>Ainda não receberam</Text>
                            }
                        </Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={styles.titulo}>Renda Percapita:</Text>
                        <Text>{"R$ " + item.rendaPercapita}</Text>
                    </View>
                    <View style={[styles.row, { marginBottom: 20 }]}>
                        <Text style={styles.titulo}>Endereço:</Text>
                        <Text>{item.endereco.rua + ", " + (item.endereco.numero != null ? item.endereco.numero : 'sem número') + ", "
                                   /*  + item.endereco.complemento  + ", "*/ + item.endereco.bairro}</Text>
                    </View>
                </View>
            </View>
            <View style={styles.principal}>
                <TouchableOpacity style={styles.submitButton} onPress={() => confirmDonation()}>
                    <Text style={styles.submitButtonText}>Doar Cesta</Text>
                </TouchableOpacity>
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
                                    <Text style={styles.titulo}>Nome Completo:</Text>
                                    <Text>{item.nomeCompleto}</Text>
                                </View>
                                <View style={styles.row}>
                                    <Text style={styles.titulo}>CPF:</Text>
                                    <Text>{item.cpf}</Text>
                                </View>
                                <View style={[styles.row, { marginBottom: 20 }]}>
                                    <Text style={styles.titulo}>Data de Nascimento:</Text>
                                    <Text>{moment(item.dataNascimento).format("DD/MM/YYYY")}</Text>
                                </View>
                            </View>
                        }
                    />
                </View>
            </View>
        </ScrollView>
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
        backgroundColor: '#272936',
        borderWidth: 0,
        borderRadius: 4,
        padding: 16,
        alignItems: 'center',
        marginBottom: 10
    },

    submitButtonText: {
        fontWeight: 'bold',
        color: '#fff',
        fontSize: 15,
    },

})