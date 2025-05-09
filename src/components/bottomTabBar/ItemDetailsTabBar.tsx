import { View } from "react-native";
import Button from "../Button";
import { bottomTabBar } from "@/styles/components/bottomTabBar";
import DateSelector from "../itemList/DateSelector";

const ItemDetailsTabBar = () => {
    const handlePress = () => {
        console.log("asdf");
        return (
            <DateSelector />
        )
    }

    return (
        <View style={bottomTabBar.itemDetailsTabBar}>
            <Button onPress={handlePress} type="primary" style={bottomTabBar.tabBarItem}>
                일정 선택하기      
            </Button>
        </View>
    );
}

export default ItemDetailsTabBar;