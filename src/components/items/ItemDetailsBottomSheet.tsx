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

    return (
        <>
            {phase==="periodSetting" && 
                <BottomScrollSheet snapPointList={["70%"]} style={{backgroundColor: "#fff"}}>
                    <View>
                        <View style={Common.XStack}>
                            <View style={{flex: 10, alignItems: "center"}}>
                                <Text style={{fontSize: 16, fontWeight: 500}}>일정 선택</Text>
                            </View>
                            <button><Cancel /></button>
                        </View>
                        <DateSelector />
                    </View>
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