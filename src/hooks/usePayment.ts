import { axiosGet } from '@/api';
import { useState } from 'react';
import { Alert } from 'react-native';

type PaymentDataType = {
    memberId: number;
    balance: number;
    finAcno: number;
    bankCode: number;
};

const usePayment = () => {
    const [data, setData] = useState<PaymentDataType>();

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

    return { getBalance, data };
};
export default usePayment;
