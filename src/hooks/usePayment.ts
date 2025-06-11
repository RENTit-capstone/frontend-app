import { axiosGet } from '@/api';
import { useState } from 'react';
import { Alert } from 'react-native';
import usePostings from './usePostings';

type PaymentDataType = {
    memberId: number;
    balance: number;
    finAcno: number;
    bankCode: number;
};

const usePayment = (onClose: () => void) => {
    const [data, setData] = useState<PaymentDataType>();
    const { handleRequest } = usePostings();

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

    const handlePayment = async () => {
        Alert.alert('결제하시겠습니까?', '', [
            {
                text: '아니요',
                style: 'cancel',
            },
            {
                text: '네',
                onPress: async () => handleRequest(),
            },
        ]);
    };

    return { getBalance, data, handleCancel, handlePayment };
};
export default usePayment;
