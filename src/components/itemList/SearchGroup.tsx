import { View } from "react-native";
import DropDown from "../Dropdown";
import { Common } from "@/styles/common";
import { useState } from "react";
import useDateSelectorStore from "@/stores/useDateSelectorStore";
import Calendar from "@/assets/images/calendar.svg";
import DownArrow from "@/assets/images/down-arrow.svg";
import Colors from "@/constants/Colors";

const SearchGroup = (props: any) => {
    const {onChange} = props;
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
        onChange({ startDate: startDate, endDate: endDate, startPrice: startPrice, endPrice: endPrice });
        console.log(startDate, endDate);
    }
    const dateSelected = (!!startDate && !!endDate);
    const priceSelected = (!!startPrice && !!endPrice);
    const selectedColor = Colors.out;
    const dateLabel = dateSelected ? `${startDate.replaceAll('-', '.')} ~ ${endDate.replaceAll('-', '.')}` : "날짜 선택";
    const priceLabel = priceSelected ? `${startPrice} - ${endPrice}` : "가격대";
    
    return (
        <View style={[Common.XStack, Common.searchGroup]}>
            <DropDown 
                label={dateLabel}
                icon={<Calendar stroke={dateSelected ? selectedColor : "#111111"}/>}
                selectedColor={(!!startDate && !!endDate)? selectedColor : undefined}
                onPress={() => handleDateSelect()} 
            />
            <DropDown 
                label={priceLabel}
                icon={<DownArrow stroke={priceSelected ? selectedColor : "#111111"}/>} 
                selectedColor={(!!startPrice && !!endPrice)? selectedColor : undefined}
                onPress={() => setShowSlider(true)}
            />
        </View>
    );
}

export default SearchGroup;