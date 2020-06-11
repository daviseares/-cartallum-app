import React, { useEffect, useState } from 'react';
import {
    View,
    StyleSheet,
    FlatList,
    Text,
    TouchableOpacity,

} from 'react-native';
import Loading from '../components/Loading';
import Toolbar from '../components/Toolbar';
import api from '../services/api';
import { connect } from "react-redux";


function RelatorioGeral({ navigation }) {
    const [isVisible, setIsVisible] = useState(true);
    const [isData, setIsData] = useState([]);

    useEffect(() => {

        api.get('data/relatorio_geral').then(response => {

            setIsData(response.data)
        })

        setIsVisible(false);
    }, [])


    return (
        <>
            <Toolbar
                title="Relatório Geral"
                navigation={() => navigation.navigate('Main')}
            />
            <Loading text="Carregando" isVisible={isVisible} />
            <View style={styles.info}>
                <View style={{ alignItems: 'center', }}>
                    <Text style={styles.textoInfo}>Famílias Cadastradas </Text>
                    <Text style={styles.valueInfo}>{isData.qtdFamilia}</Text>
                </View>
                <View style={{ alignItems: 'center', }}>
                    <Text style={styles.textoInfo}>Instituições Cadastradas </Text>
                    <Text style={styles.valueInfo}>{isData.qtdInstituicao}</Text>
                </View>
            </View>
            <View style={styles.instituicoes}>
                <Text style={{ paddingBottom: 13, marginLeft: 15 }}>Instituições Cadastradas: </Text>
                <FlatList
                    data={isData.data}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) =>
                        <View style={styles.card}>
                            <Text>Nome Instituição: {item.nomeInstituicao}</Text>
                            <Text>Quantidade de cestas doadas: {item.quantidade}</Text>
                            <View style={styles.cadastrada}>
                                <Text>Continua Cadastrada? </Text>
                                {
                                    item.ativa ?
                                        <Text style={{ color: 'green' }}>SIM</Text>
                                        :
                                        <Text style={{ color: 'red' }}>NÃO</Text>
                                }
                            </View>
                        </View>
                    }
                />
            </View>
        </>

    );
}
const styles = StyleSheet.create({
    info: {
        flex: 0.3,
        padding: 20,
        color: '#6C6C80',
        alignItems: 'center',

    },
    textoInfo: {
        fontSize: 16,
    },
    linha: {
        flexDirection: 'row'
    },
    valueInfo: {
        fontSize: 18,
        fontWeight: "bold",
    },
    instituicoes: {
        flex: 1
    },
    card: {
        marginBottom: 15,
        marginHorizontal: 25,
        backgroundColor: "#fff",
        paddingVertical: 20,
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
    cadastrada: {
        flexDirection: 'row'
    }
})

const mapStateToProps = state => {
    return {

    };
};

const mapDispatchToProps = dispatch => ({

});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RelatorioGeral);