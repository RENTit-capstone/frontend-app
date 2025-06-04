import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Slider from '@react-native-community/slider';

export default function RangeSlider() {
    const [minValue, setMinValue] = useState(2);
    const [maxValue, setMaxValue] = useState(8);

    return (
        <View>
            <Text>
                선택한 범위: {minValue} - {maxValue}
            </Text>
        </View>
    );
}
