import BottomSheet, {
    BottomSheetScrollView,
    useBottomSheetSpringConfigs,
} from '@gorhom/bottom-sheet';
import { ReactElement, useMemo, useRef } from 'react';
import { itemList } from '@/styles/components/itemList';
import { StyleProps } from 'react-native-reanimated';

type BottomScrollSheetProps = {
    snapPointList: string[];
    children: ReactElement;
    style?: StyleProps;
    bottomInsent?: number;
};

const BottomScrollSheet = (props: BottomScrollSheetProps) => {
    const { snapPointList, children, style, bottomInsent = 64 } = props;

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
            bottomInset={bottomInsent}
            backgroundStyle={[itemList.bottomSheet, style]}
        >
            <BottomSheetScrollView contentContainerStyle={{ flexGrow: 1 }}>
                {children}
            </BottomSheetScrollView>
        </BottomSheet>
    );
};

export default BottomScrollSheet;
