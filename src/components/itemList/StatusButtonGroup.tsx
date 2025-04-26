import Button from '@/components/Button';
import { Styles } from '@/styles/styles';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const options = ['대여 신청', '대여중', '연체'];
const count = [0, 0, 0];

const StatusButtonGroup = () => {

    const handlePress = () => {
        return(
          // 각 항목 클릭 시 히스토리로 이동
            console.log("")
        );
    }

    return (
        <View style={Styles.buttonGroup}>
            <View style={[Styles.XStack]}>
                {options.map((option, index) => {
                    return (
                    <Button
                        key={option}
                        type="option"
                        onPress={handlePress}
                    >
                        <Text>
                          {option}
                        </Text>
                        <br />
                        <Text>
                          {count[index]}
                        </Text>
                    </Button>
                    );
                })}
            </View>
        </View>
    );
}

export default StatusButtonGroup;