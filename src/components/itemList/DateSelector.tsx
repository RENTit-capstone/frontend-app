import { Common } from "@/styles/common";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet"
import { useMemo, useRef } from "react"
import { Text } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";


const DateSelector = () => {
    const bottomSheetRef = useRef<BottomSheet>(null);
    const snapPoints = useMemo(() => ["50%"], []);

    return (
        <GestureHandlerRootView style={Common.container}>
        
        <BottomSheet
            ref={bottomSheetRef}
            index={0}
            snapPoints={snapPoints}
            enableDynamicSizing={false}
        >
            <BottomSheetView>
                <Text>asdf</Text>
            </BottomSheetView>

        </BottomSheet>
        </GestureHandlerRootView>
    );
}

export default DateSelector;