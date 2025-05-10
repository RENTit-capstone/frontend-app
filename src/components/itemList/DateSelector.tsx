import React, { useRef, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Calendar, LocaleConfig } from "react-native-calendars";

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
                    <Text>Previous</Text>
                </TouchableOpacity>
                <Text>Custom header!</Text>
                <Text>{currentMonth}</Text>
                <TouchableOpacity onPress={moveNext}>
                    <Text>Next</Text>
                </TouchableOpacity>
            </View>
        )
    });

    return (   
        <View> 
            <Calendar
                // customHeader={CustomHeader}
                onDayPress={(day) => {
                    setSelected(day.dateString);
                    console.log("selected day", day.dateString);
                }}
                markedDates={{
                    [selected]: {selected: true, disableTouchEvent: true}
                }}
            />
        </View>
    );
}

export default DateSelector;