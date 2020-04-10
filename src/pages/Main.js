import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Card from '../components/Card';
import api from '../services/api';

function Main({ navigation }) {
    const [dataFamilia, setDataFamilia] = useState(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        async function getAllFamilias() {
            const response = await api.get('data/get_familia');
            //console.log()
            if (response.data.success) {
                setDataFamilia(response.data.familia);
                const timer = setTimeout(() => {
                    setIsVisible(true)
                }, 500);
                return () => clearTimeout(timer);

            }
        }

        getAllFamilias()
    }, []);


    return (
        <ScrollView style={styles.scroll}>
            <TouchableOpacity
                style={styles.cadastrar}
                onPress={() => navigation.navigate("CadastrarFamilia")}
            >
                <Text style={styles.txtCadastrar}>Cadastrar Nova Família </Text>
                <MaterialIcons name="chevron-right" size={30} color="#272936" />
            </TouchableOpacity>
            <View style={styles.cardContainer}>

                <Card
                    data={dataFamilia}
                    isVisible={isVisible}
                />


            </View>
            <View style={styles.searchForm}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Buscar família por cpf.."
                    placeholderTextColor="#999"
                    autoCapitalize="words"
                    autoCorrect={false}
                //value={techs}
                //onChangeText={setTechs}
                />
                <TouchableOpacity //onPress={loadDevs} 
                    style={styles.loadButton}>
                    <MaterialIcons name="search" size={30} color="#fff" />
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    scroll: {
        
    },
    cadastrar: {
        borderRadius: 25,
        backgroundColor: "#fff",
        marginTop: 20,
        marginLeft: 20,
        marginRight: 20,
        paddingHorizontal: 20,
        paddingVertical: 10,
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowOffset: {
            width: 4,
            height: 4,
        },
        elevation: 3,
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row"
    },
    txtCadastrar: {
        fontSize: 16,
        color: "#333",
    },
    cardContainer: {
        marginTop: 80,
        marginHorizontal: 20,
        height: "100%"
    },
    searchForm: {
        position: "absolute",
        top: 95,
        left: 20,
        right: 20,
        zIndex: 5,
        flexDirection: "row"
    },
    searchInput: {
        flex: 1,
        height: 50,
        backgroundColor: "#fff",
        color: "#333",
        borderRadius: 25,
        paddingHorizontal: 20,
        fontSize: 16,
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowOffset: {
            width: 4,
            height: 4,
        },
        elevation: 3,
    },
    loadButton: {
        width: 50,
        height: 50,
        backgroundColor: "#272936",
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 15
    }
})

export default Main;