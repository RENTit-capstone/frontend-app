import { useBottomSheetStore } from "@/stores/useBottomSheetStore";
import BottomScrollSheet from "../BottomScrollSheet";
import ButtonBar from "../ButtonBar";
import { View } from "react-native";
import Button from "../Button";
import Cancel from "@/assets/images/cancel.svg";
import { useState } from "react";
import { Common } from "@/styles/common";
import { calculateNewMassToMatchDuration } from "react-native-reanimated/lib/typescript/animation/springUtils";
import Test from "./Test";


const BaseBottomSheet = () => {
    // const resolve = useRef<(result: T) => void>();
    const {visible, result, cancelResult, submitResult} = useBottomSheetStore();

    if (!visible) return null;

    return (
        <>
        <BottomScrollSheet snapPointList={["65%"]} style={{ backgroundColor: "#fff" }}>
            <View>
            <Button type="option" onPress={() => cancelResult()} style={Common.cancel}>
                <Cancel />
            </Button>
            <Test />
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
