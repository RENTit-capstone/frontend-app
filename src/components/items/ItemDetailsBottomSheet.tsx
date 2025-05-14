import useRequestStore from "@/stores/useRequestStore";
import BottomScrollSheet from "../BottomScrollSheet";
import { Text, View } from "react-native";
import DateSelector, { DateSelectorRef } from "./DateSelector";
import { Common } from "@/styles/common";
import Cancel from "@/assets/images/cancel.svg";
import Button from "../Button";
import { useRef } from "react";

const ItemDetailsBottomSheet = () => {
    const {phase, setStartDate, setEndDate} = useRequestStore();
    const dateSelectorRef = useRef<DateSelectorRef>(null);

    const handlePress = () => {
        const dates = dateSelectorRef.current?.getDates();
        if (dates?.startDate && dates?.endDate) {
            setStartDate(dates.startDate);
            setEndDate(dates.endDate);
        }
    }

    return (
        <>

            {phase==="periodSetting" && 
                <View style={Common.darkBackground}>
                <BottomScrollSheet snapPointList={["65%"]} style={{backgroundColor: "#fff"}}>
                    <View>
                        <Button type="option" onPress={handlePress} style={Common.cancel}><Cancel /></Button>
                        <View style={{alignItems: "center", paddingVertical: 15,}}>
                            <Text style={{fontSize: 18, fontWeight: 500}}>일정 선택</Text>
                        </View>
                        <DateSelector ref={dateSelectorRef}/>
                    </View>
                </BottomScrollSheet>
                </View>
            }
            {phase==="consenting" && 
                <View style={Common.darkBackground}>
                <BottomScrollSheet snapPointList={["60%"]}>
                    <View>
                        <Text>하자/파손정책 동의 체크박스</Text>
                    </View>    
                </BottomScrollSheet>
                </View>
            }
        </>
    );
}

export default ItemDetailsBottomSheet;