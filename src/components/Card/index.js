import React, { useState } from 'react';
import { View, StyleSheet, FlatList, Text } from 'react-native';
import moment from 'moment';

// import { Container } from './styles';

export default function Card({ data }) {
    const DATA = [
        {
            _id: "5e8a2a1e519ec509e06ccb1f",
            integrantes: [
                {
                    _id: "5e8a2a1e519ec509e06ccb20",
                    nomeCompleto: "Guilherme Dias Maria",
                    dataNascimento: "2020-04-05T00:00:00.000Z",
                    cpf: "741.523.856-89"
                },
                {
                    _id: "5e8a2a1e519ec509e06ccb21",
                    nomeCompleto: "Davi Borges Seares",
                    dataNascimento: "2020-02-01T00:00:00.000Z",
                    cpf: "852.652.877-89"
                },
                {
                    _id: "5e8a2a1e519ec509e06ccb22",
                    nomeCompleto: " 1",
                    dataNascimento: "2020-02-01T00:00:00.000Z",
                    cpf: "852.652.877-89"
                },
                {
                    _id: "5e8a2a1e519ec509e06ccb23",
                    nomeCompleto: "Filho 2",
                    dataNascimento: "2020-02-01T00:00:00.000Z",
                    cpf: "852.652.877-89"
                },
                {
                    _id: "5e8a2a1e519ec509e06ccb24",
                    nomeCompleto: "Filho 3",
                    dataNascimento: "2020-02-01T00:00:00.000Z",
                    cpf: "852.652.877-89"
                }
            ],
            rendaPercapita: 3563.85,
            endereco: {
                _id: "5e8a2a1e519ec509e06ccb25",
                rua: "Rua Sete de Setembro",
                bairro: "centro",
                complemento: "Ap 302",
                numero: 375,
                cep: "29500-000",
                cidade: "Alegre",
                estado: "ES",
                pais: "BR"
            },
            dataCestas: [
                {
                    _id: "5e8a2a1e519ec509e06ccb26",
                    nomeInstituicao: "Ajuda Todos Nos",
                    data: "2020-04-05T00:00:00.000Z"
                },
                {
                    _id: "5e8a2a1e519ec509e06ccb27",
                    nomeInstituicao: "Nos ja ajudamos",
                    data: "2020-05-05T00:00:00.000Z"
                }
            ],
            __v: 0
        },
        {
            _id: "5e8a2a1e519ec509e06ccb1f",
            integrantes: [
                {
                    _id: "5e8a2a1e519ec509e06ccb20",
                    nomeCompleto: "Davi Borges Seares",
                    dataNascimento: "2020-04-05T00:00:00.000Z",
                    cpf: "741.523.856-89"
                },
                {
                    _id: "5e8a2a1e519ec509e06ccb21",
                    nomeCompleto: "Guilherme Dias Maria",
                    dataNascimento: "2020-02-01T00:00:00.000Z",
                    cpf: "852.652.877-89"
                },
                {
                    _id: "5e8a2a1e519ec509e06ccb22",
                    nomeCompleto: " 1",
                    dataNascimento: "2020-02-01T00:00:00.000Z",
                    cpf: "852.652.877-89"
                },
                {
                    _id: "5e8a2a1e519ec509e06ccb23",
                    nomeCompleto: "Filho 2",
                    dataNascimento: "2020-02-01T00:00:00.000Z",
                    cpf: "852.652.877-89"
                },
                {
                    _id: "5e8a2a1e519ec509e06ccb24",
                    nomeCompleto: "Filho 3",
                    dataNascimento: "2020-02-01T00:00:00.000Z",
                    cpf: "852.652.877-89"
                }
            ],
            rendaPercapita: 3563.85,
            endereco: {
                _id: "5e8a2a1e519ec509e06ccb25",
                rua: "Rua Sete de Setembro",
                bairro: "centro",
                complemento: "Ap 302",
                numero: 375,
                cep: "29500-000",
                cidade: "Alegre",
                estado: "ES",
                pais: "BR"
            },
            dataCestas: [
                {
                    _id: "5e8a2a1e519ec509e06ccb26",
                    nomeInstituicao: "Ajuda Todos Nos",
                    data: "2020-04-05T00:00:00.000Z"
                },
                {
                    _id: "5e8a2a1e519ec509e06ccb27",
                    nomeInstituicao: "Nos ja ajudamos",
                    data: "2020-05-05T00:00:00.000Z"
                }
            ],
            __v: 0
        },
        {
            _id: "5e8a2a1e519ec509e06ccb1f",
            integrantes: [
                {
                    _id: "5e8a2a1e519ec509e06ccb20",
                    nomeCompleto: "Guilherme Dias Maria",
                    dataNascimento: "2020-04-05T00:00:00.000Z",
                    cpf: "741.523.856-89"
                },
                {
                    _id: "5e8a2a1e519ec509e06ccb21",
                    nomeCompleto: "Davi Borges Seares",
                    dataNascimento: "2020-02-01T00:00:00.000Z",
                    cpf: "852.652.877-89"
                },
                {
                    _id: "5e8a2a1e519ec509e06ccb22",
                    nomeCompleto: " 1",
                    dataNascimento: "2020-02-01T00:00:00.000Z",
                    cpf: "852.652.877-89"
                },
                {
                    _id: "5e8a2a1e519ec509e06ccb23",
                    nomeCompleto: "Filho 2",
                    dataNascimento: "2020-02-01T00:00:00.000Z",
                    cpf: "852.652.877-89"
                },
                {
                    _id: "5e8a2a1e519ec509e06ccb24",
                    nomeCompleto: "Filho 3",
                    dataNascimento: "2020-02-01T00:00:00.000Z",
                    cpf: "852.652.877-89"
                }
            ],
            rendaPercapita: 3563.85,
            endereco: {
                _id: "5e8a2a1e519ec509e06ccb25",
                rua: "Rua Sete de Setembro",
                bairro: "centro",
                complemento: "Ap 302",
                numero: 375,
                cep: "29500-000",
                cidade: "Alegre",
                estado: "ES",
                pais: "BR"
            },
            dataCestas: [],
            __v: 0
        }
    ]
    return (
        <>

            <FlatList
                style={styles.flatlist}
                data={DATA}
                extraData={DATA}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) =>
                    <View style={styles.principal}>
                        <View style={styles.row}>
                            <Text style={styles.titulo}>Última Sexta:</Text>
                            <Text>
                                {
                                    item.dataCestas.length > 0 ?
                                        moment(item.dataCestas[item.dataCestas.length - 1].data).format("DD/MM/YYYY")
                                        : <Text style={{ color: "red" }}>Ainda não receberam</Text>
                                }
                            </Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.titulo}>Responsavel:</Text>
                            <Text>{item.integrantes[0].nomeCompleto}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.titulo}>Endereço:</Text>
                            <Text>{item.endereco.rua + ", " + item.endereco.numero + ", "
                                + item.endereco.complemento + ", " + item.endereco.bairro}</Text>
                        </View>
                    </View>
                }
            />

        </>
    );
}
const styles = StyleSheet.create({
    principal: {
        marginTop: 25,
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