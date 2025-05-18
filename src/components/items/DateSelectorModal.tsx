import useDateSelectorStore from "@/stores/useDateSelectorStore"
import BottomScrollSheet from "../BottomScrollSheet";
import { Text, View } from "react-native";
import Button from "../Button";
import { Common } from "@/styles/common";
import Cancel from "@/assets/images/cancel.svg";
import DateSelector from "./DateSelector";


const DateSelectorModal = () => {
    const { visible, startDate, endDate, setStartDate, setEndDate, closeDateSelector } = useDateSelectorStore();

    if (!visible)   return null;
    
    return (
                <BottomScrollSheet snapPointList={["65%"]} style={{backgroundColor: "#fff"}}>
                    <View>
                        <Button type="option" onPress={() => closeDateSelector(false)} style={Common.cancel}>
                            <Cancel />
                        </Button>
                        <View style={{alignItems: "center", paddingVertical: 15,}}>
                            <Text style={{fontSize: 18, fontWeight: 500}}>일정 선택</Text>
                        </View>
                        <DateSelector 
                            startDate={startDate}
                            endDate={endDate}
                            setStartDate={setStartDate}
                            setEndDate={setEndDate}
                            />
                        <Button type="primary" onPress={() => closeDateSelector(true)}>
                            저장
                        </Button>
                    </View>
                </BottomScrollSheet>
    )
}
export default DateSelectorModal;