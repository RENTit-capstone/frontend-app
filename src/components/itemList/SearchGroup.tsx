import { View } from "react-native";
import DropDown from "../Dropdown";
import { Common } from "@/styles/common";
import { useState } from "react";
import useDateSelectorStore from "@/stores/useDateSelectorStore";
import Calendar from "@/assets/images/calendar.svg";
import DownArrow from "@/assets/images/down-arrow.svg";
import Colors from "@/constants/Colors";

const SearchGroup = () => {
    const {openDateSelector} = useDateSelectorStore();
    const [startDate, setStartDate] = useState<string | null>(null);
    const [endDate, setEndDate] = useState<string | null>(null);
    const [showSlider, setShowSlider] = useState(false);
    const [startPrice, setStartPrice] = useState<string | null>(null);
    const [endPrice, setEndPrice] = useState<string | null>(null);

    const handleDateSelect = async () => {
        const { startDate, endDate } = await openDateSelector();
        setStartDate(startDate);
        setEndDate(endDate);
        console.log(startDate, endDate);
    }
    const selected = Colors.out;
    
    return (
        <View style={[Common.XStack, Common.searchGroup]}>
            <DropDown 
                label="날짜 선택" 
                icon={<Calendar stroke={(!!startDate && !!endDate)? selected : "#111111"}/>}
                selectedColor={(!!startDate && !!endDate)? selected : undefined}
                onPress={() => handleDateSelect()} 
            />
            <DropDown 
                label="가격대" 
                icon={<DownArrow stroke={(!!startPrice && !!endPrice)? selected : "#111111"}/>} 
                selectedColor={(!!startPrice && !!endPrice)? selected : undefined}
                onPress={() => setShowSlider(true)}
            />
        </View>
    );
}

export default SearchGroup;