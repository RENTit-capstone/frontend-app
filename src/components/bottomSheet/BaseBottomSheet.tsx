import { useBottomSheetStore } from '@/stores/useBottomSheetStore';
import BottomScrollSheet from '../BottomScrollSheet';
import ButtonBar from '../ButtonBar';
import { View } from 'react-native';
import Button from '../Button';
import Cancel from '@/assets/images/cancel.svg';
import { Common } from '@/styles/common';
import PolicyScreen from './Policy';
import CalendarScreen from './DateSelector';
import OTPScreen from './Otp';
import SliderScreen from './PriceSelector';
import ReturnImageScreen from './ReturnImage';

const bottomSheetMap = {
    none: () => <></>,
    policy: PolicyScreen,
    dateSelector: CalendarScreen,
    otp: OTPScreen,
    priceSelector: SliderScreen,
    returnImage: ReturnImageScreen,
};

const BaseBottomSheet = () => {
    const { visible, type, result, cancelResult, submitResult, prevCallback, nextCallback } =
        useBottomSheetStore();
    const SheetComponent = bottomSheetMap[type];

    if (!visible || !type) return null;

    return (
        <View style={Common.darkBackground}>
            <BottomScrollSheet snapPointList={['65%']} style={{ backgroundColor: '#fff' }}>
                <View>
                    <Button type="option" onPress={cancelResult} style={Common.cancel}>
                        <Cancel />
                    </Button>
                    <SheetComponent />
                </View>
            </BottomScrollSheet>
            <ButtonBar>
                {prevCallback && nextCallback ? (
                    <>
                        <Button type="secondary" onPress={() => prevCallback?.()}>
                            이전
                        </Button>
                        <Button type="primary" onPress={() => nextCallback?.()}>
                            다음
                        </Button>
                    </>
                ) : (
                    <Button type="primary" onPress={submitResult}>
                        확인
                    </Button>
                )}
            </ButtonBar>
        </View>
    );
};

export default BaseBottomSheet;
