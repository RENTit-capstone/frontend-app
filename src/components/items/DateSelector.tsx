import React, { forwardRef, useEffect, useImperativeHandle, useMemo, useRef, useState } from "react";
import { Pressable, Text, TouchableOpacity, View } from "react-native";
import { Calendar, DateData, LocaleConfig } from "react-native-calendars";
import RightArrow from "@/assets/images/right-arrow.svg";
import LeftArrow from "@/assets/images/left-arrow.svg";
import Chip from "../Chip";
import { Common } from "@/styles/common";
import Colors from "@/constants/Colors";
import { MarkedDates } from "react-native-calendars/src/types";

export type DateSelectorRef = {
    getDates: () => {startDate: string | null; endDate: string | null};
}

const DateSelector = forwardRef<DateSelectorRef>((_, ref) => {
    const [startDate, setStartDate] = useState<string | null>(null);
    const [endDate, setEndDate] = useState<string | null>(null);

    useImperativeHandle(ref, () => ({
        getDates: () => ({startDate, endDate}),
    }));

    // custom Header ...
    const [currentMonth, setCurrentMonth] = useState(new Date().toISOString().split('T')[0]);
    const customHeaderProps: any = useRef('');

    const setCustomHeaderNewMonth = (next = false) => {
        const add = next ? 1 : -1;
        const month = new Date(customHeaderProps?.current?.month);
        const newMonth = new Date(month.setMonth(month.getMonth() + add));
        customHeaderProps?.current?.addMonth(add);
        setCurrentMonth(newMonth.toISOString().split('T')[0]);
    };
    const moveNext = () => {
        setCustomHeaderNewMonth(true);
    };
    const movePrevious = () => {
        setCustomHeaderNewMonth(false);
    };

    const CustomHeader = React.forwardRef((props, ref) => {
        customHeaderProps.current = props;
        return (
            <View>
                <TouchableOpacity onPress={movePrevious}>
                    <LeftArrow />
                </TouchableOpacity>
                <Text>{currentMonth}</Text>
                <Text>{currentMonth.substring(5,7)}</Text>
                <TouchableOpacity onPress={moveNext}>
                    <RightArrow />
                </TouchableOpacity>
            </View>
        )
    });
    // ... custom Header

    // custom Day ...
    const onDayPress = (day: DateData) => {
        console.log(day.dateString);
        // 두개 다 선택이 안된 경우
        if (!startDate || (startDate && endDate)) {
            console.log("asdf")
            setStartDate(day.dateString);
            setEndDate(null);
            return;
        }
        // 두번째로 선택한 날짜가 startDate일 때
        if (new Date(day.dateString) < new Date(startDate)) {
            setEndDate(startDate);
            setStartDate(day.dateString);
            console.log(startDate);
        }
        else {
            setEndDate(day.dateString);
        }
    }
    
    const markedDates = useMemo(() => {
        let marked: MarkedDates = {};

        if (startDate && !endDate) {
            marked[startDate] = {
                startingDay: true,
                endingDay: true,
                color: Colors.primary,
                textColor: Colors.white,
            };
        }
        
        if (startDate && endDate) {
            const start = new Date(startDate);
            const end = new Date(endDate);
            let current = new Date(start);

            while (current <= end) {
                const dateStr = current.toISOString().split('T')[0];

                marked[dateStr] = {
                    color: dateStr === startDate || dateStr === endDate
                        ? Colors.primary
                        : "#455464",
                        // : "#F3F7FA",
                    textColor:
                        "white",
                        // dateStr === startDate || dateStr === endDate
                        // ? 'white'
                        // : '#000',
                    startingDay: dateStr === startDate,
                    endingDay: dateStr === endDate,
                };

                current.setDate(current.getDate() + 1);
            }
        }

        return marked;
    }, [startDate, endDate]);

    const resetPeriod = () => {
        setStartDate(null);
        setEndDate(null);
    }

    return (   
        <View> 
            <Calendar
                // customHeader={CustomHeader}
                monthFormat="yyyy MM"
                onDayPress={onDayPress}
                markingType="period"
                markedDates={markedDates}               

                theme={{ 
                    arrowColor: "#5B5B5B"
                }}
            />
            <View style={Common.chips}>             
                <Chip startDate={startDate} endDate={endDate} onCancel={resetPeriod}/>
            </View>
        </View>
    );
});

export default DateSelector;