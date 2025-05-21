import useDateSelectorStore from "@/stores/useDateSelectorStore"
import BottomScrollSheet from "../BottomScrollSheet";
import { Text, View } from "react-native";
import Button from "../Button";
import { Common } from "@/styles/common";
import Cancel from "@/assets/images/cancel.svg";
import { Calendar } from "react-native-calendars";
import Chip from "../Chip";
import useDateSelector from "@/hooks/useDateSelector";
import ButtonBar from "../ButtonBar";
import BaseBottomSheet from "./BaseBottomSheet";


const DateSelectorModal = () => {
    const { visible, startDate, endDate, closeDateSelector } = useDateSelectorStore();
    const {onDayPress, markedDates, resetPeriod} = useDateSelector();

    if (!visible)   return null;
    
    return (
        <BaseBottomSheet>
        {/* <BottomScrollSheet snapPointList={["65%"]} style={{backgroundColor: "#fff"}}> */}
            {/* <View> */}
                <Button type="option" onPress={() => closeDateSelector(false)} style={Common.cancel}>
                    <Cancel />
                </Button>
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
        {/* </BottomScrollSheet>
        <ButtonBar onClose={() => closeDateSelector(true)} /> */}
        </BaseBottomSheet>
    )
}
export default DateSelectorModal;