import React from 'react';
import { View, Platform, StyleSheet, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';

// import { Container } from './styles';

export default function Toolbar({ title, navigation, menu = false, }) {
    return (
        <>
            <View style={styles.toolbar}>
                {menu == false ?
                    (
                        Platform.OS == 'ios' ?
                            <Icon name="angle-left" size={38} color="#fff"
                                style={styles.toolbarIcon}
                                onPress={navigation}
                            />
                            :
                            <Feather name="arrow-left" size={25} color="#fff"
                                style={styles.toolbarIcon}
                                onPress={navigation}
                            />
                    ) :
                    <Feather name="menu" size={28} color="#fff"
                        style={styles.toolbarIcon}
                        onPress={navigation}
                    />
                }
                <Text style={styles.txtToolbar}>{title}</Text>
                <View style={styles.lema}>
                    <Text style={styles.txtLema}>Rede de Caridade</Text>
                </View>
            </View>
        </>
    );
}
const styles = StyleSheet.create({

    toolbar: {
        height: Platform.OS == 'ios' ? 88 : 55,
        width: "100%",
        backgroundColor: '#272936',
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: Platform.OS == 'ios' ? "center" : "flex-start"
    },
    toolbarIcon: {
        position: "absolute",
        bottom: Platform.OS == 'ios' ? 2 : 12,
        left: Platform.OS == 'ios' ? 7 : 15,
    },
    txtToolbar: {
        fontSize: 20,
        color: "#fff",
        fontWeight: "500",
        marginBottom: Platform.OS == 'ios' ? 8 : 14,
        marginLeft: Platform.OS == 'ios' ? 0 : 80
    },
    lema: {
        position: "absolute",
        right: 20,
        bottom:5,
        width: 80,

    },
    txtLema: {
        fontSize: 20,
        color: "#fff",
        textAlign: "center"
    }
})