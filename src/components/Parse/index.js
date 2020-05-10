import React from 'react';
import Toast from 'react-native-root-toast';
import {
    AsyncStorage,
} from 'react-native';

export const duration = { LONG: 2000, MEDIUM: 1500, SHORT: 100 }

export function showToast(msg, value = 1000) {
    Toast.show(msg, {
        duration: value,
        position: Toast.positions.BOTTOM + 10,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0
    });
}

export function isSuccess(data, navigation) {
    console.log(data)
    if (!data.success) {
        if (navigation != null) {
            showToast(data.msg, duration.MEDIUM);
           
            if (data.error == 401) {
                AsyncStorage.setItem('@CodeApi:token', JSON.stringify(false))
                AsyncStorage.setItem('@instituicao', JSON.stringify(false))
                navigation.navigate('Login')
            }
        }
        return false
    } else {
        return true
    }
}