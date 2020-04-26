import React from 'react';
import Toast from 'react-native-root-toast';


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

export function isSuccess(data) {
    console.log(data)
    if (!data.success) {
        showToast(data.msg, duration.MEDIUM);
        return false
    } else {
        return true
    }
}