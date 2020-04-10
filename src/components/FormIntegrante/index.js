import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, FlatList } from 'react-native';
import * as Yup from 'yup';
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
            data: {}
        }

    }

    /**
     * esta função adiciona um integrante da lista no redux
     */
    async adicionarIntegrante() {
        var data = {
            nomeCompleto: this.state.nomeUnico,
            cpf: this.state.cpfUnico,
            dataNascimento: this.state.dataUnica.split('/').reverse().join('-')
        }
        try {
            const schema = Yup.object().shape({
                nomeCompleto: Yup.string().required('Este campo é obrigatório'),
                cpf: Yup.string().required('Este campo é obrigatório'),
                dataNascimento: Yup.string().required('Este campo é obrigatório')
            })
            //função de validação
            await schema.validate(data, {
                abortEarly: false,
            });
            //validation passed
            console.log(data);
            this.setState({ data: {} })
            this.props.addIntegrante(data);

            this.setState({ cpfUnico: '', nomeUnico: '', dataUnica: '' })

        } catch (err) {
            const validationErrors = {};
            if (err instanceof Yup.ValidationError) {
                err.inner.forEach(error => {
                    validationErrors[error.path] = error.message;
                });
                //formRef.current.setErrors(validationErrors);
                this.setState({ data: validationErrors })
                console.log(validationErrors)
            }
        }
    }


    /**
     * esta função remove um integrante da lista no redux
     * @param {Number} indice 
     */
    retirarIntegrante(indice) {
        console.log(indice)
        if (this.props.listaIntegrantes[indice] !== undefined) {
            this.props.removeIntegrante(indice)
        }
        this.setState({ cpfUnico: '', nomeUnico: '', dataUnica: '' })
    }



    render() {
        //console.log(this.state.data.nomeUnico)
        return (
            <View>
                <FlatList
                    style={styles.flatlist}
                    data={this.props.listaIntegrantes}
                    extraData={this.props.listaIntegrantes}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) =>
                        <View style={styles.card}>
                            <View style={styles.option}>
                                <MaterialIcons name="delete" size={25}
                                    style={styles.iconeDelete}
                                    onPress={() => this.retirarIntegrante(index)}
                                />
                            </View>
                            <View style={styles.row}>
                                <Text style={styles.titulo}>Nome Completo:</Text>
                                <Text>{item.nomeCompleto}</Text>
                            </View>
                            <View style={styles.row}>
                                <Text style={styles.titulo}>CPF:</Text>
                                <Text>{item.cpf}</Text>
                            </View>
                            <View style={styles.row}>
                                <Text style={styles.titulo}>Data de Nascimento:</Text>
                                <Text>{item.dataNascimento.split('-').reverse().join('/')}</Text>
                            </View>
                        </View>
                    }
                />
                <Text></Text>
                <View style={styles.container}>
                    <Text style={styles.txtNome}>Nome</Text>
                    <TextInput
                        style={styles.campo}
                        value={this.state.nomeUnico}
                        onChangeText={(text) => this.setState({ nomeUnico: text })}
                    />
                    {this.state.data.nomeCompleto &&
                        <Text style={styles.error}>{this.state.data.nomeCompleto}</Text>}
                    <Text style={styles.txtNome}>CPF</Text>
                    <TextInputMask
                        style={styles.campo}
                        type={'cpf'}
                        value={this.state.cpfUnico}
                        onChangeText={(text) => this.setState({ cpfUnico: text })}
                    />
                    {this.state.data.cpf &&
                        <Text style={styles.error}>{this.state.data.cpf}</Text>}

                    <Text style={styles.txtNome}>Data de Nascimento</Text>
                    <TextInputMask
                        type={'datetime'}
                        options={{
                            format: 'DD/MM/AAAA'
                        }}
                        style={styles.campo}
                        value={this.state.dataUnica}
                        onChangeText={(text) => this.setState({ dataUnica: text })}
                    />
                    {this.state.data.dataNascimento &&
                        <Text style={styles.error}>{this.state.data.dataNascimento}</Text>}
                    <TouchableOpacity style={styles.addButton} onPress={() => this.adicionarIntegrante()}>
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
        paddingBottom: 25,
        justifyContent: 'center',
        backgroundColor: '#ffffff',
        borderRadius: 15,
        padding: 20,
        marginHorizontal: 25,
        backgroundColor: "#fff",
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowOffset: {
            width: 4,
            height: 4,
        },
        elevation: 3,
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
        position: "absolute",
        right: 15,
        top: 15
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
        marginBottom: 10
    },

    addButtonText: {
        fontWeight: 'bold',
        color: '#fff',
        fontSize: 15,
    },
    card: {
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
    flatlist: {
        marginTop: 25,
        marginHorizontal: 20
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
