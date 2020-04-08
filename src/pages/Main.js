import React, { useEffect, useState } from 'react';
import { StyleSheet, Image, View, Text, TouchableOpacity, TextInput, KeyboardAvoidingView } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location';
import { MaterialIcons } from '@expo/vector-icons';
import Card from '../components/Card';
import api from '../services/api';

function Main({ navigation }) {
    const [dataFamilia, setDataFamilia] = useState(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        async function getAllFamilias() {
            const response = await api.get('/data/get_familia');
            //console.log(response)
            setDataFamilia(response.data);
            setIsVisible(true);
        }
        getAllFamilias()
    }, []);


    return (
        <>
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
        </>
    )
}

const styles = StyleSheet.create({
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