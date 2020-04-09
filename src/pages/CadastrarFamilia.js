import React, { useRef, useEffect } from 'react';
import { Form } from '@unform/mobile';
import { setLocale } from 'yup';
import { Scope } from '@unform/core';
import {
    StyleSheet,
    Text,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    TouchableOpacity,
} from 'react-native';
import Input from '../components/Input';
import FormData from '../components/Form';
import * as Yup from 'yup';
import * as constants from '../locales/yup-pt';
import { connect } from "react-redux";
import api from '../services/api';

function CadastrarFamilia({ listaIntegrantes }) {
    const formRef = useRef(null);

    useEffect(() => {
        setLocale(constants.translation);
    }, [])



    async function registerFamilia(data) {
        try {
            const response = await api.post('register/cadastroFamilia', {
                integrantes: listaIntegrantes,
                rendaPercapita: data.renda,
                endereco: data.endereco,
                dataCestas: []
            })

            console.log(response);
        } catch (error) {
            console.log(error)
        }

    }

    async function handleSubmit(data, { reset }) {
        console.log("Cadastrar Familia Lista Integrante", listaIntegrantes)
        try {
            // Remove all previous errors
            formRef.current.setErrors({});
            const schema = Yup.object().shape({
                renda: Yup.number('O campo aceita apenas números').required('Este campo é obrigatório'),
                endereco: Yup.object().shape({
                    rua: Yup.string().required('Este campo é obrigatório'),
                    bairro: Yup.string().required('Este campo é obrigatório'),
                    numero: Yup.string(),
                    complemento: Yup.string(),
                    cep: Yup.string().min(8, 'O CEP está icompleto').required('Este campo é obrigatório'),
                    cidade: Yup.string().min(4, ' A cidade deve ter no mímino 4 caracteres').required('Este campo é obrigatório'),
                    estado: Yup.string().min(4, 'O estado deve ter no mímino 4 caracteres').required('Este campo é obrigatório'),
                    pais: Yup.string().min(2, 'O paísdeve ter no mímino 2 caracteres').required('Este campo é obrigatório'),
                })
            });
            await schema.validate(data, {
                abortEarly: false,
            });
            // Validation passed
            registerFamilia(data)
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
        //reset();
    }

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : null} style={styles.container}>
            <ScrollView>
                <FormData />
                <Form ref={formRef} onSubmit={handleSubmit}>
                    <Input name="renda" label="Renda Percapita" />
                    <Scope path="endereco">
                        <Input name="rua" label="Rua" />
                        <Input name="bairro" label="Bairro" />
                        <Input type="number" name="numero" label="Número (Opcional)" />
                        <Input name="complemento" label="Complemento (Opcional)" />
                        <Input name="cep" label="CEP" keyboardType="number-pad" />
                        <Input name="cidade" label="Cidade" />
                        <Input name="estado" label="Estado" />
                        <Input name="pais" label="Pais" />
                    </Scope>
                </Form>
                <TouchableOpacity style={styles.submitButton} onPress={() => formRef.current.submitForm()}>
                    <Text style={styles.submitButtonText}>Cadastrar</Text>
                </TouchableOpacity>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        flex: 1,
        backgroundColor: "#fff"
    },
    submitButton: {
        backgroundColor: '#5849be',
        borderWidth: 0,
        borderRadius: 4,
        padding: 10,
        alignItems: 'center',
        marginBottom: 20
    },

    submitButton: {
        backgroundColor: '#272936',
        borderWidth: 0,
        borderRadius: 4,
        padding: 16,
        alignItems: 'center',
        marginBottom: 40
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
    };
};
const mapDispatchToProps = dispatch => { return {}; };
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CadastrarFamilia);