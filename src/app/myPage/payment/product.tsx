import { axiosGet, axiosPost } from '@/api';
import Mypage from '@/app/(tabs)/mypage';
import AddAccountModal from '@/app/modal/addAccount';
import Button from '@/components/Button';
import useAuthStore from '@/stores/useAuthStore';
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
    {
        point: 10000,
        price: 10000,
    },
];

type WalletType = {
    memberId: number;
    balance: number;
    finAcno: string;
    bankCode: string;
    consentAt: string;
    expiresAt: string;
};

const Product = () => {
    const router = useRouter();
    const memberId = useRef<number>(null);
    const [data, setData] = useState<WalletType>();
    const [balance, setBalance] = useState(0);
    const { userId } = useAuthStore();
    const [addAccountVisible, setAddAccountVisible] = useState(false);

    useEffect(() => {
        fetchWallet();
    }, []);

    const fetchWallet = async () => {
        try {
            const response = await axiosGet(`/api/v1/wallet`);
            setData(response.data);
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
                <View style={Common.XStack}>
                    <Button type="primary" onPress={() => setAddAccountVisible(true)}>
                        계좌 등록
                    </Button>
                </View>
                <Text style={[Common.bold, { fontSize: 16 }]}>나의 계좌: {data?.finAcno}</Text>
                <Text style={[Common.bold, { fontSize: 16 }]}>
                    현재 나의 포인트: {balance} 포인트
                </Text>
            </View>

            <View style={Common.YStack}>
                {products.map((item) => (
                    <View
                        key={item.point}
                        style={[
                            Common.XStack,
                            {
                                width: '100%',
                                backgroundColor: '#fff',
                                padding: 16,
                                marginBottom: 12,
                                borderRadius: 12,
                                // height: 50,
                                shadowColor: '#000',
                                shadowOffset: { width: 0, height: 1 },
                                shadowOpacity: 0.1,
                                shadowRadius: 4,
                                elevation: 2, // Android shadow
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                            },
                        ]}
                    >
                        <Text style={{ fontSize: 16 }}>{item.point} 포인트</Text>
                        <Button type="primary" onPress={() => showAlert(item.point)}>
                            {item.price.toLocaleString()}원
                        </Button>
                    </View>
                ))}
            </View>
            <AddAccountModal
                visible={addAccountVisible}
                onClose={() => setAddAccountVisible(false)}
            />
        </View>
    );
};
export default Product;
