import React, { useEffect, useState, useRef } from 'react';
import { View, StyleSheet, FlatList, Text, TouchableOpacity, Alert } from 'react-native';
import Modal from 'react-native-modal';
import { Form } from '@unform/mobile';
import { Scope } from '@unform/core';
import { setLocale } from 'yup';
import * as Yup from 'yup';
import * as constants from '../locales/yup-pt';
import * as parse from '../components/Parse';
import Input from '../components/Input';
import Toolbar from '../components/Toolbar';
import api from '../services/api';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';
import { ScrollView } from 'react-native-gesture-handler';
import data from '../data/instituicoesPreview.json';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function DetalhesInstituicao({ navigation }) {
    const [listaInstituicao, setListaInstituicao] = useState(data);
    const [isVisible, setIsVisible] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const formRef = useRef(null);
    const [selectedId, setSelectedId] = useState(0);
    const [initialData, setInitialData] = useState('');

    useEffect(() => {
        navigation.addListener('willFocus', () => {
            console.log("is focused")
            getListaInstituicao();
            setLocale(constants.translation);
        });
        console.log("chama user effect")
        setLocale(constants.translation);
        getListaInstituicao();


    }, [])

    /**
     * get lista de instituições
     */
    async function getListaInstituicao() {
        setIsVisible(false)
        try {
            const response = await api.get('instituicao/listarInstituicao')

            if (parse.isSuccess(response.data)) {
                console.log(response);
                setListaInstituicao(response.data.instituicao);

                const timer = setTimeout(() => {
                    setIsVisible(true)
                }, 1000);

                return () => clearTimeout(timer);
            }



        } catch (error) {

            parse.showToast("Erro, tente novamente!");
            console.log("Error", error)
        }
    }

    /**
     * esta função edita instituição
     * @param {Object} item / instituição selecionada 
     */
    async function editarInstituicao(item, reset) {

        try {
            if (selectedId != 0) {
                setModalVisible(false);
                setIsVisible(false);
                const response = await api.post('instituicao/editar', {
                    _id: selectedId,
                    nomeInstituicao: item.nomeInstituicao,
                    type: item.tipo,
                    email: item.email,
                    password: item.password,
                    telefone: item.telefone,
                    endereco: {
                        rua: item.endereco.rua,
                        bairro: item.endereco.bairro,
                        numero: item.endereco.numero,
                        complemento: item.endereco.complemento,
                        cep: item.endereco.cep,
                        cidade: item.endereco.cidade,
                        estado: item.endereco.estado,
                        pais: item.endereco.pais
                    }

                })
                var result = response.data;

                if (parse.isSuccess(result)) {

                    getListaInstituicao();
                    parse.showToast(`Instituição atualizada com sucesso!`, 3000);
                    reset();
                }
            }
        } catch (error) {
            parse.showToast("Erro, tente novamente!", 2500);
            console.log(error)
        }
    }

    /**
     * prepare to exclude instituição
     */
    function prepareToDelete() {
        Alert.alert(
            'Atenção!',
            `Tem certeza que deseja excluir a Instituição ${initialData.nomeInstituicao}?`,
            [
                { text: 'CANCELAR', onPress: () => { } },
                { text: 'EXCLUIR', onPress: () => deletarInstituicao() },
            ]
        )
    }

    /**
     * esta função deleta instituição
     * @param {Object} item / instituição 
     */
    async function deletarInstituicao() {

        try {
            if (selectedId != 0) {
                setModalVisible(false);
                setIsVisible(false);
                const response = await api.post('instituicao/excluir', {
                    _id: selectedId
                })
                var result = response.data;

                if (parse.isSuccess(result)) {

                    getListaInstituicao();
                    parse.showToast(`Instituição deletada com sucesso!`, 3000);
                }
            }
        } catch (error) {
            parse.showToast("Erro, tente novamente!", 2500);
            console.log(error)
        }
    }

    /**
     * 
     * @param {Object} item 
     */
    function toggleModal(item) {
        setSelectedId(item._id)
        setInitialData({
            nomeInstituicao: item.nomeInstituicao,
            type: item.tipo,
            email: item.email,
            password: item.password,
            telefone: item.telefone,
            endereco: {
                rua: item.endereco.rua,
                bairro: item.endereco.bairro,
                numero: item.endereco.numero == null ? '' : String(item.endereco.numero),
                complemento: item.endereco.complemento,
                cep: item.endereco.cep,
                cidade: item.endereco.cidade,
                estado: item.endereco.estado,
                pais: item.endereco.pais
            }
        });

        setModalVisible(true);
    }

    /**
     * 
     * @param {Obeject} data 
     * @param {Function} reset | reset form
     */
    async function handleSubmit(data, { reset }) {
        console.log(" Integrante", data)
        try {
            // Remove all previous errors
            formRef.current.setErrors({});
            const schema = Yup.object().shape({
                nomeInstituicao: Yup.string(),
                type: Yup.string(),
                email: Yup.string(),
                password: Yup.string(),
                telefone: Yup.string(),
                endereco: Yup.object().shape({
                    rua: Yup.string(),
                    bairro: Yup.string(),
                    numero: Yup.string(),
                    complemento: Yup.string(),
                    cep: Yup.string().min(8, 'O CEP está icompleto'),
                    cidade: Yup.string().min(4, ' A cidade deve ter no mímino 4 caracteres'),
                    estado: Yup.string().min(2, 'O estado deve ter no mímino 4 caracteres'),
                    pais: Yup.string().min(2, 'O paísdeve ter no mímino 2 caracteres'),
                })
            });
            await schema.validate(data, {
                abortEarly: false,
            });

            // Validation passed
            editarInstituicao(data, reset)
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

    }

    /**
     * go Back for previous screen
     */
    function goBack() {
        navigation.goBack();
    }


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
                            <View style={styles.option}>
                                <Icon name="edit" size={25}
                                    style={styles.iconeEdit}
                                    onPress={() => toggleModal(item)}
                                />
                            </View>
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
            <Modal
                isVisible={modalVisible}
            >
                <SafeAreaView>
                    <ScrollView style={styles.containerForm}>
                        <View style={[styles.row, { marginBottom: 25 }]}>
                            <Icon name="arrow-back" size={25}
                                style={[styles.iconeEdit]}
                                onPress={() => setModalVisible(false)}
                            />
                            <Text style={styles.txtEdit}>Editar Instituição</Text>
                        </View>

                        <Form ref={formRef} onSubmit={handleSubmit} initialData={initialData}>
                            <Input name="nomeInstituicao" label="Nome da Instituição" />
                            <Input name="type" label="Tipo de usuario" editable={false} />
                            <Input name="email" label="Email" />
                            <Input name="password" label="Nova Senha" />
                            <Input name="telefone" type="number" label="Telefone ou Celular(Opcional)" />
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
                            <Text style={styles.submitButtonText}>Salvar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.deleteButton} onPress={() => prepareToDelete()}>
                            <Text style={styles.submitButtonText}>Excluir</Text>
                        </TouchableOpacity>
                    </ScrollView>
                </SafeAreaView>

            </Modal>
        </View>
    );
}
const styles = StyleSheet.create({
    principal: {
        flex: 1,
    },
    containerForm: {
        padding: 25,
        borderRadius: 15,
        backgroundColor: "#fff",
    },
    txtTitle: {
        fontSize: 20,
        marginHorizontal: 20,
    },
    submitButton: {
        backgroundColor: '#40a745',
        borderWidth: 0,
        borderRadius: 4,
        padding: 16,
        alignItems: 'center',
        marginBottom: 25
    },
    deleteButton: {
        backgroundColor: '#dc3544',
        borderWidth: 0,
        borderRadius: 4,
        padding: 16,
        marginHorizontal: 50,
        alignItems: 'center',
        marginBottom: 45
    },
    txtEdit: {
        fontWeight: "bold",
        fontSize: 16,
    },
    submitButtonText: {
        fontWeight: 'bold',
        color: '#fff',
        fontSize: 15,
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
        flexWrap: "wrap",
        alignItems: "center",
    },
    titulo: {
        fontWeight: "bold",
        marginRight: 5
    },
    error: {
        marginBottom: 15,
        marginTop: -15,
        color: "red"
    },
    iconeEdit: {
        color: "#5849be",
        marginRight: 25
    },
    option: {
        position: "absolute",
        right: 0,
        top: 15
    },
});