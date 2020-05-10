import React, { useRef, useEffect, useState } from 'react';
import { Form } from '@unform/mobile';
import { setLocale } from 'yup';
import { Scope } from '@unform/core';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
} from 'react-native';

import * as constants from '../locales/yup-pt';
import * as parse from '../components/Parse';

import Toolbar from '../components/Toolbar';

export default function Sobre({ navigation }) {
    const formRef = useRef(null);
    const [initialData, setInitialData] = useState('');

    useEffect(() => {

        setLocale(constants.translation);

    }, [])




    return (
        <>
            <Toolbar
                title="Sobre o aplicativo"
                navigation={() => navigation.goBack()}
                about={true}
            />
            <View style={styles.principal}>

                <View style={styles.row}>
                    <Text style={styles.titulo}>Desenvolvedores</Text>
                    <Text style={styles.name}>Davi Borges</Text>
                    <Text>davi@acodedreams.com.br</Text>
                    <Text style={{ marginBottom: 20 }}>Dev. Mobile</Text>
                    <Text style={styles.name}>Guilherme Dias</Text>
                    <Text>guilherme@acodedreams.com.br</Text>
                    <Text>Dev. Mobile</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.titulo}>Professores Orientadores</Text>
                    <Text>Prof. Dr. Clayton Vieira Fraga Filho</Text>
                    <Text>clayton.fraga.ufes@gmail.com</Text>
              
                    <Text>Geraldo Regis Mauri</Text>
                    <Text>geraldo.mauri@ufes.com</Text>
                    <Text style={styles.description}>Centro de Ciências Exatas, Naturais e da Saúde | CCENS
                            Universidade Federal do Espírito Santo | UFES</Text>
                </View>
                <View style={styles.creditos}>
                    <Text style={styles.txtCreditos}>Apoiadores</Text>
                    <Text style={styles.txtCreditos}>https://acodedreams.com.br</Text>
                    <Text style={styles.txtCreditos}>http://alegre.ufes.br/</Text>
                </View>
            </View>



        </>
    );
}

const styles = StyleSheet.create({
    principal: {
        backgroundColor: "#fff",
        justifyContent: "flex-start",
        alignItems: "center",
        flex: 1
    },
    row: {
        width: 250,
        paddingVertical: 20,
        alignItems: "center"
    },
    description: {
        marginTop: 10,
        textAlign: "center"
    },
    name: {
        fontSize: 17,
        fontWeight: "600"
    },
    titulo: {
        marginBottom: 10,
        fontWeight: 'bold',
        fontSize: 16
    },
    creditos: {
        justifyContent: "space-around",
        alignItems: "center",
        position: "absolute",
        bottom: 15,
        width: "100%",
        height: 80,
        paddingVertical:10,
        backgroundColor: "#00000090"
    },
    txtCreditos: {
        color: '#fff'
    },
});

