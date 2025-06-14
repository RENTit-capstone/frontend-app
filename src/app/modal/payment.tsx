import { View, Pressable, useWindowDimensions } from 'react-native';
import Cancel from '@/assets/images/cancel.svg';
import { Common } from '@/styles/common';
import { Text } from 'react-native';
import Button from '@/components/Button';
import { useEffect } from 'react';
import { ModalProps } from '@/types/types';
import useRequestStore from '@/stores/useRequestStore';
import usePayment from '@/hooks/usePayment';
import { itemList } from '@/styles/components/itemList';
import { TextThemes } from '@/styles/theme';
import { useRouter } from 'expo-router';

const PaymentModal = (props: ModalProps) => {
    const { visible, onClose } = props;
    const { name, price } = useRequestStore();
    const { getBalance, data, handleCancel, handlePayment } = usePayment(onClose);
    const router = useRouter();

    const { width, height } = useWindowDimensions();

    useEffect(() => {
        getBalance();
    }, []);

    if (!data) return;
    if (!visible) return null;
    return (
        <View
            style={{
                position: 'absolute',
                width: width,
                height: height,
                flex: 1,
                justifyContent: 'center',
                backgroundColor: 'rgba(0,0,0,0.5)',
                alignItems: 'center',
                zIndex: 1000,
            }}
        >
            <View
                style={{
                    width: '80%',
                    height: '50%',
                    backgroundColor: 'white',
                    borderRadius: 16,
                    padding: 20,
                    justifyContent: 'space-between',
                }}
            >
                <Text style={[Common.bold, { textAlign: 'center' }]}>결제하기</Text>

                <View
                    style={[
                        Common.YStack,
                        { justifyContent: 'space-evenly', alignContent: 'center' },
                    ]}
                >
                    <View style={[Common.XStack, Common.spaceBetween, { alignItems: 'center' }]}>
                        <Text>상품명</Text>
                        <Text style={[Common.bold, { flexShrink: 1 }]}> {name} </Text>
                    </View>
                    <View style={[Common.XStack, Common.spaceBetween, { alignItems: 'center' }]}>
                        <Text>현재 잔액</Text>
                        <Text style={[Common.bold]}> {data.balance.toLocaleString()} </Text>
                    </View>
                    <View style={[Common.XStack, Common.spaceBetween, { alignItems: 'center' }]}>
                        <Text>결제 금액</Text>
                        <Text style={[Common.bold]}> {price} </Text>
                    </View>
                    <View style={[itemList.rowDivider, { width: '100%' }]} />
                    <View style={[Common.XStack, Common.spaceBetween, { alignItems: 'center' }]}>
                        <Text>결제 후 포인트 </Text>
                        <Text style={[Common.bold]}>
                            {price && (data.balance - price).toLocaleString()}{' '}
                        </Text>
                    </View>
                    {data.balance < price && (
                        <View style={[Common.XStack, { alignSelf: 'flex-end' }]}>
                            <Text style={TextThemes.error}>잔액이 부족합니다.</Text>
                        </View>
                    )}
                </View>
                <Pressable
                    onPress={handleCancel}
                    style={{
                        position: 'absolute',
                        top: 10,
                        right: 20,
                        zIndex: 10,
                        padding: 8,
                        borderRadius: 20,
                    }}
                >
                    <Cancel />
                </Pressable>
                <View style={Common.XStack}>
                    <Button type="secondary" onPress={handleCancel}>
                        취소
                    </Button>
                    {data.balance < price ? (
                        <Button
                            type="primary"
                            onPress={() => router.push('/myPage/payment/product')}
                        >
                            충전하기
                        </Button>
                    ) : (
                        <Button type="primary" onPress={handlePayment}>
                            결제
                        </Button>
                    )}
                </View>
            </View>
        </View>
    );
};
export default PaymentModal;
