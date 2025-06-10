import { axiosGet } from '@/api';
import Button from '@/components/Button';
import { Common } from '@/styles/common';
import { itemList } from '@/styles/components/itemList';
import { TextThemes } from '@/styles/theme';
import generateUrl from '@/utils/generateUrl';
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const options = ['대여 신청', '대여중', '연체'];
const themes = [TextThemes.statusRequest, TextThemes.statusAccepted, TextThemes.statusOverdue];

const StatusButtonGroup = () => {
    const [statusCounts, setStatusCounts] = useState([0, 0, 0]);

    useEffect(() => {
        const statuses = [
            'REQUESTED',
            ['APPROVED', 'LEFT_IN_LOCKER', 'PICKED_UP', 'RETURNED_TO_LOCKER'],
        ];
        const fetchData = async () => {
            statuses.forEach(async (item, index) => {
                const params = generateUrl({
                    statuses: item,
                    page: 0,
                    size: 100,
                    sort: ['requestDate', 'desc'],
                });
                const response = await axiosGet(`/api/v1/rentals?${params}`);
                const count = response.data.content.length;
                setStatusCounts((prevCounts) => {
                    const newCounts = [...prevCounts];
                    newCounts[index] = count;
                    return newCounts;
                });
            });
        };
        fetchData();
    }, []);

    // const handlePress = (option: string) => {
    //     return (
    //         // 각 항목 클릭 시 히스토리로 이동
    //         console.log(option)
    //     );
    // };

    return (
        <View style={Common.wrapper}>
            <View style={[Common.XStack, Common.fullScreen, itemList.statusButtonWrapper]}>
                {options.map((option, index) => {
                    return (
                        <View key={option} style={[Common.XStack]}>
                            <Button
                                key={option}
                                type="transparent"
                                // onPress={() => handlePress(option)}
                                // disabled={true}
                                onPress={() => {}}
                                style={itemList.statusButton}
                            >
                                <View style={[Common.YStack, { width: '100%' }]}>
                                    <Text>{option}</Text>
                                    <Text style={[itemList.statusNumber, themes[index]]}>
                                        {statusCounts[index]}
                                    </Text>
                                </View>
                            </Button>
                            {index < options.length - 1 && <View style={itemList.divider} />}
                        </View>
                    );
                })}
            </View>
        </View>
    );
};

export default StatusButtonGroup;
