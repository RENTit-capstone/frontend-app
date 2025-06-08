import { useBottomSheetStore } from '@/stores/useBottomSheetStore';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';

const PriceSelector = () => {
    const [minValue, setMinValue] = useState<string>();
    const [maxValue, setMaxValue] = useState<string>();
    const { visible, result, setResult } = useBottomSheetStore();

    useEffect(() => {
        setResult({ ...result, minValue: minValue, maxValue: maxValue });
    }, [minValue, maxValue]);

    if (!visible) return null;

    return (
        <View style={styles.container}>
            <Text style={styles.label}>최소 가격</Text>
            <TextInput
                style={styles.input}
                value={String(minValue)}
                onChangeText={setMinValue}
                keyboardType="numeric"
            />

            <Text style={styles.label}>최대 가격</Text>
            <TextInput
                style={styles.input}
                value={String(maxValue)}
                onChangeText={setMaxValue}
                keyboardType="numeric"
            />
        </View>
    );
};
export default PriceSelector;

const styles = StyleSheet.create({
    container: {
        padding: 16,
        gap: 12,
        backgroundColor: '#fff',
        borderRadius: 12,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 6,
        elevation: 3,
    },
    label: {
        fontSize: 14,
        color: '#444',
        marginBottom: 4,
        fontWeight: '500',
    },
    input: {
        height: 44,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        paddingHorizontal: 12,
        fontSize: 16,
        backgroundColor: '#fafafa',
    },
});
