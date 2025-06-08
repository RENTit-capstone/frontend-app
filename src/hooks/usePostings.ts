import { useEffect, useState } from 'react';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { axiosGet, axiosPost } from '@/api';
import useToast from '@/hooks/useToast';
import useAuthStore from '@/stores/useAuthStore';
import useRequestStore from '@/stores/useRequestStore';
import { ItemDetailsProp } from '@/types/types';
import toISOStringWithoutMs from '@/utils/toISOStringWithoutMS';

const usePostings = () => {
    const { id } = useLocalSearchParams<{ id: string }>();
    const [data, setData] = useState<ItemDetailsProp>();
    const toast = useToast();
    const router = useRouter();
    const { userId } = useAuthStore();
    const { startDate, endDate, clearRecord, claerData, setItemData } = useRequestStore();

    useEffect(() => {
        fetchItemDetails();
        return () => {
            clearRecord();
            claerData();
        };
    }, []);

    const fetchItemDetails = async () => {
        try {
            const response = await axiosGet(`/api/v1/items/${parseInt(id)}`);
            // console.log(response.data);
            setData(response.data);
            setItemData('damagedDescription', response.data.damagedDescription);
            setItemData('returnPolicy', response.data.returnPolicy);
            setItemData('damagePolicy', response.data.damagePolicy);
            setItemData('price', response.data.price.toString());
            setItemData('startDate', response.data.startDate);
            setItemData('endDate', response.data.endDate);
        } catch (error) {
            toast.show(`${error}`);
            console.error(error);
        }
    };

    const handleRequest = async () => {
        try {
            const today = new Date();
            const payload = {
                itemId: parseInt(id),
                ownerId: data?.owner.memberId,
                renterId: userId,
                startDate: toISOStringWithoutMs(startDate ? new Date(startDate) : today),
                dueDate: toISOStringWithoutMs(endDate ? new Date(endDate) : today),
            };
            const response = await axiosPost(`/api/v1/rentals`, payload);
            toast.show('요청이 완료되었습니다.');
            router.replace('/(tabs)/itemList');
        } catch (error) {
            toast.show(`${error}`);
            console.log(error);
        }
    };

    return {
        data,
        handleRequest,
    };
};

export default usePostings;
