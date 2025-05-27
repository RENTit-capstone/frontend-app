import { Text, View } from "react-native";
import { Common } from "@/styles/common";
import { Calendar } from "react-native-calendars";
import Chip from "../Chip";
import useDateSelector from "@/hooks/useDateSelector";
import { useBottomSheetStore } from "@/stores/useBottomSheetStore";
import { useEffect } from "react";


const DateSelectorModal = () => {
    const {startDate, endDate, onDayPress, markedDates, resetPeriod} = useDateSelector();
    const {visible, setResult} = useBottomSheetStore();

    useEffect(() => {
        setResult({startDate: startDate, endDate: endDate});
    }, [startDate, endDate])


    if (!visible)   return null;
    
    return (
        <>
            <View style={{alignItems: "center", paddingVertical: 15,}}>
                <Text style={{fontSize: 18, fontWeight: 500}}>일정 선택</Text>
            </View>

            <View> 
                <Calendar
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
        </>
    )
}
export default DateSelectorModal;