import { Image, Pressable, Text, View } from 'react-native';
import { useEffect, useState } from 'react';
import Button from '../Button';
import { Common } from '@/styles/common';
import {
    AccordionCardProps,
    ItemDetailsProp,
    RentalDetailsType,
    RentalStatusType,
} from '@/types/types';
import { history } from '@/styles/components/history';
import { axiosGet } from '@/api';
import { itemList } from '@/styles/components/itemList';
import Badge from '../Badge';
import determineAction from '@/utils/determineAction';
import useRentalActions from '@/hooks/useRentalActions';
import { useRouter } from 'expo-router';
import formatISOToDate from '@/utils/formatDate';
import determineMineAction from '@/utils/determineMineAction';

const AccordionCard = (props: AccordionCardProps) => {
    const { type, rentalId, itemId, requestDate, status } = props;
    const { onCancelRequest, onReturn, onApprove, onReject, onCabinet } = useRentalActions();
    const [isOpened, setIsOpened] = useState(false);
    const [itemDetails, setItemDetails] = useState<ItemDetailsProp>();
    const [details, setDetails] = useState<RentalDetailsType>();
    const router = useRouter();

    useEffect(() => {
        const fetchItemDetails = async () => {
            try {
                const response = await axiosGet(`/api/v1/items/${itemId}`);
                setItemDetails(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchItemDetails();
    }, []);

    const fetchDetails = async () => {
        if (isOpened) return;
        try {
            const response = await axiosGet(`/api/v1/rentals/${rentalId}`);
            setDetails(response.data);
            setIsOpened(!isOpened);
        } catch (error) {
            console.error(error);
        }
    };
    let action, buttonText, description;

    if (type === 'MINE') {
        ({ action, buttonText, description } = determineMineAction({
            id: rentalId,
            rentalStatus: status,
            onApprove,
            onReject,
            onCabinet,
        }));
    } else {
        ({ action, buttonText, description } = determineAction({
            rentalStatus: status,
            onCancelRequest,
            onCabinet,
        }));
    }

    const onPress = async (action?: () => Promise<void>) => {
        if (action) {
            try {
                await action();
            } catch (error) {
                console.error(error);
            }
        }
    };

    if (!itemDetails) return null;
    return (
        <View>
            <Pressable
                style={[Common.XStack, itemList.cardWrapper]}
                onPress={() => router.push(`/items/${itemId}`)}
            >
                <Image
                    source={require('@/assets/images/icon.png')}
                    style={itemList.listItemImage}
                />

                <View style={[Common.wideView, { gap: 5 }]}>
                    <Badge status={status} />
                    <Text style={{ fontSize: 19 }}>{itemDetails.name}</Text>
                    <View style={[Common.textWrapper]}>
                        <Text style={{ fontSize: 19, fontWeight: 600 }}>
                            {itemDetails.price.toLocaleString()}
                        </Text>
                        <Text style={{ fontSize: 19 }}> 원</Text>
                    </View>

                    <View style={[Common.textOption]}>
                        <Text style={{ fontSize: 16 }}>
                            대여 요청 일시: {formatISOToDate(requestDate)}
                        </Text>
                        {description && <Text style={{ marginTop: 12 }}>{description}</Text>}
                    </View>
                </View>
            </Pressable>

            {isOpened && (
                <View>
                    {!details ? (
                        <Text></Text>
                    ) : (
                        <>
                            <Text>빌려준 사람: {details.owner}</Text>
                            <Text>대여 요청 일시: {details.requestDate}</Text>
                            <Text>대여 승인 일시: {details.approvedDate}</Text>
                            <Text>대여 거절 일시: {details.rejectedDate}</Text>
                            <Text>대여 시작 일시: {details.startDate}</Text>
                            <Text>반납 예정 일시: {details.dueDate}</Text>
                            <Text>사물함 보관 일시 : {details.leftByOwnerAt}</Text>
                            <Text>물건 수령 일시: {details.pickedUpByRenterAt}</Text>
                            <Text>반납 일시: {details.returnedByRenterAt}</Text>
                            <Text>물건 회수 일시: {details.retrievedByOwnerAt}</Text>
                            <Text>사물함 번호: {details.lockerId}</Text>
                        </>
                    )}
                </View>
            )}

            <View style={Common.XStack}>
                {buttonText && (
                    <Button
                        onPress={() => onPress(action)}
                        type="primary"
                        style={history.button}
                        disabled={!action}
                    >
                        {buttonText}
                    </Button>
                )}

                <Button onPress={fetchDetails} type="secondary" style={history.button}>
                    {isOpened ? '닫기' : '상세정보'}
                </Button>
            </View>
        </View>
    );
};

export default AccordionCard;
