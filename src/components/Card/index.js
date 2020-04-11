import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';
import moment from 'moment';

// import { Container } from './styles';

export default function Card({ item, isVisible }) {


    return (
        <>

            <View style={styles.principal} >
                <View style={styles.row}>
                    <ShimmerPlaceHolder autoRun={true} visible={isVisible} width={90} style={{ marginRight: 10 }}>
                        <Text style={styles.titulo}>Última Cesta:</Text>
                    </ShimmerPlaceHolder>
                    <ShimmerPlaceHolder autoRun={true} visible={isVisible} width={90}>
                        <Text>
                            {
                                item.dataCestas.length > 0 ?
                                    moment(item.dataCestas[item.dataCestas.length - 1].data).format("DD/MM/YYYY")
                                    : <Text style={{ color: "red" }}>Ainda não receberam</Text>
                            }
                        </Text>
                    </ShimmerPlaceHolder>
                </View>
                <View style={styles.row}>
                    <ShimmerPlaceHolder autoRun={true} visible={isVisible} width={100} style={{ marginRight: 10 }}>
                        <Text style={styles.titulo}>Responsavel:</Text>
                    </ShimmerPlaceHolder>
                    <ShimmerPlaceHolder autoRun={true} visible={isVisible} width={140}>
                        <Text>{item.integrantes[0].nomeCompleto}</Text>
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
                <View style={styles.row}>
                    <ShimmerPlaceHolder autoRun={true} visible={isVisible} width={100} style={{ marginRight: 10 }}>
                        <Text style={styles.titulo}>Endereço:</Text>
                    </ShimmerPlaceHolder>
                    <ShimmerPlaceHolder autoRun={true} visible={isVisible} height={30} width={280} style={{ marginTop: 10 }}>
                        <Text>{item.endereco.rua + ", " + (item.endereco.numero != null ? item.endereco.numero : 'sem número') + ", "
                                   /*  + item.endereco.complemento  + ", "*/ + item.endereco.bairro}</Text>
                    </ShimmerPlaceHolder>
                </View>
            </View>
        </>
    );
}
const styles = StyleSheet.create({
    principal: {
        marginBottom: 25,
        marginHorizontal: 5,
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
    row: {
        flexDirection: "row",
        marginVertical: 5,
        flexWrap: "wrap"
    },
    titulo: {
        fontWeight: "bold",
        marginRight: 5
    }

})