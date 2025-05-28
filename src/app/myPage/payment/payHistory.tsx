import { axiosGet } from '@/api';
import { Common } from '@/styles/common';
import { itemList } from '@/styles/components/itemList';
import { useEffect, useState } from 'react';
import { Alert, Text, View } from 'react-native';

type PaymentStatusType = 'REQUESTED' | 'APPROVED' | 'FAILED';
type PaymentType =
    | 'TOP_UP'
    | 'WITHDRAWAL'
    | 'RENTAL_FEE'
    | 'LOCKER_FEE_RENTER'
    | 'LOCKER_FEE_OWNER';

type PayHistoryType = {
    paymentId: number;
    type: PaymentType;
    status: PaymentStatusType;
    amount: number;
    createdAt: string;
    itemName: string;
    ownerName: string;
    renterName: string;
};

const PayHistory = () => {
    const [data, setData] = useState<PayHistoryType[]>();

    useEffect(() => {
        fetchPayHistory();
    }, []);

    const fetchPayHistory = async () => {
        try {
            const response = await axiosGet(`/api/v1/payments`);
            console.log(response.data);
            setData(response.data);
        } catch (error) {
            console.error(error);
            Alert.alert(`${error}`);
        }
    };

    if (!data) return;

    return (
        <View style={[Common.container, Common.wrapper, Common.YStack]}>
            <Text>결제 내역 조회</Text>
            {data.map((item) => (
                <>
                    <View>
                        <Text>{item.createdAt}</Text>
                        <Text>{item.itemName}</Text>
                        <Text>{item.amount}원</Text>
                        <Text>{item.status}</Text>
                    </View>
                    <View style={itemList.rowDivider} />
                </>
            ))}
        </View>
    );
};
export default PayHistory;
