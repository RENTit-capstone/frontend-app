import useRequestStore from "@/stores/useRequestStore";
import BottomScrollSheet from "../BottomScrollSheet";
import { Text, View } from "react-native";
import DateSelector from ".//DateSelector";
import { Common } from "@/styles/common";
import Cancel from "@/assets/images/cancel.svg";
import { itemList } from "@/styles/components/itemList";
import Button from "../Button";

const ItemDetailsBottomSheet = () => {
    const {phase} = useRequestStore();

    const handlePress = () => {

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
                        <DateSelector />
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