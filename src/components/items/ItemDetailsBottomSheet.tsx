import useRequestStore from "@/stores/useRequestStore";
import BottomScrollSheet from "../BottomScrollSheet";
import { Text, View } from "react-native";
import DateSelector from "./DateSelector";
import { Common } from "@/styles/common";
import Cancel from "@/assets/images/cancel.svg";
import Button from "../Button";
import { useEffect, useRef, useState } from "react";
import Checkbox from "expo-checkbox";
import { itemList } from "@/styles/components/itemList";
import ItemDetailsButtonBar from "./ItemDetailsButtonBar";

const ItemDetailsBottomSheet = () => {
    const {phase, startDate, endDate, setStartDate, setEndDate, setChecked} = useRequestStore();
    const [identifiedFlaw, setIdentifiedFlaw] = useState(false);    
    const [agreedPolicy, setAgreedPolicy] = useState(false);

    useEffect(() => {
        setChecked(identifiedFlaw && agreedPolicy);
    }, [identifiedFlaw && agreedPolicy])

    const handleCancel = () => {

    }

    return (
        <>

            {phase==="periodSetting" && 
                <View style={Common.darkBackground}>
                <BottomScrollSheet snapPointList={["65%"]} style={{backgroundColor: "#fff"}}>
                    <View>
                        <Button type="option" onPress={handleCancel} style={Common.cancel}><Cancel /></Button>
                        <View style={{alignItems: "center", paddingVertical: 15,}}>
                            <Text style={{fontSize: 18, fontWeight: 500}}>일정 선택</Text>
                        </View>
                        <DateSelector 
                            startDate={startDate}
                            endDate={endDate}
                            setStartDate={setStartDate}
                            setEndDate={setEndDate}
                            />
                    </View>
                </BottomScrollSheet>
                </View>
            }
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
            <ItemDetailsButtonBar />
        </>
    );
}

export default ItemDetailsBottomSheet;