import { useBottomSheetStore } from "@/stores/useBottomSheetStore";
import BottomScrollSheet from "../BottomScrollSheet";
import ButtonBar from "../ButtonBar";

const contentMap = {
    dateSelector: DateSelectorScreen,
    policy: PolicyScreen,
};

const BaseBottomSheet = () => {
    const { visible, bottomSheetScreenType, bottomSheetProps, closeBottomSheet } = useBottomSheetStore();

    if (!visible || !bottomSheetScreenType) return null;

    const BottomSheetContent = contentMap[bottomSheetScreenType];

    return (
        <>
            <BottomScrollSheet snapPointList={["65%"]} style={{backgroundColor: "#fff"}}>
                <BottomSheetContent {...bottomSheetProps} />
            </BottomScrollSheet>
            <ButtonBar onClose={() => closeBottomSheet()} />
        </>
);
};

export default BaseBottomSheet;
