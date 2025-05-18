import { Calendar } from "react-native-calendars";
import Chip from "../Chip";
import { Common } from "@/styles/common";
import { View } from "react-native";
import useDateSelector from "@/hooks/useDateSelector";
import useDateSelectorStore from "@/stores/useDateSelectorStore";

const DateSelector = (props: any) => {
    const {onDayPress, markedDates, resetPeriod} = useDateSelector();
    const {startDate, endDate} = useDateSelectorStore();

    return (   
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
    );
};

export default DateSelector;