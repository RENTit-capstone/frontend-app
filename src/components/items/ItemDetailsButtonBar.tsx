import { SafeAreaView, Text, View } from "react-native";
import Button from "../Button";
import useRequestStore, { RequestPhaseType } from "@/stores/useRequestStore";
import { Common } from "@/styles/common";
import { itemList } from "@/styles/components/itemList";
import Colors from "@/constants/Colors";
import useDateSelectorStore from "@/stores/useDateSelectorStore";
import usePolicyStore from "@/stores/usePolicyStore";

const ItemDetailsButtonBar = (props: any) => {
    const {phase, setPhase, startDate, endDate, setStartDate, setEndDate, setChecked} = useRequestStore();
    const phases: RequestPhaseType[] = ["viewing", "periodSetting", "consenting", "applying"];
    const {openDateSelector, onCloseDateSelector} = useDateSelectorStore();
    const {openPolicy} = usePolicyStore();
    
    const moveNext = () => {
        // const currentPhaseIndex = phases.indexOf(phase);
        // setPhase(phases[currentPhaseIndex + direction]);
        if (phase==="viewing"){
            setPhase("periodSetting");
            handleDateSelect();
            onCloseDateSelector(() => {handlePolicy(); setPhase("consenting")}); 
        }
        // else if (phase==="periodSetting"){
        //     setPhase("consenting");
        // }
        else if (phase==="consenting"){
            setPhase("applying");
        }
    }

    const handleDateSelect = async () => {
        const { startDate, endDate } = await openDateSelector();
        setStartDate(startDate);
        setEndDate(endDate);
        console.log(startDate, endDate);
    }

    const handlePolicy = async () => {
        const { flawPolicy, damagePolicy } = await openPolicy();
        if (flawPolicy && damagePolicy)     setChecked(true);
    }

    return (
        <SafeAreaView style={[Common.bottomBar, Common.upperShadow, {backgroundColor: "white"}]}>
            {phase==="viewing" && 
                <Button onPress={moveNext} type="primary" style={Common.tabBarItem}>
                    일정 선택하기  
                </Button>
            }
            {/* {phase==="periodSetting" && 
                <View style={Common.XStack}>
                    <Button onPress={moveNext} type="primary" style={{flex: 1}}>
                        다음
                    </Button>
                </View>
            } */}
            {/* {phase==="consenting" && 
                <View style={Common.XStack}>
                    <Button onPress={moveNext} type="secondary" style={{flex: 1}}>
                        이전  
                    </Button>
                    <Button onPress={moveNext} type="primary" style={{flex: 3}}>
                        다음
                    </Button>
                </View>
            } */}
            {phase==="applying" && 
                <View style={Common.YStack}>
                    <View style={[Common.XStack, Common.fullScreen, {justifyContent: "space-between"}]}>
                        <Text style={Common.bold}>
                            <Text>{startDate?.replaceAll("-", ".")} ~ {endDate?.replaceAll("-", ".")}</Text>
                            <Text style={{fontSize: 16, color: Colors.option}}> | </Text>
                            <Text> 7일 </Text>
                        </Text>
                        <Text style={Common.bold}>5,000원</Text>
                    </View>
                    <View style={[itemList.rowDivider, {width: "100%"}]} />
                    <View style={Common.XStack}>
                        <Button onPress={moveNext} type="secondary" style={{flex: 1}}>
                            이전  
                        </Button>
                        <Button onPress={moveNext} type="primary" style={{flex: 3}}>
                            신청하기  
                        </Button>
                    </View>
                </View>
            }
        </SafeAreaView>
    );
}

export default ItemDetailsButtonBar;