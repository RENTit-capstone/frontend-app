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
        price: 1000,
    },
    {
        point: 2000,
        price: 2000,
    },
    {
        point: 3000,
        price: 3000,
    },
    {
        point: 5000,
        price: 5000,
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
            <View style={{ marginBottom: 24 }}>
                <Text style={[Common.bold, { fontSize: 16 }]}>
                    현재 나의 포인트: {balance} 포인트
                </Text>
            </View>

            <View style={Common.YStack}>
                {products.map((item) => (
                    <View
                        key={item.point}
                        style={{
                            width: '100%',
                            backgroundColor: '#fff',
                            padding: 16,
                            marginBottom: 12,
                            borderRadius: 12,
                            shadowColor: '#000',
                            shadowOffset: { width: 0, height: 1 },
                            shadowOpacity: 0.1,
                            shadowRadius: 4,
                            elevation: 2, // Android shadow
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}
                    >
                        <Text style={{ fontSize: 16 }}>{item.point} 포인트</Text>
                        <Button
                            type="primary"
                            onPress={() => showAlert(item.point)}
                            style={{ paddingHorizontal: 16, paddingVertical: 8, flexGrow: 0 }}
                        >
                            {item.price.toLocaleString()}원
                        </Button>
                    </View>
                ))}
            </View>
        </View>
    );
};
export default Product;
