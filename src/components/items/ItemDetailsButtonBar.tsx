import { SafeAreaView, Text, View } from "react-native";
import Button from "../Button";
import useRequestStore, { RequestPhaseType } from "@/stores/useRequestStore";
import { Common } from "@/styles/common";
import { itemList } from "@/styles/components/itemList";
import Colors from "@/constants/Colors";
import ButtonBar from "../ButtonBar";

const ItemDetailsButtonBar = (props: any) => {
    const {handleRequest} = props;
    const {phase, setPhase, startDate, endDate, setStartDate, setEndDate, setChecked} = useRequestStore();
    // const {openDateSelector} = useDateSelectorStore();
    // const {openPolicy} = usePolicyStore();
    
    const moveNext = async () => {
        if (phase==="viewing"){
            setPhase("requesting");

            // const { startDate, endDate } = await openDateSelector();
            // setStartDate(startDate);
            // setEndDate(endDate);

            // const { flawPolicy, damagePolicy } = await openPolicy();
            // if (flawPolicy && damagePolicy){
            //     setChecked(true);
            //     setPhase("applying");
            // }     
        }
        else if (phase==="requesting") {
            setPhase("applying");
        }
    }

    return (
        <>
            {phase==="viewing" && 
                <ButtonBar onClose={() => moveNext()} />

            }
            {phase==="requesting" && 
                <View style={Common.XStack}>
                    <ButtonBar onClose={() => moveNext()} />

                </View>
            }
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