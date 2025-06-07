import { Image, Text, View } from 'react-native';
import { useEffect, useState } from 'react';
import Button from '../Button';
import { Common } from '@/styles/common';
import { AccordionCardProps, ItemDetailsProp, RentalDetailsType } from '@/types/types';
import { history } from '@/styles/components/history';
import { axiosGet } from '@/api';
import { itemList } from '@/styles/components/itemList';
import Badge from '../Badge';
import determineAction from '@/utils/determineAction';
import useRentalActions from '@/hooks/useRentalActions';
import { useRouter } from 'expo-router';
import formatISOToDate from '@/utils/formatDateString';
import determineMineAction from '@/utils/determineMineAction';
import RentalDetails from './RentalDetails';

const AccordionCard = (props: any) => {
    const { type, rentalId, itemId, requestDate, status, imageUrl } = props;
    const { onCancelRequest, onReturn, onApprove, onReject, onCabinet, onReportDamage } =
        useRentalActions();
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
        try {
            const response = await axiosGet(`/api/v1/rentals/${rentalId}`);
            setDetails(response.data);
            setIsOpened(!isOpened);
        } catch (error) {
            console.error(error);
        }
    };

    const handleDetails = () => {
        if (isOpened) {
            setIsOpened(false);
        } else {
            fetchDetails();
        }
    };

    let action: (() => Promise<void>)[] = [];
    let buttonText: string[] = [];
    let description: string | undefined;

    if (type === 'MINE') {
        ({
            action = [],
            buttonText = [],
            description,
        } = determineMineAction({
            id: rentalId,
            rentalStatus: status,
            onApprove,
            onReject,
            onCabinet,
            onReportDamage,
        }));
    } else {
        ({
            action = [],
            buttonText = [],
            description,
        } = determineAction({
            id: rentalId,
            rentalStatus: status,
            onReturn,
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
            <View style={[Common.XStack, itemList.cardWrapper]}>
                <Image source={{ uri: imageUrl }} style={itemList.listItemImage} />

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
            </View>

            {isOpened && (
                <View>
                    {!details ? (
                        <Text></Text>
                    ) : (
                        <>
                            <RentalDetails details={details} />
                        </>
                    )}
                </View>
            )}

            <View style={Common.XStack}>
                {buttonText?.map((text, index) => (
                    <Button
                        key={index}
                        onPress={() => onPress(action?.[index])}
                        type="primary"
                        style={history.button}
                        disabled={!action?.[index]}
                    >
                        {text}
                    </Button>
                ))}

                <Button onPress={handleDetails} type="secondary" style={history.button}>
                    {isOpened ? '닫기' : '상세정보'}
                </Button>
            </View>
        </View>
    );
};

export default AccordionCard;
