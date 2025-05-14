import { SafeAreaView, Text, View } from "react-native";
import Button from "../Button";
import useRequestStore, { RequestPhaseType } from "@/stores/useRequestStore";
import { Common } from "@/styles/common";
import { itemList } from "@/styles/components/itemList";
import Colors from "@/constants/Colors";
import { axiosPost } from "@/api";

const ItemDetailsButtonBar = () => {
    const {phase, setPhase, startDate, endDate} = useRequestStore();
    const phases: RequestPhaseType[] = ["viewing", "periodSetting", "consenting", "applying"];

    const movePhase = (direction: number) => {
        const currentPhaseIndex = phases.indexOf(phase);
        setPhase(phases[currentPhaseIndex + direction]);
    }

    const handleRequest = async () => {
        try {
            const payload = {
                "itemId": 0,
                "ownerId": 0,
                "renterId" :0,
                "startDate": startDate, //ISOstring으로 변경
                "dueDate": endDate,
            }
            const response = await axiosPost(`/api/v1/rentals`, payload);
            console.log("Response for submitRequest: ", response.data);
        }
        catch(error) {
            console.log(error);     //TODO: toast message 띄우기
        }  
    }

    return (
        <SafeAreaView style={[Common.bottomBar, Common.upperShadow, {backgroundColor: "white"}]}>
            {phase==="viewing" && 
                <Button onPress={() => movePhase(1)} type="primary" style={Common.tabBarItem}>
                    일정 선택하기  
                </Button>
            }
            {phase==="periodSetting" && 
                <View style={Common.XStack}>
                    <Button onPress={() => movePhase(1)} type="primary" style={{flex: 1}}>
                        다음
                    </Button>
                </View>
            }
            {phase==="consenting" && 
                <View style={Common.XStack}>
                    <Button onPress={() => movePhase(-1)} type="secondary" style={{flex: 1}}>
                        이전  
                    </Button>
                    <Button onPress={() => movePhase(1)} type="primary" style={{flex: 3}}>
                        다음
                    </Button>
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
                        <Button onPress={() => movePhase(-1)} type="secondary" style={{flex: 1}}>
                            이전  
                        </Button>
                        <Button onPress={handleRequest} type="primary" style={{flex: 3}}>
                            신청하기  
                        </Button>
                    </View>
                </View>
            }
        </SafeAreaView>
    );
}

export default ItemDetailsButtonBar;