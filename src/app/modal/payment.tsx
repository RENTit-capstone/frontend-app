import { View, Pressable, Dimensions, Alert } from 'react-native';
import Cancel from '@/assets/images/cancel.svg';
import { Common } from '@/styles/common';
import { Text } from 'react-native';
import Button from '@/components/Button';
import { useEffect, useState } from 'react';
import { ModalProps } from '@/types/types';
import usePostings from '@/hooks/usePostings';
import useAuthStore from '@/stores/useAuthStore';
import useRequestStore from '@/stores/useRequestStore';
import { axiosGet } from '@/api';

const PaymentModal = (props: ModalProps) => {
    const { visible, onClose } = props;
    const { handleRequest } = usePostings();
    const { name, price } = useRequestStore();
    const [data, setData] = useState<any>(null);

    const screen = Dimensions.get('screen');

    const [screenWidth, setScreenWidth] = useState(0);
    const [screenHeight, setScreenHeight] = useState(0);

    useEffect(() => {
        const getBalance = async () => {
            try {
                const response = await axiosGet(`/api/v1/wallet`);
                setData(response.data);
                console.log('잔액 조회:', response.data);
            } catch (error) {
                console.error(error);
                Alert.alert(`${error}`);
            }
        };
        getBalance();
    }, []);

    useEffect(() => {
        const checkDimensions = () => {
            setTimeout(() => {
                const screen = Dimensions.get('screen');
                setScreenWidth(screen.width);
                setScreenHeight(screen.height);
                console.log('Screen dimensions updated:', screen.width, screen.height);
            }, 50);
        };

        checkDimensions();

        const subscription = Dimensions.addEventListener('change', checkDimensions);
        return () => {
            subscription?.remove();
        };
    }, []);

    const handleCancel = () => {
        Alert.alert('결제를 취소하시겠습니까?', '', [
            {
                text: '아니요',
                style: 'cancel',
            },
            {
                text: '네',
                onPress: () => onClose(),
            },
        ]);
    };

    if (!data) return;
    if (!visible) return null;
    return (
        <View
            style={{
                // backgroundColor: 'red',
                position: 'absolute',
                width: screenWidth,
                height: screenHeight,
                flex: 1,
                justifyContent: 'center',
                backgroundColor: 'rgba(0,0,0,0.5)',
                alignItems: 'center',
                zIndex: 1000,
            }}
        >
            <View
                style={{
                    width: 500,
                    height: 400,
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
                    <View style={[Common.XStack, Common.spaceBetween]}>
                        <Text>상품명</Text>
                        <Text style={[Common.bold]}> {name} </Text>
                    </View>
                    <View style={[Common.XStack, Common.spaceBetween]}>
                        <Text>현재 잔액</Text>
                        <Text style={[Common.bold]}> {data.balance} </Text>
                    </View>
                    <View style={[Common.XStack, Common.spaceBetween]}>
                        <Text>결제 금액</Text>
                        <Text style={[Common.bold]}> {price} </Text>
                    </View>
                    <View style={[Common.XStack, Common.spaceBetween]}>
                        <Text>결제 계좌</Text>
                        <Text style={[Common.bold]}>
                            {data.backCode === 110 ? '농협  ' : '농협  '}
                            {data.finAcno}
                        </Text>
                    </View>
                    <View style={[Common.XStack, Common.spaceBetween]}>
                        <Text>결제 후 포인트 </Text>
                        <Text style={[Common.bold]}>
                            {parseInt(data.balance) - parseInt(price)}
                        </Text>
                    </View>
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
                    <Button type="primary" onPress={handleRequest}>
                        결제
                    </Button>
                </View>
            </View>
        </View>
    );
};
export default PaymentModal;
