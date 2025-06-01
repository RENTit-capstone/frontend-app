import { Alert, Text, View } from 'react-native';
import Button from '../Button';
import useRequestStore from '@/stores/useRequestStore';
import { Common } from '@/styles/common';
import { itemList } from '@/styles/components/itemList';
import ButtonBar from '../ButtonBar';
import { useBottomSheetStore } from '@/stores/useBottomSheetStore';
import { useEffect } from 'react';
import toISOStringWithoutMs from '@/utils/toISOStringWithoutMS';
import formatDateString from '@/utils/formatDateString';

const ItemDetailsButtonBar = (props: any) => {
    const { handleRequest } = props;
    const {
        startDate,
        endDate,
        setStartDate,
        setEndDate,
        policyTexts,
        policyChecked,
        setPolicyChecked,
        clearRecord,
    } = useRequestStore();
    const { openBottomSheet, onNext, onPrev, cancelResult, submitResult, clearCallbacks } =
        useBottomSheetStore();

    // useEffect(() => {
    //     return () => {
    //         clearRecord();
    //         clearCallbacks();
    //     };
    // }, []);

    const fetchBottomSheetResult = async () => {
        clearCallbacks();

        onPrev(() => cancelResult());
        onNext(() => submitResult());

        if (!startDate || !endDate) {
            handleDateSelector();
        } else if (!policyChecked) {
            handlePolicyConsentor();
        }
    };

    const handleDateSelector = async () => {
        const {
            result: { startDate, endDate },
        } = await openBottomSheet('dateSelector');
        setStartDate(startDate);
        setEndDate(endDate);
    };
    const handlePolicyConsentor = async () => {
        const {
            result: { damagedDescriptionPolicy, damagePolicy, returnPolicy },
        } = await openBottomSheet('policy');
        setPolicyChecked(damagedDescriptionPolicy && damagePolicy && returnPolicy);
    };

    return (
        <>
            <ButtonBar>
                <Button type="primary" onPress={fetchBottomSheetResult}>
                    신청하기
                </Button>
            </ButtonBar>
            {startDate && endDate && policyChecked && (
                <View
                    style={[
                        Common.bottomBar,
                        Common.upperShadow,
                        { backgroundColor: 'white' },
                        Common.YStack,
                        { paddingTop: 16 },
                    ]}
                >
                    <View
                        style={[
                            Common.XStack,
                            Common.fullScreen,
                            { justifyContent: 'space-between' },
                        ]}
                    >
                        <Text style={Common.bold}>
                            <Text>
                                {toISOStringWithoutMs(startDate)} ~ {toISOStringWithoutMs(endDate)}
                            </Text>
                        </Text>
                        <Text style={Common.bold}>5,000원</Text>
                    </View>
                    <View style={[itemList.rowDivider, { width: '100%', marginTop: 16 }]} />
                    <View style={Common.XStack}>
                        <Button
                            onPress={() => console.log('초기화')}
                            type="secondary"
                            style={{ flex: 1 }}
                        >
                            초기화
                        </Button>
                        <Button onPress={handleRequest} type="primary" style={{ flex: 3 }}>
                            신청하기
                        </Button>
                    </View>
                </View>
            )}
        </>
    );
};

export default ItemDetailsButtonBar;
