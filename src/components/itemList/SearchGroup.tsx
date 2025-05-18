import { View } from "react-native";
import DropDown from "../Dropdown";
import { Common } from "@/styles/common";
import { useState } from "react";
import useDateSelectorStore from "@/stores/useDateSelectorStore";

const SearchGroup = () => {
    const {openDateSelector} = useDateSelectorStore();
    const [startDate, setStartDate] = useState<string | null>(null);
    const [endDate, setEndDate] = useState<string | null>(null);
    const [showSlider, setShowSlider] = useState(false);

    const handleDateSelect = async () => {
        const { startDate, endDate } = await openDateSelector();
        setStartDate(startDate);
        setEndDate(endDate);
        console.log(startDate, endDate);
    }
    
    return (
        <View style={[Common.XStack, Common.searchGroup]}>
            <DropDown label="날짜 선택" onPress={() => handleDateSelect()} />
            <DropDown label="가격대" onPress={() => setShowSlider(true)}/>
        </View>
    );
}

export default SearchGroup;