import { Button, Text, View } from "react-native";
import BottomScrollSheet from "../bottomSheet/BottomScrollSheet";


const DateSelector = () => {
    return (   
        <BottomScrollSheet snapPointList={["40%"]}>
            <View>
                <Text>일정 선택</Text>
                <Button title="X"></Button>
            </View>
        </BottomScrollSheet>
    );
}

export default DateSelector;