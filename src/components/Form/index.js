import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { TextInputMask } from 'react-native-masked-text'
import { MaterialIcons } from '@expo/vector-icons';
import { TextInput } from 'react-native-gesture-handler';
import { connect } from "react-redux";
import { addIntegrante, removeIntegrante } from '../../store/actions/actionIntegrante';

class FormData extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nomeUnico: '',
            cpfUnico: '',
            dataUnica: '',
            listaIntegrantes: [],
            countIntegrantes: [0],

        }

    }
    adicionarIntegrante = () => {
        this.props.addIntegrante({
            nome: this.state.nomeUnico,
            cpf: this.state.cpfUnico,
            dataNascimento: this.state.dataUnica
        })

        var recebe = this.state.countIntegrantes
        recebe.push(this.state.countIntegrantes.length);
        this.setState({ countIntegrantes: recebe, cpfUnico: '', nomeUnico: '', dataUnica: '' })

    }


    retirarIntegrante(indice) {
        if (this.props.listaIntegrantes[indice] !== undefined) {
            this.props.removeIntegrante(indice)
        }

        if (this.state.countIntegrantes.length > 1) {
            var remover = this.state.countIntegrantes
            remover.splice(indice, 1)
            this.setState({ countIntegrantes: remover })
        }
        this.setState({ cpfUnico: '', nomeUnico: '', dataUnica: '' })
    }



    render() {
        console.log(this.props.listaIntegrantes)
        return (
            <View>
                {
                    this.state.countIntegrantes.map((integrante, index) => {
                        return (
                            <View key={index} style={styles.container}>
                                <View style={styles.option}>
                                    <MaterialIcons name="delete" size={25} style={styles.iconeDelete} onPress={() => this.retirarIntegrante(index)} />
                                </View>
                                <Text style={styles.txtNome}>Nome</Text>
                                <TextInput
                                    style={styles.campo}
                                    editable={this.props.listaIntegrantes[index] !== undefined ? false : true}
                                    value={this.props.listaIntegrantes[index] !== undefined ? this.props.listaIntegrantes[index].nome : null}
                                    onChangeText={(text) => this.setState({ nomeUnico: text })}
                                />
                                <Text style={styles.txtNome}>CPF</Text>
                                <TextInputMask
                                    style={styles.campo}
                                    editable={this.props.listaIntegrantes[index] !== undefined ? false : true}
                                    type={'cpf'}
                                    value={this.props.listaIntegrantes[index] !== undefined ? this.props.listaIntegrantes[index].cpf : this.state.cpfUnico}
                                    onChangeText={(text) => this.setState({ cpfUnico: text })}
                                />
                                <Text style={styles.txtNome}>Data de Nascimento</Text>
                                <TextInputMask
                                    type={'datetime'}
                                    options={{
                                        format: 'DD/MM/AAAA'
                                    }}
                                    style={styles.campo}
                                    editable={this.props.listaIntegrantes[index] !== undefined ? false : true}
                                    value={this.props.listaIntegrantes[index] !== undefined ? this.props.listaIntegrantes[index].dataNascimento : this.state.dataUnica}
                                    onChangeText={(text) => this.setState({ dataUnica: text })}
                                />
                            </View>
                        )
                    })
                }
                <View style={{ marginVertical: 15 }}>
                    <TouchableOpacity style={styles.addButton} onPress={this.adicionarIntegrante}>
                        <Text style={styles.addButtonText}>Adicionar Integrante</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const mapStateToProps = state => {
    return {
        listaIntegrantes: state.reducerIntegrante.listaIntegrantes
    };
};

const mapDispatchToProps = dispatch => {
    return {
        addIntegrante: (item) => dispatch(addIntegrante(item)),
        removeIntegrante: (item) => dispatch(removeIntegrante(item))
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FormData);


const styles = StyleSheet.create({
    container: {
        borderBottomWidth: 1,
        paddingBottom: 25,
        borderBottomColor: "#333",
        justifyContent: 'center',
        backgroundColor: '#ffffff',
    },
    txtTitle: {
        fontSize: 20,
        marginHorizontal: 20,
    },
    iconeDelete: {
        color: "red",
    },
    iconeEdit: {
        color: "#333",
        marginRight: 25
    },
    option: {
        marginTop: 15,
        flexDirection: "row",
        justifyContent: "flex-end"
    },
    txtNome: {
        marginBottom: 5,
        fontWeight: 'bold',
    },
    campo: {
        marginBottom: 15,
        paddingHorizontal: 12,
        paddingVertical: 12,
        borderRadius: 4,
        borderWidth: 2,
        borderColor: '#ddd',
        fontSize: 15,
        color: '#444',
    },
    addButton: {
        backgroundColor: '#5849be',
        borderWidth: 0,
        borderRadius: 4,
        padding: 10,
        alignItems: 'center',
        marginBottom: 20
    },

    addButtonText: {
        fontWeight: 'bold',
        color: '#fff',
        fontSize: 15,
    },
});
