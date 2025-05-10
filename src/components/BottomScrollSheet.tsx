import BottomSheet, { BottomSheetScrollView, useBottomSheetSpringConfigs } from "@gorhom/bottom-sheet";
import { ReactElement, useMemo, useRef } from "react";
import { itemList } from "@/styles/components/itemList";
<<<<<<< HEAD:src/components/BottomScrollSheet.tsx
import { View } from "react-native";
=======
import { StyleProps } from "react-native-reanimated";
>>>>>>> 745c70e (Design: 디자인 개선):src/components/bottomSheet/BottomScrollSheet.tsx

type BottomScrollSheetProps = {
    snapPointList: string[],
    children: ReactElement,
    style?: StyleProps
}

const BottomScrollSheet = (props: BottomScrollSheetProps) => {
    const {snapPointList, children, style} = props;

    const bottomSheetRef = useRef<BottomSheet>(null);
    const snapPoints = useMemo(() => snapPointList, []);

    const animationConfigs = useBottomSheetSpringConfigs({
        damping: 20,
        overshootClamping: false,
        restDisplacementThreshold: 0.5,
        restSpeedThreshold: 0.5,
        stiffness: 150,
    });

    return (
        <BottomSheet 
            ref={bottomSheetRef} 
            index={0} 
            snapPoints={snapPoints}
            animationConfigs={animationConfigs}
            enableDynamicSizing={false}
<<<<<<< HEAD:src/components/BottomScrollSheet.tsx
            backgroundStyle={itemList.bottomSheet}
            bottomInset={64}
=======
            backgroundStyle={[itemList.bottomSheet, style]}
>>>>>>> 745c70e (Design: 디자인 개선):src/components/bottomSheet/BottomScrollSheet.tsx
            >
            <BottomSheetScrollView contentContainerStyle={{flexGrow: 1}}>
                {children}
            </BottomSheetScrollView>
        </BottomSheet>
    )
}

export default BottomScrollSheet;