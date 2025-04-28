import Button from '@/components/Button';
import { Common } from '@/styles/common';
import { itemList } from '@/styles/components/itemList';
import { TextThemes } from '@/styles/theme';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const options = ['대여 신청', '대여중', '연체'];
const count = [5, 5, 0];
const themes = [TextThemes.statusRequest, TextThemes.statusAccepted, TextThemes.statusOverdue];

const StatusButtonGroup = () => {

    const handlePress = (option: string) => {
        return(
          // 각 항목 클릭 시 히스토리로 이동
            console.log(option)
        );
    }

    return (
        <View style={Common.container}>
            <View style={[Common.XStack, Common.fullScreen, itemList.statusButtonWrapper]}>
                {options.map((option, index) => {
                    return (
                      <View key={option} style={[Common.XStack]}>
                        <Button
                            key={option}
                            type="transparent"
                            onPress={() => handlePress(option)}
                            style={itemList.statusButton}
                        >
                          <View style={Common.YStack}>
                            <Text>
                              {option}
                            </Text>
                            <Text style={[itemList.statusNumber, themes[index]]}>
                              {count[index]}
                            </Text>
                          </View>
                        </Button>
                        {index < options.length-1 && 
                        <View style={itemList.divider} />}
                      </View>
                    );
                })}
            </View>
        </View>
    );
}

export default StatusButtonGroup;