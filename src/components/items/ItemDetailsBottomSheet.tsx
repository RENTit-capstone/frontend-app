import useRequestStore from "@/stores/useRequestStore";
import BottomScrollSheet from "../BottomScrollSheet";
import { Text, View } from "react-native";
import DateSelector, { DateSelectorRef } from "./DateSelector";
import { Common } from "@/styles/common";
import Cancel from "@/assets/images/cancel.svg";
import Button from "../Button";
import { useEffect, useRef, useState } from "react";
import Checkbox from "expo-checkbox";
import { itemList } from "@/styles/components/itemList";
import ItemDetailsButtonBar from "./ItemDetailsButtonBar";

const ItemDetailsBottomSheet = () => {
    const {phase, setStartDate, setEndDate} = useRequestStore();
    const dateSelectorRef = useRef<DateSelectorRef>(null);
    const [savePeriod, setSavePeriod] = useState(false);
    const [identifiedFlaw, setIdentifiedFlaw] = useState(false);    
    const [agreedPolicy, setAgreedPolicy] = useState(false);

    useEffect(() => {
        const dates = dateSelectorRef.current?.getDates();
        if (dates?.startDate && dates?.endDate) {
            setStartDate(dates.startDate);
            setEndDate(dates.endDate);
            console.log("Period: ", dates);
        }
    }, [savePeriod])

    const handleCancel = () => {

    }

    const handleSaveConsent = () => {
        
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
                        <DateSelector ref={dateSelectorRef}/>
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
            <ItemDetailsButtonBar onSavePeriod={setSavePeriod} onSaveConsent={handleSaveConsent} />
        </>
    );
}

export default ItemDetailsBottomSheet;