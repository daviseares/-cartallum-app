import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

// import { Container } from './styles';

export default function Menu() {
    return (
        <View style={styles.principal}>
            <Text style={{ backgroundColor: "#fff" }}>aaa</Text>
        </View>
    );
}
const styles = StyleSheet.create({
    principal: {
        backgroundColor: "#fff",
        flex: 1
    }
});