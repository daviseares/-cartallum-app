import React, { useRef, useEffect } from 'react';
import { Form } from '@unform/mobile';
import { setLocale } from 'yup';
import * as constants from '../locales/yup-locale-pt-br';
import { Scope } from '@unform/core';
import {
    StyleSheet,
    Text,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    View,
    StatusBar,
    TouchableOpacity,
} from 'react-native';
import Input from '../components/Input';
import FormData from '../components/Form';
import * as Yup from 'yup';

export default function CadastrarFamilia() {
    const formRef = useRef(null);

    useEffect(() => {
        setLocale(constants.translation);
    }, [])

    async function handleSubmit(data, { reset }) {
        try {
            // Remove all previous errors
            formRef.current.setErrors({});
            const schema = Yup.object().shape({
                renda: Yup.number().min(2).required(),
                endereco: Yup.object().shape({
                    rua: Yup.string().min(4).required(),
                    bairro: Yup.string().min(4).required(),
                    numero: Yup.string().min(1),
                    cep: Yup.number().min(8).required(),
                    cidade: Yup.string().min(4).required(),
                    estado: Yup.string().min(4).required(),
                    pais: Yup.string().min(4).required(),
                })
            });
            await schema.validate(data, {
                abortEarly: false,
            });
            // Validation passed
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