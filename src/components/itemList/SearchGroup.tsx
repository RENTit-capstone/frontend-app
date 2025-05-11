import { Text, View } from "react-native";
import DropDown from "../Dropdown";
import { Common } from "@/styles/common";

const SearchGroup = () => {
    return (
        <View style={Common.XStack}>
            <DropDown>
                날짜 선택
            </DropDown>
            <DropDown>
                가격대
            </DropDown>
        </View>
    );
}

export default SearchGroup;