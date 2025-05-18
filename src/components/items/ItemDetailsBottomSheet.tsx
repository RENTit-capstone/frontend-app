import useRequestStore from "@/stores/useRequestStore";
import BottomScrollSheet from "../BottomScrollSheet";
import { Text, View } from "react-native";
import { Common } from "@/styles/common";
import Cancel from "@/assets/images/cancel.svg";
import Button from "../Button";
import { useEffect, useState } from "react";
import Checkbox from "expo-checkbox";
import { itemList } from "@/styles/components/itemList";
import ItemDetailsButtonBar from "./ItemDetailsButtonBar";
import useDateSelectorStore from "@/stores/useDateSelectorStore";

const ItemDetailsBottomSheet = (props: any) => {
    const {handleRequest} = props;
    const {phase, setChecked} = useRequestStore();

    const [identifiedFlaw, setIdentifiedFlaw] = useState(false);    
    const [agreedPolicy, setAgreedPolicy] = useState(false);

    useEffect(() => {
        setChecked(identifiedFlaw && agreedPolicy);
    }, [identifiedFlaw && agreedPolicy])

    const handleCancel = () => {

    }




    return (
        <>
            {phase==="consenting" && 
                <View style={Common.darkBackground}>
                <BottomScrollSheet snapPointList={["30%"]} style={{backgroundColor: "#fff"}}>
                    <View style={[Common.wrapper, Common.YStack, {gap: 16, alignItems: "flex-start"}]}>
                        <Button type="option" onPress={handleCancel} style={Common.cancel}><Cancel /></Button>
                        <View style={Common.XStack}>
                            <Checkbox
                                value={identifiedFlaw}
                                onValueChange={setIdentifiedFlaw}
                                />

                            <Text>하자를 확인하였습니다.</Text>
                        </View>
                        <View style={itemList.rowDivider} />
                        <View style={Common.XStack}>
                            <Checkbox
                                value={agreedPolicy}
                                onValueChange={setAgreedPolicy}
                                />
                            <Text>파손정책에 동의합니다.</Text>
                        </View>
                    </View>    
                </BottomScrollSheet>
                </View>
            }
            <ItemDetailsButtonBar handleRequest={handleRequest}/>
        </>
    );
}

export default ItemDetailsBottomSheet;