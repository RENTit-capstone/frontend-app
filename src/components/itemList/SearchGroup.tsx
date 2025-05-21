import { Pressable, View } from "react-native";
import DropDown from "../Dropdown";
import { Common } from "@/styles/common";
import { useState } from "react";
import useDateSelectorStore from "@/stores/useDateSelectorStore";
import Calendar from "@/assets/images/calendar.svg";
import DownArrow from "@/assets/images/down-arrow.svg";
import Colors from "@/constants/Colors";
import TextInput from "../TextInput";
import SearchIcon from "@/assets/images/search.svg";

const SearchGroup = (props: any) => {
    const {onChange} = props;
    const {openDateSelector} = useDateSelectorStore();
    const [startDate, setStartDate] = useState<string>("");
    const [endDate, setEndDate] = useState<string>("");
    const [showSlider, setShowSlider] = useState(false);
    const [startPrice, setStartPrice] = useState<string>("");
    const [endPrice, setEndPrice] = useState<string>("");
    const [keyword, setKeyword] = useState("");

    const handleDateSelect = async () => {
        const { startDate, endDate } = await openDateSelector();
        setStartDate(startDate);    
        setEndDate(endDate);
        onChange({ startDate, endDate });
    }
    const handleKeywordSearch = () => {
        onChange({ keyword });
    }
    const dateSelected = (!!startDate && !!endDate);
    const priceSelected = (!!startPrice && !!endPrice);
    const selectedColor = Colors.out;
    const dateLabel = dateSelected ? `${startDate.replaceAll('-', '.')} ~ ${endDate.replaceAll('-', '.')}` : "날짜 선택";
    const priceLabel = priceSelected ? `${startPrice} - ${endPrice}` : "가격대";
    
    return (
        <View style={[Common.YStack, Common.searchGroup]}>
            <TextInput 
                label=""
                name="keyword"
                handleChangeText={setKeyword}
                placeholder="검색어를 입력해주세요"
                value={keyword}
                style={{paddingRight: 42, marginHorizontal: 14, marginTop: 15, borderRadius: 50}}
            />
            <Pressable style={Common.floatingIcon} onPress={handleKeywordSearch} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
                <SearchIcon />
            </Pressable>

            <View style={[Common.XStack, {marginVertical: 10}]}>
                <DropDown 
                    label={dateLabel}
                    icon={<Calendar stroke={dateSelected ? selectedColor : "#111111"}/>}
                    selectedColor={(!!startDate && !!endDate)? selectedColor : undefined}
                    onPress={handleDateSelect} 
                />
                <DropDown 
                    label={priceLabel}
                    icon={<DownArrow stroke={priceSelected ? selectedColor : "#111111"}/>} 
                    selectedColor={(!!startPrice && !!endPrice)? selectedColor : undefined}
                    onPress={() => setShowSlider(true)}
                />
            </View>
        </View>
    );
}

export default SearchGroup;