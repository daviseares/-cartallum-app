import React, { useRef, useEffect, useState } from 'react';
import { Form } from '@unform/mobile';
import { setLocale } from 'yup';
import { Scope } from '@unform/core';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    TouchableOpacity,
    Alert,
} from 'react-native';
import Input from '../components/Input';
import * as Yup from 'yup';
import * as constants from '../locales/yup-pt';
import * as parse from '../components/Parse';
import { connect } from "react-redux";
import axios from 'axios';
import api from '../services/api';
import { cleanAll } from '../store/actions/actionIntegrante';
import Toolbar from '../components/Toolbar';

function CadastrarInstituicao({ navigation }) {

    const formRef = useRef(null);


    useEffect(() => {
        //evento para escutar o formulário
        navigation.addListener('willFocus', () => {
            console.log("is focused");

        });
        navigation.addListener('willBlur', () => {
            console.log("is Blur");

        });
        setLocale(constants.translation);
    }, [])



    /**
     * esta funçao faz o cadastro de instituicao
     * @param {Object} data / instituicao
     */
    async function registerInstituicao(data, reset) {

        try {
            const response = await api.post('instituicao/cadastro', data);

            var result = response.data;

            if (parse.isSuccess(result, navigation)) {
                console.log(response);
                parse.showToast("Instituição Cadastrada com sucesso!", parse.duration.LONG);
                navigation.navigate('DetalhesInstituicao');
                reset();
            }
        } catch (error) {
            console.log(error);
        }
    }



    /**
     * esta função pega os dados de endereço e salva em um objeto
     * após isso, faz a chamada para registrar família
     * @param {Object} data 
     */
    async function handleSubmit(data, { reset }) {
        console.log("data", data)
        // console.log("Cadastrar Familia Lista Integrante", listaIntegrantes)
        try {
            // Remove all previous errors
            formRef.current.setErrors({});
            const schema = Yup.object().shape({
                nomeInstituicao: Yup.string().required('Este campo é obrigatório'),
                email: Yup.string().required('Este campo é obrigatório'),
                password: Yup.string().required('Este campo é obrigatório'),
                telefone: Yup.string(),
                endereco: Yup.object().shape({
                    rua: Yup.string().required('Este campo é obrigatório'),
                    bairro: Yup.string().required('Este campo é obrigatório'),
                    numero: Yup.string(),
                    complemento: Yup.string(),
                    cep: Yup.string().min(8, 'O CEP está icompleto').required('Este campo é obrigatório'),
                    cidade: Yup.string().min(4, ' A cidade deve ter no mímino 4 caracteres').required('Este campo é obrigatório'),
                    estado: Yup.string().min(2, 'O estado deve ter no mímino 4 caracteres').required('Este campo é obrigatório'),
                    //pais: Yup.string().min(2, 'O país deve ter no mímino 2 caracteres').required('Este campo é obrigatório'),
                })
            });
            await schema.validate(data, {
                abortEarly: false,
            });

            // Validation passed
            registerInstituicao(data, reset)
            console.log(data);
        } catch (err) {
            const validationErrors = {};
            if (err instanceof Yup.ValidationError) {
                err.inner.forEach(error => {
                    validationErrors[error.path] = error.message;
                });
                formRef.current.setErrors(validationErrors);
            }
        }

        //limpa o formulário
    }

    return (
        <>
            <Toolbar
                title="Cadastrar Instituição"
                navigation={() => navigation.goBack()}

            />

            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : null}>
                <ScrollView>
                    <View style={styles.container}>
                        <Form ref={formRef} onSubmit={handleSubmit}>
                            <Input name="nomeInstituicao" label="Nome da Instituição" />
                            {/*  <Input name="type" label="Tipo de usuario" editable={false} value="cliente" /> */}
                            <Input name="email" label="Email" />
                            <Input name="password" label="Senha" />
                            <Input name="telefone" type="number" label="Telefone ou Celular(Opcional)" />
                            <Scope path="endereco">
                                <Input name="rua" label="Rua" />
                                <Input name="bairro" label="Bairro" />
                                <Input type="number" name="numero" label="Número (Opcional)" />
                                <Input name="complemento" label="Complemento (Opcional)" />
                                <Input name="cep" label="CEP" placeholder="29500000" keyboardType="number-pad"
                                    maxLength={8} />
                                <Input name="cidade" placeholder="Alegre" label="Cidade" />
                                <Input name="estado" placeholder="ES" maxLength={2} label="Estado" />
                            </Scope>
                        </Form>
                        <TouchableOpacity style={styles.submitButton} onPress={() => formRef.current.submitForm()}>
                            <Text style={styles.submitButtonText}>Cadastrar</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 15,
        padding: 20,
        margin: 25,
        marginBottom: 100,
        flex: 1,
        backgroundColor: "#fff",
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowOffset: {
            width: 4,
            height: 4,
        },
        elevation: 3,
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
});

const mapStateToProps = state => {
    return {
        listaIntegrantes: state.reducerIntegrante.listaIntegrantes
    }
};
const mapDispatchToProps = dispatch => {
    return {
        cleanAll: () => dispatch(cleanAll())
    }
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CadastrarInstituicao);