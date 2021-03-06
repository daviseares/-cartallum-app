import React, { useRef, useEffect } from 'react';
import { Text, TextInput, StyleSheet } from 'react-native';
import { useField } from '@unform/core';

function Input({ name, label, ...rest }) {
    const inputRef = useRef(null);
    //console.log(inputRef)
    const { fieldName, registerField, defaultValue, error } = useField(name);

    useEffect(() => {
        registerField({
            name: fieldName,
            ref: inputRef.current,
            path: '_lastNativeText',
            getValue(ref) {
                if (ref._lastNativeText == undefined) {
                    return ref.props.defaultValue;
                } else {
                    return ref._lastNativeText
                }

            },
            setValue(ref, value) {
                ref.setNativeProps({ text: value });
                ref._lastNativeText = value;
            },
            clearValue(ref) {
                ref.setNativeProps({ text: '' });
                ref._lastNativeText = '';
            }
        })
    }, [fieldName, registerField]);

    return (
        <>
            {label && <Text style={styles.label}>{label}</Text>}

            <TextInput
                style={styles.input}
                ref={inputRef}
                defaultValue={defaultValue}
                {...rest}
            />
            {error && <Text style={styles.error}>{error}</Text>}
        </>
    );
}

const styles = StyleSheet.create({
    label: {
        fontWeight: 'bold',
        marginBottom: 5,
    },

    input: {
        marginBottom: 15,
        paddingHorizontal: 12,
        paddingVertical: 5,
        borderRadius: 4,
        borderWidth: 2,
        borderColor: '#ddd',
        fontSize: 15,
        color: '#444',
    },
    error: {
        marginBottom: 15,
        marginTop: -15,
        color: "red"
    }
});

export default Input;