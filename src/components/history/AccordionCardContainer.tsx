import { Alert, ScrollView, Text, View } from 'react-native';
import AccordionCard from './AccordionCard';
import {
    AccordionCardProps,
    AccordionContainerProps,
    FilterOption,
    SortOption,
} from '@/types/types';
import { itemList } from '@/styles/components/itemList';
import { useEffect, useRef, useState } from 'react';
import { axiosGet } from '@/api';
import generateUrl from '@/utils/generateUrl';
import DropdownSort from '../itemList/DropdownSort';
import { Common } from '@/styles/common';
import { FlatList } from 'react-native';
import { RefreshControl } from 'react-native-gesture-handler';
import { Colors } from '@/styles/tokens';

const SORT_OPTIONS: SortOption[] = ['최신순', '가격 낮은순', '가격 높은순'];
const FILTER_OPTIONS: FilterOption[] = [
    '전체',
    '요청중',
    '승인됨',
    '거절됨',
    '취소됨',
    '대여중',
    '완료됨',
];

const AccordionCardContainer = (props: AccordionContainerProps) => {
    const { type } = props;
    const page = useRef(0);
    const [itemData, setItemData] = useState<any[]>([]);
    // const [ownData, setOwnData] = useState<any[]>([]);
    // const [rentData, setRentData] = useState<any[]>([]);
    const [data, setData] = useState<any[]>([]);
    const [selected, setSelected] = useState(SORT_OPTIONS[0]);
    const [filtered, setFiltered] = useState(FILTER_OPTIONS[0]);
    const [refreshing, setRefreshing] = useState(false);

    const fetchResult = () => {
        type === 'OTHERS' ? fetchHistory() : fetchMine();
    };

    useEffect(() => {
        page.current = 0;
        fetchResult();
    }, []);

    useEffect(() => {
        const params = generateUrl({
            statuses: filtered,
            // sort: selected || ['requestDate', 'desc'],
            sort: ['requestDate', 'desc'],
            page: 0,
            size: 20,
        });
        if (type === 'OTHERS') {
            fetchHistory(params);
        } else {
            fetchMine(params);
        }
    }, [selected, filtered]);

    const fetchMine = async (params?: any) => {
        try {
            const response = await axiosGet(`/api/v1/members/me`);
            console.log(response.data.ownedRentals);
            setData(response.data.ownedRentals);
        } catch (error) {
            Alert.alert(`${error}`);
            console.error(error);
        }
    };

    const fetchHistory = async (params?: any) => {
        try {
            const response = await axiosGet(`/api/v1/members/me`);
            setData(response.data.rentedRentals);
        } catch (error) {
            Alert.alert(`${error}`);
            console.error(error);
        }

        // if (!params) {
        //     params = generateUrl({
        //         // stautses: ['REQUESTED', 'APPROVED', 'RejECTED', 'COMPLETED'],
        //         page: 0,
        //         size: 20,
        //         sort: ['requestDate', 'desc'],
        //     });
        // }
        // try {
        //     const response = await axiosGet(`/api/v1/rentals?${params}`);
        //     setData(response.data.content);
        // } catch (error) {
        //     Alert.alert(`${error}`);
        //     console.error(error);
        // }
    };

    if (!data) return;

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={[itemList.listContainer, { paddingBottom: 64 }]}>
                <View style={[Common.XStack, { gap: 0, alignSelf: 'flex-end' }]}></View>
                <FlatList
                    data={data}
                    keyExtractor={(item, index) => `${item.itemId}-${index}`}
                    contentContainerStyle={{
                        paddingBottom: 64,

                        justifyContent: 'center',
                    }}
                    style={{ flex: 1, alignSelf: 'center', width: '90%' }}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={fetchResult}
                            colors={[Colors.darkGray]}
                            tintColor={Colors.darkGray}
                        />
                    }
                    renderItem={({ item }) => (
                        <View
                            style={{
                                flex: 1,
                                width: '100%',
                            }}
                        >
                            <AccordionCard
                                data={data}
                                type={type}
                                key={item.rentalId}
                                rentalId={item.rentalId}
                                itemId={item.itemId}
                                requestDate={item.requestDate}
                                status={item.status}
                                imageUrl={item.thumbnailUrl}
                                onRefresh={fetchResult}

                                // itemId={item.itemId}
                                // nickname={item.nickname}
                                // name={item.name}
                                // imageUrls={item.imageUrls}
                                // price={item.price}
                                // status={item.status}
                                // startDate={item.startDate}
                                // endDate={item.endDate}
                            />
                            <View
                                style={[
                                    itemList.rowDivider,
                                    { alignSelf: 'center', marginBottom: 10, width: '100%' },
                                ]}
                            />
                        </View>
                    )}
                />

                {/* {data.map((item: AccordionCardProps) => (
                    <>
                        <AccordionCard
                            type={type}
                            key={item.rentalId}
                            rentalId={item.rentalId}
                            itemId={item.itemId}
                            requestDate={item.requestDate}
                            status={item.status}
                        />
                        <View style={[itemList.rowDivider, { marginBottom: 16 }]} />
                    </>
                ))} */}
            </View>
        </View>
    );
};

export default AccordionCardContainer;
