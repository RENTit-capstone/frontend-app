import { axiosGet, axiosPost } from '@/api';
import Mypage from '@/app/(tabs)/mypage';
import Button from '@/components/Button';
import { Common } from '@/styles/common';
import { itemList } from '@/styles/components/itemList';
import { useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { Alert, Text, View } from 'react-native';

const products = [
    {
        point: 1000,
        price: 1200,
    },
    {
        point: 2000,
        price: 2400,
    },
    {
        point: 3000,
        price: 3500,
    },
    {
        point: 5000,
        price: 5500,
    },
];

const Product = () => {
    const router = useRouter();
    const memberId = useRef<number>(null);
    const [balance, setBalance] = useState(0);

    useEffect(() => {
        fetchWallet();
    }, []);

    const fetchWallet = async () => {
        try {
            const response = await axiosGet(`/api/v1/wallet`);
            setBalance(response.data.balance);
            memberId.current = response.data.memberId;
        } catch (error) {
            console.error(error);
            Alert.alert(`${error}`);
        }
    };

    const showAlert = (amount: number) => {
        Alert.alert(
            '결제 확인',
            `${amount}원을 결제하시겠습니까?`,
            [
                {
                    text: '아니요',
                    onPress: () => {},
                    style: 'cancel',
                },
                { text: '네', onPress: () => purchase(amount) },
            ],
            { cancelable: false },
        );
    };

    const purchase = async (amount: number) => {
        try {
            const payload = {
                memberId: memberId.current,
                amount: amount,
            };
            const response = await axiosPost(`/api/v1/wallet/top-up`, payload);
            if (!response.success) throw Error('결제에 실패했습니다.');
            Alert.alert('결제에 성공했습니다.');
            setBalance(balance + amount);
        } catch (error) {
            console.error(error);
            Alert.alert(`${error}`);
        }
    };

    return (
        <View style={[Common.container, Common.wrapper]}>
            <Text style={Common.bold}>포인트 구매</Text>
            <View>
                <Text style={Common.bold}>현재 나의 포인트: {balance} 포인트</Text>
            </View>
            <View style={Common.YStack}>
                {products.map((item) => (
                    <>
                        <View
                            style={[
                                Common.XStack,
                                {
                                    justifyContent: 'space-around',
                                    alignSelf: 'stretch',
                                    alignItems: 'center',
                                },
                            ]}
                        >
                            <Text>{item.point}포인트</Text>
                            <Button
                                type="primary"
                                onPress={() => showAlert(item.point)}
                                style={{ flex: 0, paddingHorizontal: 12 }}
                            >
                                {item.price}원
                            </Button>
                        </View>
                        <View style={itemList.rowDivider} />
                    </>
                ))}
            </View>
        </View>
    );
};
export default Product;
