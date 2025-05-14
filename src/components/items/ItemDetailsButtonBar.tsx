import { View } from "react-native";
import Button from "../Button";
import useRequestStore from "@/stores/useRequestStore";
import { Common } from "@/styles/common";

const ItemDetailsButtonBar = () => {
    const {phase, storedId, setPhase} = useRequestStore();

    const nextPhase = () => {
        console.log("storedId: ", storedId);
        if (phase === "viewing")    setPhase("periodSetting");
        else if (phase === "periodSetting") setPhase("consenting");
        else if (phase === "consenting")    setPhase("applying");
    }

    return (
        <View style={[Common.bottomBar, {backgroundColor: "white"}]}>
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
                    <Button onPress={nextPhase} type="primary" style={{flex: 1}}>
                        취소  
                    </Button>
                    <Button onPress={nextPhase} type="primary" style={{flex: 3}}>
                        저장 
                    </Button>
                </View>
            }
            {phase==="applying" && 
                <View style={Common.XStack}>
                    <Button onPress={nextPhase} type="primary" style={{flex: 1}}>
                        신청하기  
                    </Button>
                </View>
            }
        </View>
    );
}

export default ItemDetailsButtonBar;