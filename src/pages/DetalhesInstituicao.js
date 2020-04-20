import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, Text, SafeAreaView } from 'react-native';
import Toolbar from '../components/Toolbar';
import * as parse from '../components/Parse';
import api from '../services/api';
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';
import { ScrollView } from 'react-native-gesture-handler';
import data from '../data/instituicoesPreview.json';

export default function DetalhesInstituicao({ navigation }) {
    const [listaInstituicao, setListaInstituicao] = useState(data);
    const [isVisible, setIsVisible] = useState(true);




    async function getListaInstituicao() {
        setIsVisible(false)
        try {
            const response = await api.get('instituicao/listarInstituicao')

            console.log(response);
            setListaInstituicao(response.data.instituicao);

            const timer = setTimeout(() => {
                setIsVisible(true)
            }, 1000);

            return () => clearTimeout(timer);

        } catch (error) {

            parse.showToast("Erro, tente novamente!");
            console.log("Error", error)
        }
    }

    function goBack() {
        navigation.goBack();
    }
    useEffect(() => {
        navigation.addListener('willFocus', () => {
            console.log("is focused")
            getListaInstituicao()
        });
        console.log("chama user effect")
        getListaInstituicao();
        //add evento de focus
        //getListaInstituicao();

    }, [])



    return (
        <View style={styles.principal}>
            <Toolbar
                title="Instituições"
                navigation={() => goBack()}
            />
            <ScrollView>
                <FlatList
                    style={styles.flatlist}
                    data={listaInstituicao}
                    extraData={listaInstituicao}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) =>
                        <View style={[styles.card]}>
                            <View style={styles.row}>
                                <ShimmerPlaceHolder autoRun={true} visible={isVisible} width={100} style={{ marginRight: 10 }}>
                                    <Text style={styles.titulo}>Nome:</Text>
                                </ShimmerPlaceHolder>
                                <ShimmerPlaceHolder autoRun={true} visible={isVisible} width={140}>
                                    <Text>{item.nomeInstituicao}</Text>
                                </ShimmerPlaceHolder>
                            </View>
                            <View style={styles.row}>
                                <ShimmerPlaceHolder autoRun={true} visible={isVisible} width={50} style={{ marginRight: 10 }}>
                                    <Text style={styles.titulo}>Email:</Text>
                                </ShimmerPlaceHolder>
                                <ShimmerPlaceHolder autoRun={true} visible={isVisible} width={130}>
                                    <Text>{item.email}</Text>
                                </ShimmerPlaceHolder>
                            </View>
                            {item.telefone !== '' ?
                                <View style={[styles.row]}>


                                    <ShimmerPlaceHolder autoRun={true} visible={isVisible} width={100} style={{ marginRight: 10 }}>
                                        <Text style={styles.titulo}>Telefone:</Text>
                                    </ShimmerPlaceHolder>
                                    <ShimmerPlaceHolder autoRun={true} visible={isVisible} width={100}>
                                        <Text>{item.telefone}</Text>
                                    </ShimmerPlaceHolder>
                                </View>
                                :
                                null
                            }
                            <View style={styles.row}>
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
                    }
                />
            </ScrollView>
        </View>
    );
}
const styles = StyleSheet.create({
    principal: {
        flex: 1,
    },
    txtTitle: {
        fontSize: 20,
        marginHorizontal: 20,
    },

    card: {
        marginBottom: 25,
        marginHorizontal: 25,
        backgroundColor: "#fff",
        paddingVertical: 25,
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
        paddingVertical: 25,

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
    error: {
        marginBottom: 15,
        marginTop: -15,
        color: "red"
    }
});