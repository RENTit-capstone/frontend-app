import { Common } from '@/styles/common';
import { itemList } from '@/styles/components/itemList';
import { Text, View } from 'react-native';
import Avatar from '../Avatar';
import { ItemDetailsProp } from '@/types/types';
import Badge from '../Badge';
import formatISOToDate from '@/utils/formatDateString';
import useRequestStore from '@/stores/useRequestStore';
import { useEffect } from 'react';

const ItemDetails = (props: ItemDetailsProp) => {
    const {
        itemId,
        owner,
        name,
        imageUrls,
        description,
        damagedDescription,
        price,
        status,
        damagedPolicy,
        returnPolicy,
        startDate,
        endDate,
        createdAt,
        updatedAt,
    } = props;
    const { setName, setPrice } = useRequestStore();
    useEffect(() => {
        setName(name);
        setPrice(price);
    }, []);

    return (
        <>
            <View style={[itemList.detailsHeader, Common.wrapper]}>
                <View style={[Common.textWrapper, itemList.detailsHeader]}>
                    <View style={[Common.textWrapper, itemList.detailsHeader]}>
                        <Avatar />
                        <Text>{owner.nickname}</Text>
                    </View>
                    <View style={[Common.textWrapper, { gap: 3 }]}></View>
                </View>
                <View style={[itemList.rowDivider, { marginTop: 0, width: '100%' }]} />

                <View style={[Common.textWrapper, { gap: 10 }]}>
                    <Badge status={status} />
                    {status === 'OUT' ? (
                        <Text>반납일: 2025.05.01</Text>
                    ) : (
                        <Text>{`${formatISOToDate(startDate)} ~ ${formatISOToDate(endDate)}`}</Text>
                    )}
                </View>

                <View style={[Common.textWrapper, itemList.detailsHeader]}>
                    <Text style={Common.bold}>{name}</Text>
                    <Text style={Common.bold}>{price.toLocaleString()}원</Text>
                </View>
            </View>

            <View style={[itemList.detailInfo, Common.wrapper]}>
                <View style={Common.section}>
                    <Text style={itemList.title}>내용</Text>
                    <Text>{description}</Text>
                </View>
                <View style={Common.section}>
                    <Text style={itemList.title}>하자</Text>
                    <Text>{damagedDescription}</Text>
                </View>
                <View style={Common.section}>
                    <Text style={itemList.title}>파손정책</Text>
                    <Text>{damagedPolicy}</Text>
                </View>
                <View style={Common.section}>
                    <Text style={itemList.title}>반납정책</Text>
                    <Text>{returnPolicy}</Text>
                </View>
            </View>
        </>
    );
};

export default ItemDetails;
