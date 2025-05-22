import { Text, View } from "react-native";
import { Common } from "@/styles/common";
import Checkbox from "expo-checkbox";
import { itemList } from "@/styles/components/itemList";
import { useBottomSheetStore } from "@/stores/useBottomSheetStore";
import { useEffect, useState } from "react";


const PolicyModal = () => {
    const {visible, setResult} = useBottomSheetStore();
    const [flawPolicy, setFlawPolicy] = useState(false);
    const [damagePolicy, setDamagePolicy] = useState(false);

    useEffect(() => {
        setResult({flawPolicy: flawPolicy, damagePolicy: damagePolicy});
    }, [flawPolicy, damagePolicy])
    

    if (!visible)   return null;
    
    return (
        <>
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