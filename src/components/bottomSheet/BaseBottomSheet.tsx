import { useBottomSheetStore } from "@/stores/useBottomSheetStore";
import BottomScrollSheet from "../BottomScrollSheet";
import ButtonBar from "../ButtonBar";
import { View } from "react-native";
import Button from "../Button";
import Cancel from "@/assets/images/cancel.svg";
import { Common } from "@/styles/common";
import PolicyScreen from "./Policy";
import CanendarScreen from "./DateSelector";

const bottomSheetMap = {
    none: () => <></>,
    policy: PolicyScreen,
    dateSelector: CanendarScreen,
//   otp: OTPModal,
//   slider: SliderModal,
};

const BaseBottomSheet = () => {
    const {visible, type, result, cancelResult, submitResult} = useBottomSheetStore();
    console.log("Type: ", type);
    const SheetComponent = bottomSheetMap[type];

    if (!visible || !type) return null;

    return (
        <>
        <BottomScrollSheet snapPointList={["65%"]} style={{ backgroundColor: "#fff" }}>
            <View>
                <Button type="option" onPress={cancelResult} style={Common.cancel}>
                    <Cancel />
                </Button>
                <SheetComponent />
            </View>
        </BottomScrollSheet>
        <ButtonBar>
            <Button type="primary" onPress={submitResult}>
                이전
            </Button>
            <Button type="primary" onPress={submitResult}>
                다음
            </Button>
            {/* <Button type="primary" onPress={submitResult}>
                저장
            </Button> */}
        </ButtonBar>  
      </>
);
};

export default BaseBottomSheet;
