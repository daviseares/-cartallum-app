import React from 'react';
import { View, Text, Image, AsyncStorage, StyleSheet } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { DrawerNavigatorItems } from 'react-navigation-drawer';




export default function CustomDrawer({ ...props }) {
    return (
        <>
            <View style={styles.perfil}>
                <View style={styles.crop}>
                    <Image
                        style={styles.avatar}
                        source={{ uri: 'https://www.clipartmax.com/png/middle/257-2572603_user-man-social-avatar-profile-icon-man-avatar-in-circle.png' }}
                    />
                </View>

                <Text>Olá, Igreja Católica</Text>
            </View>

            <DrawerNavigatorItems {...props} />
        </>
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
    }
})