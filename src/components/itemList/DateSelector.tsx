import React, { useRef, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Calendar, LocaleConfig } from "react-native-calendars";
import RightArrow from "@/assets/images/right-arrow.svg";
import LeftArrow from "@/assets/images/left-arrow.svg";
import Chip from "../Chip";
import { Common } from "@/styles/common";

const DateSelector = () => {
    const [selected, setSelected] = useState('');
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

    return (   
        <View> 
            <Calendar
                // customHeader={CustomHeader}
                monthFormat="yyyy MM"
                onDayPress={(day) => {
                    setSelected(day.dateString);
                    console.log("selected day", day.dateString);
                }}
                markedDates={{
                    [selected]: {selected: true, disableTouchEvent: true}
                }}
                theme={{ 
                    arrowColor: "#5B5B5B"
                }}
            />
            <View style={Common.chips}>             
                <Chip />
            </View>
        </View>
    );
}

export default DateSelector;