import { View, Text, Image } from 'react-native';
import { Colors } from '@/styles/tokens';
import formatISOToDateTime from '@/utils/formatISOToDateTime';
import { useEffect, useState } from 'react';
import { axiosGet } from '@/api';
import useAuthStore from '@/stores/useAuthStore';

const InfoRow = ({ label, value }: { label: string; value: string | null }) => {
    return (
        <View
            style={{
                alignSelf: 'stretch',
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingVertical: 6,
                borderBottomWidth: 1,
                borderBottomColor: Colors.gray,
            }}
        >
            <Text>{label}</Text>
            <Text
                style={{
                    fontWeight: '500',
                    maxWidth: '60%',
                    textAlign: 'right',
                }}
            >
                {value || '-'}
            </Text>
        </View>
    );
};

const fields: {
    key: keyof any;
    label: string;
    formatDate?: boolean;
}[] = [
    { key: 'renterId', label: '대여자' },
    { key: 'ownerId', label: '소유자' },
    { key: 'requestDate', label: '대여 요청 일시', formatDate: true },
    { key: 'approvedDate', label: '대여 승인 일시', formatDate: true },
    { key: 'rejectedDate', label: '대여 거절 일시', formatDate: true },
    { key: 'startDate', label: '대여 시작 일시', formatDate: true },
    { key: 'dueDate', label: '반납 예정 일시', formatDate: true },
    { key: 'leftByOwnerAt', label: '사물함 보관 일시', formatDate: true },
    { key: 'pickedUpByRenterAt', label: '물건 수령 일시', formatDate: true },
    { key: 'returnedByRenterAt', label: '반납 일시', formatDate: true },
    { key: 'retrievedByOwnerAt', label: '물건 회수 일시', formatDate: true },
    { key: 'lockerId', label: '사물함 번호' },
];

const RentalDetails = ({ details }: { details: any }) => {
    console.log(details.returnImageUrl.length);
    const [renter, setRenter] = useState<string>();
    const { userName } = useAuthStore();

    useEffect(() => {
        const fetchRenterInfo = async () => {
            try {
                const renterInfo = await axiosGet(`/api/v1/members/${details.renterId}`);
                setRenter(renterInfo.data.nickname);
                console.log(renterInfo.data.nickname);
            } catch (error) {
                console.error(error);
            }
        };
        fetchRenterInfo();
    }, []);

    return (
        <View
            style={{
                backgroundColor: 'white',
                borderRadius: 16,
                padding: 16,
                alignSelf: 'stretch',
                marginVertical: 16,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.15,
                shadowRadius: 8,
                elevation: 4,
            }}
        >
            {fields.map(({ key, label, formatDate }) => {
                const rawValue = details[key];
                const value =
                    rawValue && formatDate
                        ? formatISOToDateTime(rawValue)
                        : (rawValue?.toString() ?? '-');
                return <InfoRow key={key} label={label} value={value} />;
            })}
            {details.returnImageUrl.length > 0 && (
                <Image
                    source={{ uri: details.returnImageUrl }}
                    key={details.returnImageUrl}
                    style={{ width: '100%', minHeight: 500, resizeMode: 'contain' }}
                />
            )}
        </View>
    );
};

export default RentalDetails;
