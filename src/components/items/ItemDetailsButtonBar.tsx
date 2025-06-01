import { Alert, Text, View } from 'react-native';
import Button from '../Button';
import useRequestStore from '@/stores/useRequestStore';
import { Common } from '@/styles/common';
import { itemList } from '@/styles/components/itemList';
import ButtonBar from '../ButtonBar';
import { useBottomSheetStore } from '@/stores/useBottomSheetStore';
import { useEffect, useState } from 'react';
import formatISOtoDate from '@/utils/formatDateString';

type RentalPhaseType = 'viewing' | 'dateSelecting' | 'policyConsenting' | 'applying';

const ItemDetailsButtonBar = (props: any) => {
    const [currentPhase, setCurrentPhase] = useState<RentalPhaseType>('viewing');
    const { handleRequest } = props;
    const {
        startDate,
        endDate,
        setStartDate,
        setEndDate,
        policyChecked,
        setPolicyChecked,
        clearRecord,
    } = useRequestStore();
    const { openBottomSheet, onNext, onPrev, cancelResult, submitResult, clearCallbacks } =
        useBottomSheetStore();

    useEffect(() => {
        return () => clear();
    }, []);

    useEffect(() => {
        if (currentPhase === 'viewing') return;
        setCallbacks();
        fetchBottomSheetResult();
    }, [currentPhase]);

    const clear = () => {
        clearRecord();
        clearCallbacks();
    };

    const setCallbacks = () => {
        clearCallbacks();

        onPrev(() => {
            cancelResult();
            if (currentPhase === 'policyConsenting') {
                setCurrentPhase('dateSelecting');
            }
        });
        onNext(() => {
            submitResult();
            if (currentPhase === 'dateSelecting') {
                setCurrentPhase('policyConsenting');
            } else if (currentPhase === 'policyConsenting') {
                if (!policyChecked) {
                    Alert.alert('모든 정책에 동의해주세요.');
                    return;
                }
                setCurrentPhase('applying');
            }
        });
    };

    const handlePhase = () => {
        if (!startDate || !endDate) setCurrentPhase('dateSelecting');
        else if (!policyChecked) setCurrentPhase('policyConsenting');
        else setCurrentPhase('applying');
        fetchBottomSheetResult();
    };

    const fetchBottomSheetResult = async () => {
        if (currentPhase === 'dateSelecting') {
            handleDateSelector();
        } else if (currentPhase === 'policyConsenting') {
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
                <Button type="primary" onPress={handlePhase}>
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
                                {formatISOtoDate(startDate)} ~ {formatISOtoDate(endDate)}
                            </Text>
                        </Text>
                        <Text style={Common.bold}>5,000원</Text>
                    </View>
                    <View style={[itemList.rowDivider, { width: '100%', marginTop: 16 }]} />
                    <View style={Common.XStack}>
                        <Button onPress={() => clear()} type="secondary" style={{ flex: 1 }}>
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
