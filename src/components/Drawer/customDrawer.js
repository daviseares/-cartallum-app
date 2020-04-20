import React from 'react';
import { View, Text, Image, AsyncStorage, StyleSheet } from 'react-native';
import { DrawerNavigatorItems } from 'react-navigation-drawer';
import { connect } from "react-redux";
import { SafeAreaView } from 'react-native-safe-area-context';




function CustomDrawer({ instituicao, items, ...props }) {


    const filteredItems = instituicao.tipo === 'cliente' ? items.filter(item => (item.key === "Main" || item.key === "CadastrarFamilia")) : items;

    return (
        <SafeAreaView>

            <View style={styles.perfil}>
                <Text style={styles.nameInstituicao}>Olá, {instituicao.nomeInstituicao}</Text>
            </View>

            <DrawerNavigatorItems items={filteredItems} {...props} activeTintColor="#5849be"/>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    avatar: {
        width: 70,
        height: 70
    },
    perfil: {
        alignItems: "center",
        paddingVertical: 15
    },
    crop: {
        overflow: "hidden",
        borderRadius: 70,
        width: 70,
        height: 70
    },
    nameInstituicao: {
        textAlign: "center"
    }
})

const mapStateToProps = state => {
    return {
        instituicao: state.reducerInstituicao.instituicao
    };
};

const mapDispatchToProps = dispatch => ({

});

export default connect(
    mapStateToProps,
    null
)(CustomDrawer);  