import React, { useRef, useEffect, useCallback, forwardRef } from 'react';
import { Text, TextInput, StyleSheet } from 'react-native';
import { useField } from '@unform/core';

function Input({ name, label, onChangeText, rawValue, ...rest }) {
    const inputRef = useRef(null);

    const { fieldName, registerField, defaultValue = '', error } = useField(name);

    const handleOnChange = useCallback(
        text => {
            if (inputRef.current) inputRef.current.value = text;
            if (onChangeText) onChangeText(text);
        },
        [onChangeText],
    );

    useEffect(() => {
        registerField({
            name: fieldName,
            ref: inputRef.current,
            path: '_lastNativeText',
            getValue(ref) {
                if (ref._lastNativeText == undefined) {
                    return rawValue || ref.props.defaultValue || '';
                } else {
                    return rawValue || ref._lastNativeText || '';
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
    }, [fieldName, rawValue, registerField]);

    return (
        <>
            {label && <Text style={styles.label}>{label}</Text>}

            <TextInput
                style={styles.input}
                ref={inputRef}
                onChangeText={handleOnChange}
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