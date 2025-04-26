import Button from '@/components/Button';
import { Styles } from '@/styles/styles';
import { TextThemes } from '@/styles/theme';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const options = ['대여 신청', '대여중', '연체'];
const count = [5, 5, 0];
const themes = [TextThemes.statusRequest, TextThemes.statusAccepted, TextThemes.statusOverdue];

const StatusButtonGroup = () => {

    const handlePress = () => {
        return(
          // 각 항목 클릭 시 히스토리로 이동
            console.log("")
        );
    }

    return (
        <View style={Styles.XStack}>
            <View style={[Styles.XStack, Styles.buttonGroup]}>
                {options.map((option, index) => {
                    return (
                      <View style={Styles.XStack}>
                        <Button
                            key={option}
                            type="transparent"
                            onPress={handlePress}
                            style={Styles.statusButton}
                        >
                          <View style={Styles.YStack}>
                            <Text
                              ellipsizeMode="middle"
                              numberOfLines={1}
                            >
                              {option}
                            </Text>
                            <Text style={[Styles.statusNumber, themes[index]]}>
                              {count[index]}
                            </Text>
                          </View>
                        </Button>
                        {index < options.length-1 && 
                        <View style={Styles.divider} />}
                      </View>
                    );
                })}
            </View>
        </View>
    );
}

export default StatusButtonGroup;