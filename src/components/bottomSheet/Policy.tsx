import BottomScrollSheet from "../BottomScrollSheet";
import { Text, View } from "react-native";
import Button from "../Button";
import { Common } from "@/styles/common";
import Cancel from "@/assets/images/cancel.svg";
import Checkbox from "expo-checkbox";
import { itemList } from "@/styles/components/itemList";
import usePolicyStore from "@/stores/usePolicyStore";
import ButtonBar from "../ButtonBar";


const PolicyModal = () => {
    const { visible, flawPolicy, damagePolicy, setDamagePolicy, setFlawPolicy, closePolicy } = usePolicyStore();

    if (!visible)   return null;
    
    return (
        <>
            <Button type="option" onPress={() => closePolicy(false)} style={Common.cancel}>
                <Cancel />
            </Button>

            <View style={Common.XStack}>
                <Checkbox
                    value={flawPolicy}
                    onValueChange={setFlawPolicy}
                    />

                <Text>하자를 확인하였습니다.</Text>
            </View>
            <View style={itemList.rowDivider} />
            <View style={Common.XStack}>
                <Checkbox
                    value={damagePolicy}
                    onValueChange={setDamagePolicy}
                    />
                <Text>파손정책에 동의합니다.</Text>
            </View>

        </>
    )
}
export default PolicyModal;