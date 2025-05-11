import BottomSheet, { BottomSheetScrollView, useBottomSheetSpringConfigs } from "@gorhom/bottom-sheet";
import { ReactElement, useMemo, useRef } from "react";
import { itemList } from "@/styles/components/itemList";

type BottomScrollSheetProps = {
    snapPointList: string[],
    children: ReactElement,
}

const BottomScrollSheet = (props: BottomScrollSheetProps) => {
    const {snapPointList, children} = props;

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
            backgroundStyle={itemList.bottomSheet}
            >
            <BottomSheetScrollView contentContainerStyle={{flexGrow: 1}}>
                {children}
            </BottomSheetScrollView>
        </BottomSheet>
    )
}

export default BottomScrollSheet;