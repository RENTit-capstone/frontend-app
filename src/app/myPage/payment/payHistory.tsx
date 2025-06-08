import { axiosGet } from '@/api';
import Chip from '@/components/Chip';
import { Common } from '@/styles/common';
import { itemList } from '@/styles/components/itemList';
import { useEffect, useState } from 'react';
import { Alert, ScrollView, Text, View } from 'react-native';

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
            setData(response.data);
        } catch (error) {
            console.error(error);
            Alert.alert(`${error}`);
        }
    };

    const getTypeLabel = (type: PayHistoryType['type']) => {
        switch (type) {
            case 'TOP_UP':
                return '포인트 충전';
            case 'WITHDRAWAL':
                return '출금';
            case 'RENTAL_FEE':
                return '대여료';
            case 'LOCKER_FEE_RENTER':
                return '보관함 이용료(대여자)';
            case 'LOCKER_FEE_OWNER':
                return '보관함 이용료(소유자)';
            default:
                return type;
        }
    };

    const getStatusLabel = (status: PayHistoryType['status']) => {
        switch (status) {
            case 'REQUESTED':
                return '요청됨';
            case 'APPROVED':
                return '승인됨';
            case 'FAILED':
                return '실패';
            default:
                return status;
        }
    };

    const isIncome = (type: PayHistoryType['type']) => {
        return type === 'TOP_UP' || type === 'RENTAL_FEE' || type === 'LOCKER_FEE_OWNER';
    };

    // 날짜 포맷 yyyy.mm.dd
    const formatDate = (isoDate: string) => {
        const date = new Date(isoDate);
        return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`;
    };
    const getBorderColorByType = (type: PayHistoryType['type']) => {
        switch (type) {
            case 'TOP_UP':
                return '#007AFF'; // 파랑
            case 'WITHDRAWAL':
                return '#FF3B30'; // 빨강
            case 'RENTAL_FEE':
                return '#34C759'; // 초록
            case 'LOCKER_FEE_RENTER':
                return '#FF9500'; // 주황
            case 'LOCKER_FEE_OWNER':
                return '#AF52DE'; // 보라
            default:
                return '#ccc'; // 기본 회색
        }
    };

    const PaymentItem = ({ payment }: { payment: PayHistoryType }) => {
        const income = isIncome(payment.type);
        const amountColor = income ? '#007AFF' : '#FF3B30';

        return (
            <View style={{ padding: 12, borderBottomWidth: 1, borderColor: '#eee' }}>
                <View
                    style={[
                        Common.badge,
                        {
                            borderColor: getBorderColorByType(payment.type),
                            borderWidth: 1,
                            marginBottom: 4,
                        },
                    ]}
                >
                    <Text style={{ color: getBorderColorByType(payment.type) }}>
                        {getTypeLabel(payment.type)}
                    </Text>
                </View>
                {payment.type === 'RENTAL_FEE' && (
                    <Text>
                        {payment.renterName || '대여자'} → {payment.ownerName || '소유자'} /{' '}
                        {payment.itemName || '물품명'}
                    </Text>
                )}

                <View
                    style={[
                        Common.XStack,
                        {
                            justifyContent: 'space-between',
                            alignItems: 'flex-end',
                            marginTop: 16,
                        },
                    ]}
                >
                    <View>
                        <Text>
                            {getStatusLabel(payment.status)} | {formatDate(payment.createdAt)}
                        </Text>
                    </View>
                    <View>
                        <Text
                            style={{
                                color: amountColor,
                                fontWeight: 'bold',
                                fontSize: 20,
                                textAlign: 'right',
                            }}
                        >
                            {income ? '+' : '-'}
                            {payment.amount.toLocaleString()}원
                        </Text>
                    </View>
                </View>
            </View>
        );
    };

    if (!data) return;

    return (
        <View style={[Common.container, Common.wrapper]}>
            <ScrollView
                style={[
                    {
                        flex: 1,
                        backgroundColor: '#fff',
                        borderRadius: 16,
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.15,
                        shadowRadius: 8,
                        elevation: 4,
                    },
                ]}
            >
                {data.map((item) => (
                    <PaymentItem key={item.paymentId} payment={item} />
                ))}
            </ScrollView>

            {/*
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
         ))} */}
        </View>
    );
};
export default PayHistory;
