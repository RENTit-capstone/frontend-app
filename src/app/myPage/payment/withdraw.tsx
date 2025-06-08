import { axiosGet, axiosPost } from '@/api';
import Mypage from '@/app/(tabs)/mypage';
import AddAccountModal from '@/app/modal/addAccount';
import Button from '@/components/Button';
import useAuthStore from '@/stores/useAuthStore';
import { Common } from '@/styles/common';
import { useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { Alert, Text, TextInput, View } from 'react-native';

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
    const [amount, setAmount] = useState('');

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

    const showAlert = () => {
        Alert.alert(
            '출금 확인',
            `${amount}원을 인출하시겠습니까?`,
            [
                {
                    text: '아니요',
                    onPress: () => {},
                    style: 'cancel',
                },
                { text: '네', onPress: () => handleWithdraw() },
            ],
            { cancelable: false },
        );
    };

    const handleWithdraw = async () => {
        if (isNaN(parseInt(amount)) || parseInt(amount) <= 0) {
            Alert.alert('입력 오류', '유효한 출금 금액을 입력하세요.');
            return;
        }

        if (parseInt(amount) > balance) {
            Alert.alert('잔액 부족', '입력한 금액이 현재 잔액을 초과했습니다.');
            return;
        }

        try {
            const res = await axiosPost(`/api/v1/wallet/withdraw`, {
                memberId: memberId.current,
                amount: amount,
            });
            console.log(res);
            Alert.alert('출금 완료', `${amount.toLocaleString()}원이 출금되었습니다.`);
            setBalance(balance - parseInt(amount));
        } catch (error) {
            console.error(error);
            Alert.alert('출금 실패', '출금 요청 중 문제가 발생했습니다.');
        }
    };

    return (
        <View style={[Common.container, Common.wrapper]}>
            <View style={{ marginBottom: 24 }}>
                <Text style={[Common.bold, { fontSize: 16 }]}>나의 계좌: {data?.finAcno}</Text>
                <Text style={[Common.bold, { fontSize: 16 }]}>
                    현재 나의 포인트: {balance} 포인트
                </Text>
                <TextInput
                    value={amount}
                    onChangeText={setAmount}
                    placeholder="출금할 금액 입력"
                    keyboardType="numeric"
                    style={Common.textInput}
                />
                <View style={Common.XStack}>
                    <Button type="primary" onPress={showAlert}>
                        인출하기
                    </Button>
                </View>
            </View>
        </View>
    );
};
export default Product;
