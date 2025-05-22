import { Text, View } from "react-native";
import Button from "../Button";
import useRequestStore, { RequestPhaseType } from "@/stores/useRequestStore";
import { Common } from "@/styles/common";
import { itemList } from "@/styles/components/itemList";
import Colors from "@/constants/Colors";
import ButtonBar from "../ButtonBar";
import { useBottomSheetStore } from "@/stores/useBottomSheetStore";
import { useCallback, useEffect, useState } from "react";
import formatISOToDate from "@/utils/formatDate";

const ItemDetailsButtonBar = (props: any) => {
    const {handleRequest} = props;
    // const {phase, setPhase, startDate, endDate, setStartDate, setEndDate, setFlawPolicyChecked, setDamagePolicyChecked, clearRecord} = useRequestStore();
    const {openBottomSheet, onNext, onPrev, cancelResult, submitResult, clearCallbacks} = useBottomSheetStore();

    const phase = ["viewing", "dateSelecting", "policyConsenting", "applying" as keyof RequestPhaseType];
    const [current, setCurrent] = useState(0);
    const [startDate, setStartDate] = useState<string | null>(null);
    const [endDate, setEndDate] = useState<string | null>(null);
    const [flawPolicyChecked, setFlawPolicyChecked] = useState(false);
    const [damagePolicyChecked, setDamagePolicyChecked] = useState(false);
    
    useEffect(() => {
        console.log(current);
        const fetchBottomSheetResult = async () => {
            if (phase[current] === "dateSelecting") {
                handleDateSelector();
            } else if (phase[current] === "policyConsenting") {
                handlePolicyConsentor();
            }
        };
        fetchBottomSheetResult();
    }, [current]);

    useEffect(() => {
        onPrev(() => {
            console.log("이전");
            cancelResult();
            if (current==0) setCurrent(0);
            else setCurrent(prev => prev-1);
        });

        onNext(() => {
            console.log("다음");
            submitResult(); 
            console.log("fesfsdwfesf")
            if (current==3) setCurrent(3);
            else setCurrent(prev => prev+1);
        })
        return () => {
            // clearRecord();
            clearCallbacks();
        }
    }, [current]);


const handleDateSelector = async () => {
    const { result: { startDate, endDate } } = await openBottomSheet("dateSelector");
    setStartDate(startDate);
    setEndDate(endDate);
}
const handlePolicyConsentor = async () => {
    const { result: { flawPolicy, damagePolicy } } = await openBottomSheet("policy");
    setFlawPolicyChecked(flawPolicy);
    setDamagePolicyChecked(damagePolicy);
}

    return (
        <>
            {phase[current]==="viewing" && 
                <ButtonBar>
                    <Button type="primary" onPress={() => setCurrent(1)}>신청하기</Button>
                </ButtonBar>

            }
            {phase[current]==="applying" && 
                <View style={[Common.bottomBar, Common.upperShadow, {backgroundColor: "white"}, Common.YStack, {paddingTop: 16}]}>
                    <View style={[Common.XStack, Common.fullScreen, {justifyContent: "space-between"}]}>
                        <Text style={Common.bold}>
                            <Text>{formatISOToDate(startDate || "")} ~ {formatISOToDate(endDate || "")}</Text>
                            {/* <Text style={{fontSize: 16, color: Colors.option}}> | </Text>
                            <Text> 7일 </Text> */}
                        </Text>
                        <Text style={Common.bold}>5,000원</Text>
                    </View>
                    <View style={[itemList.rowDivider, {width: "100%", marginTop: 16}]} />
                    <View style={Common.XStack}>
                        <Button onPress={() => setCurrent(2)} type="secondary" style={{flex: 1}}>
                            이전  
                        </Button>
                        <Button onPress={handleRequest} type="primary" style={{flex: 3}}>
                            신청하기  
                        </Button>
                    </View>
                </View>
            }
        </>
    );
}

export default ItemDetailsButtonBar;