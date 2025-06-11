import { Alert, Text, View } from 'react-native';
import Button from '../Button';
import useRequestStore from '@/stores/useRequestStore';
import { Common } from '@/styles/common';
import { itemList } from '@/styles/components/itemList';
import ButtonBar from '../ButtonBar';
import { useBottomSheetStore } from '@/stores/useBottomSheetStore';
import { useEffect, useRef, useState } from 'react';
import formatISOtoDate from '@/utils/formatDateString';
import AddAccountModal from '@/app/modal/addAccount';
import PaymentModal from '@/app/modal/payment';
import usePayment from '@/hooks/usePayment';

type RentalPhaseType = 'viewing' | 'dateSelecting' | 'policyConsenting' | 'applying';

const ItemDetailsButtonBar = () => {
    const [currentPhase, setCurrentPhase] = useState<RentalPhaseType>('viewing');
    const [addAccountVisible, setAddAccountVisible] = useState(false);
    const [paymentVisible, setPaymentVisible] = useState(false);
    const dateSelected = useRef(false);
    const policyConsented = useRef(false);

    const { getBalance, data } = usePayment(() => {});
    const {
        startDate,
        endDate,
        setStartDate,
        setEndDate,
        itemData,
        policyChecked,
        setPolicyChecked,
        clearRecord,
    } = useRequestStore();
    const { openBottomSheet, onNext, onPrev, cancelResult, submitResult, clearCallbacks } =
        useBottomSheetStore();

    useEffect(() => {
        getBalance();
        return () => clearAll();
    }, []);

    useEffect(() => {
        if (currentPhase === 'viewing') return;

        setBottomSheetCallbacks();

        switch (currentPhase) {
            case 'policyConsenting':
                if (!dateSelected.current) {
                    showAlert(
                        '대여 시작일과 종료일을 선택해주세요.',
                        () => {
                            setCurrentPhase('dateSelecting');
                            handleDateSelector();
                        },
                        '같은 날짜를 한번 더 누르면 기간을 하루로 설정하실 수 있습니다.',
                    );
                    return;
                }
                break;
            case 'applying':
                if (!policyConsented.current) {
                    showAlert('모든 정책에 동의해주세요.', () => {
                        setCurrentPhase('policyConsenting');
                        handlePolicyConsentor();
                    });
                    return;
                }
                break;
        }

        fetchBottomSheetResult();
    }, [currentPhase]);

    const clearAll = () => {
        clearRecord();
        clearCallbacks();
    };

    const setBottomSheetCallbacks = () => {
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
                setCurrentPhase('applying');
            }
        });
    };

    const handlePhase = () => {
        if (!startDate || !endDate) {
            setCurrentPhase('dateSelecting');
            handleDateSelector();
        } else if (!policyChecked) {
            setCurrentPhase('policyConsenting');
        } else {
            setCurrentPhase('applying');
        }
    };

    const fetchBottomSheetResult = async () => {
        if (currentPhase === 'dateSelecting') {
            await handleDateSelector();
        } else if (currentPhase === 'policyConsenting') {
            await handlePolicyConsentor();
        }
    };

    const handleDateSelector = async () => {
        const {
            result: { startDate, endDate },
        } = await openBottomSheet('dateSelector', {
            selectableStartDate: new Date(itemData.startDate),
            selectableEndDate: new Date(itemData.endDate),
            startDate: null,
            endDate: null,
        });
        setStartDate(startDate);
        setEndDate(endDate);
        dateSelected.current = !!startDate && !!endDate;
    };

    const handlePolicyConsentor = async () => {
        const {
            result: { damagedDescriptionPolicy, damagePolicy, returnPolicy },
        } = await openBottomSheet('policy');
        const allChecked = damagedDescriptionPolicy && damagePolicy && returnPolicy;
        setPolicyChecked(allChecked);
        policyConsented.current = allChecked;
    };

    const handlePayment = () => {
        if (!data?.finAcno) {
            showAlert(
                '결제 계좌를 등록하지 않았습니다.',
                () => {
                    setAddAccountVisible(true);
                },
                '등록 페이지로 이동합니다',
            );
        } else {
            setPaymentVisible(true);
        }
    };

    const showAlert = (title: string, onConfirm?: () => void, message?: string) => {
        Alert.alert(title, message ?? '', [
            {
                text: '확인',
                onPress: () => onConfirm?.(),
            },
        ]);
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
                            { justifyContent: 'space-between', paddingHorizontal: 16 },
                        ]}
                    >
                        <Text style={Common.bold}>
                            {formatISOtoDate(startDate)} ~ {formatISOtoDate(endDate)}
                        </Text>
                        <Text style={Common.bold}>{itemData.price.toLocaleString()}원</Text>
                    </View>
                    <View style={[itemList.rowDivider, { width: '100%', marginTop: 16 }]} />
                    <View style={[Common.XStack, { paddingHorizontal: 16 }]}>
                        <Button onPress={clearAll} type="secondary" style={{ flex: 1 }}>
                            초기화
                        </Button>
                        <Button onPress={handlePayment} type="primary" style={{ flex: 3 }}>
                            결제하기
                        </Button>
                    </View>
                </View>
            )}

            <AddAccountModal
                visible={addAccountVisible}
                onClose={() => setAddAccountVisible(false)}
            />
            <PaymentModal visible={paymentVisible} onClose={() => setPaymentVisible(false)} />
        </>
    );
};

export default ItemDetailsButtonBar;
