import React from 'react';
import { View, StyleSheet, ActivityIndicator, Text } from 'react-native';


export default function Loading({
    text,
    isVisible,
    backgroundColor = '#22222270',
    textColor = '#fff',
    activityColor = '#fff'
}) {
    return (
        <>
            {
                isVisible ?
                    <View style={[styles.loading, { backgroundColor: backgroundColor }]}>
                        <ActivityIndicator size='large' color={activityColor} />
                        <Text style={[styles.text, { color: textColor }]}>{text}</Text>
                    </View> : null
            }
        </>
    );
}
const styles = StyleSheet.create({
    loading: {
        ...StyleSheet.absoluteFillObject,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        zIndex: 999,
        elevation: 5,
    },
    text: {
        color: "#fff",
        fontSize: 16,
        marginTop: 20,
        fontWeight: "800"
    },
})