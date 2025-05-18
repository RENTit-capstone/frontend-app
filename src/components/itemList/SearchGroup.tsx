import { Text, View } from "react-native";
import DropDown from "../Dropdown";
import { Common } from "@/styles/common";
import Calendar from "@/assets/images/calendar.svg";
import { useState } from "react";

const SearchGroup = () => {
    const [showDateSelector, setShowDateSelector] = useState(false);
    const [showSlider, setShowSlider] = useState(false);

    return (
        <View style={[Common.XStack, Common.searchGroup]}>
            <DropDown label="날짜 선택" onPress={() => setShowDateSelector(true)} />
            <DropDown label="가격대" onPress={() => setShowSlider(true)}/>
        </View>
    );
}

export default SearchGroup;