import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function Card({ item, isVisible, navigation }) {


    return (
        <>
            <View style={styles.principal} >

                <View style={styles.row}>
                    <ShimmerPlaceHolder autoRun={true} visible={isVisible} width={90} style={{ marginRight: 10 }}>
                        <Text style={styles.titulo}>Última Cesta:</Text>
                    </ShimmerPlaceHolder>
                    <ShimmerPlaceHolder autoRun={true} visible={isVisible} width={90}>
                        {
                            item.dataCestas.length > 0 ?
                                <Text style={{ color: "green" }}>
                                    Recebida em {item.dataCestas[item.dataCestas.length - 1].data}
                                </Text>

                                : <Text style={{ color: "red" }}>Ainda não receberam</Text>
                        }
                    </ShimmerPlaceHolder>
                </View>
                <View style={styles.row}>
                    <ShimmerPlaceHolder autoRun={true} visible={isVisible} width={100} style={{ marginRight: 10 }}>
                        <Text style={styles.titulo}>Responsavel:</Text>
                    </ShimmerPlaceHolder>
                    <ShimmerPlaceHolder autoRun={true} visible={isVisible} width={140}>
                        {item.integrantes.length > 0 && (
                            <Text>{item.integrantes[0].nomeCompleto}</Text>
                        )}

                    </ShimmerPlaceHolder>
                </View>
                <View style={styles.row}>
                    <ShimmerPlaceHolder autoRun={true} visible={isVisible} width={100} style={{ marginRight: 10 }}>
                        <Text style={styles.titulo}>Quantidade de pessoas:</Text>
                    </ShimmerPlaceHolder>
                    <ShimmerPlaceHolder autoRun={true} visible={isVisible} width={60}>
                        <Text>{item.integrantes.length}</Text>
                    </ShimmerPlaceHolder>
                </View>
                <View style={styles.row}>
                    <ShimmerPlaceHolder autoRun={true} visible={isVisible} width={100} style={{ marginRight: 10 }}>
                        <Text style={styles.titulo}>Renda Familiar:</Text>
                    </ShimmerPlaceHolder>
                    <ShimmerPlaceHolder autoRun={true} visible={isVisible} width={60}>
                        <Text>{"R$ " + (item.rendaPercapita).toLocaleString('pt-BR')}</Text>
                    </ShimmerPlaceHolder>
                </View>
                {item.integrantes[0].telefone !== '' && item.integrantes[0].telefone ?
                    <View style={styles.row}>
                        <ShimmerPlaceHolder autoRun={true} visible={isVisible} width={100} style={{ marginRight: 10 }}>
                            <Text style={styles.titulo}>Telefone:</Text>
                        </ShimmerPlaceHolder>
                        <ShimmerPlaceHolder autoRun={true} visible={isVisible} width={100}>
                            <Text>{item.integrantes[0].telefone}</Text>
                        </ShimmerPlaceHolder>
                    </View>
                    : null
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
                <TouchableOpacity onPress={() => navigation.navigate('DetalhesFamilia', { item: item })}>
                    <View style={styles.verMais}>
                        <Text style={styles.txtDetalhes}>VER DETALHES</Text>
                        <Icon name="chevron-right" size={30} color="#272936" />
                    </View>
                </TouchableOpacity>
            </View>
        </>
    );
}
const styles = StyleSheet.create({
    principal: {
        marginBottom: 25,
        marginHorizontal: 5,
        backgroundColor: "#fff",
        paddingTop: 25,
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
    row: {
        flexDirection: "row",
        marginVertical: 5,
        flexWrap: "wrap"
    },
    titulo: {
        fontWeight: "bold",
        marginRight: 5
    },
    verMais: {
        marginTop: 20,
        paddingVertical: 15,
        borderTopWidth: 1,
        borderTopColor: '#272936',
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: "space-between"
    },
    txtDetalhes: {
        //marginTop: 20
    }

})