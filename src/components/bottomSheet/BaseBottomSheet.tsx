import { useBottomSheetStore } from "@/stores/useBottomSheetStore";
import BottomScrollSheet from "../BottomScrollSheet";
import ButtonBar from "../ButtonBar";
import { View } from "react-native";
import Button from "../Button";
import Cancel from "@/assets/images/cancel.svg";
import { Common } from "@/styles/common";
import Test from "./Test";

const bottomSheetMap = {
    test: Test,
    none: () => <></>,
//   policy: PolicyScreen,
//   dateSelector: DateScreen,
//   otp: OTPModal,
//   slider: SliderModal,
};

const BaseBottomSheet = () => {
    const {visible, type, result, cancelResult, submitResult} = useBottomSheetStore();
    console.log(type);
    const SheetComponent = bottomSheetMap[type];

    if (!visible || !type) return null;

    return (
        <>
        <BottomScrollSheet snapPointList={["65%"]} style={{ backgroundColor: "#fff" }}>
            <View>
            <Button type="option" onPress={() => cancelResult()} style={Common.cancel}>
                <Cancel />
            </Button>
            <SheetComponent />
            {/* {title && (
                <View style={{ alignItems: "center", paddingVertical: 15 }}>
                <Text style={{ fontSize: 18, fontWeight: "500" }}>{title}</Text>
                </View>
            )} */}
            {/* {children(submit, cancel)} */}
            </View>
        </BottomScrollSheet>
      <ButtonBar onClose={() => submitResult()} />        
      </>
);
};

export default BaseBottomSheet;
