import { Alert, ScrollView, Text, View } from 'react-native';
import AccordionCard from './AccordionCard';
import { AccordionCardProps, AccordionContainerProps } from '@/types/types';
import { itemList } from '@/styles/components/itemList';
import { useEffect, useRef, useState } from 'react';
import { axiosGet } from '@/api';
import generateUrl from '@/utils/generateUrl';
import DropdownSort from '../itemList/DropdownSort';
import { Common } from '@/styles/common';

const SORT_OPTIONS = ['최신순', '가격 낮은순', '가격 높은순'];
const FILTER_OPTIONS = ['전체', '요청 중', '승인됨', '거절됨', '취소됨', '대여 중', '완료됨'];

const AccordionCardContainer = (props: AccordionContainerProps) => {
    const { type } = props;
    const page = useRef(0);
    const [data, setData] = useState<AccordionCardProps[]>([]);
    const [selected, setSelected] = useState(SORT_OPTIONS[0]);
    const [filtered, setFiltered] = useState(FILTER_OPTIONS[0]);

    useEffect(() => {
        type === 'OTHERS' ? fetchHistory() : fetchMine();
        page.current = 0;
    }, []);

    useEffect(() => {
        // console.log(selected);
        const params = generateUrl({
            // statuses: filtered,
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
        console.log(params);
        try {
            const response = await axiosGet(`/api/v1/members/me`);
            setData(response.data.ownedRentals);
        } catch (error) {
            Alert.alert(`${error}`);
            console.error(error);
        }
    };

    const fetchHistory = async (params?: any) => {
        console.log(params);

        if (!params) {
            params = generateUrl({
                // stautses: ['REQUESTED', 'APPROVED', 'RejECTED', 'COMPLETED'],
                page: 0,
                size: 20,
                sort: ['requestDate', 'desc'],
            });
        }
        try {
            const response = await axiosGet(`/api/v1/rentals?${params}`);
            setData(response.data.content);
        } catch (error) {
            Alert.alert(`${error}`);
            console.error(error);
        }
    };

    if (!data) return;

    return (
        <ScrollView style={{ backgroundColor: 'white' }}>
            <View style={[itemList.listContainer, { paddingBottom: 64 }]}>
                <View style={[Common.XStack, { gap: 0, alignSelf: 'flex-end' }]}>
                    <DropdownSort
                        filtered={filtered}
                        setFiltered={setFiltered}
                        filterOptions={FILTER_OPTIONS}
                    />
                    <DropdownSort
                        selected={selected}
                        setSelected={setSelected}
                        sortOptions={SORT_OPTIONS}
                    />
                </View>

                {data.map((item: AccordionCardProps) => (
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
                ))}
            </View>
        </ScrollView>
    );
};

export default AccordionCardContainer;
