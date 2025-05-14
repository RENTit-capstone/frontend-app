import { SafeAreaView, Text, View } from "react-native";
import Button from "../Button";
import useRequestStore from "@/stores/useRequestStore";
import { Common } from "@/styles/common";
import { itemList } from "@/styles/components/itemList";

const ItemDetailsButtonBar = () => {
    const {phase, storedId, setPhase} = useRequestStore();

    const nextPhase = () => {
        console.log("storedId: ", storedId);
        if (phase === "viewing")    setPhase("periodSetting");
        else if (phase === "periodSetting") setPhase("consenting");
        else if (phase === "consenting")    setPhase("applying");
    }
    const prevPhase = () => {
        if (phase === "consenting") setPhase("periodSetting");
    }

    return (
        <SafeAreaView style={[Common.bottomBar, Common.upperShadow, {backgroundColor: "white"}]}>
            {phase==="viewing" && 
                <Button onPress={nextPhase} type="primary" style={Common.tabBarItem}>
                    일정 선택하기  
                </Button>
            }
            {phase==="periodSetting" && 
                <View style={Common.XStack}>
                    <Button onPress={nextPhase} type="primary" style={{flex: 1}}>
                        초기화  
                    </Button>
                    <Button onPress={nextPhase} type="primary" style={{flex: 3}}>
                        적용 
                    </Button>
                </View>
            }
            {phase==="consenting" && 
                <View style={Common.XStack}>
                    <Button onPress={prevPhase} type="secondary" style={{flex: 1}}>
                        이전  
                    </Button>
                    <Button onPress={nextPhase} type="primary" style={{flex: 3}}>
                        저장 
                    </Button>
                </View>
            }
            {phase==="applying" && 
                <View style={Common.YStack}>
                    <View style={[Common.XStack, Common.fullScreen, {justifyContent: "space-between"}]}>
                        <Text style={Common.bold}>06.01 ~ 06.07 | 7일</Text>
                        <Text style={Common.bold}>5,000원</Text>
                    </View>
                    <View style={[itemList.rowDivider, {width: "100%"}]} />
                    <View style={Common.XStack}>
                        <Button onPress={prevPhase} type="secondary" style={{flex: 1}}>
                            이전  
                        </Button>
                        <Button onPress={nextPhase} type="primary" style={{flex: 3}}>
                            신청하기  
                        </Button>
                    </View>
                </View>
            }
        </SafeAreaView>
    );
}

export default ItemDetailsButtonBar;