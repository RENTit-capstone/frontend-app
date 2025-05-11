import useRequestStore from "@/stores/useRequestStore";
import BottomScrollSheet from "./BottomScrollSheet";
import { Text, View } from "react-native";
import DateSelector from "../itemList/DateSelector";

const ItemDetailsBottomSheet = () => {
    const {phase} = useRequestStore();

    return (
        <>
            {phase==="periodSetting" && 
                <BottomScrollSheet snapPointList={["40%"]}>
                    <DateSelector />
                </BottomScrollSheet>
            }
            {phase==="consenting" && 
                <BottomScrollSheet snapPointList={["40%"]}>
                    <View>
                        <Text>하자/파손정책 동의 체크박스</Text>
                    </View>    
                </BottomScrollSheet>
            }
        </>
    );
}

export default ItemDetailsBottomSheet;