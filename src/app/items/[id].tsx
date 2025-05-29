import { Common } from '@/styles/common';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ItemDetailsProp } from '@/types/types';
import { useEffect, useState } from 'react';
import { axiosGet, axiosPost } from '@/api';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomScrollSheet from '@/components/BottomScrollSheet';
import ItemDetails from '@/components/items/ItemDetails';
import useRequestStore from '@/stores/useRequestStore';
import ItemDetailsButtonBar from '@/components/items/ItemDetailsButtonBar';
import ImageGallery from '@/components/items/ImageGallery';
import useToast from '@/hooks/useToast';
import useAuthStore from '@/stores/useAuthStore';
import { ActivityIndicator } from 'react-native';

const Postings = () => {
    const { id } = useLocalSearchParams<{ id: string }>();
    const [data, setData] = useState<ItemDetailsProp>();
    const toast = useToast();
    const router = useRouter();
    const { userId } = useAuthStore();
    const { startDate, endDate, clearRecord, setFlawPolicy, setReturnPolicy } = useRequestStore();

    useEffect(() => {
        fetchItemDetails();
        return () => clearRecord();
    }, []);

    const fetchItemDetails = async () => {
        try {
            const response = await axiosGet(`/api/v1/items/${parseInt(id)}`);
            console.log('Response for fetchItemDetails: ', response.data);
            setData(response.data);
            setFlawPolicy(response.data.damagedDescription);
            setReturnPolicy(response.data.returnPolicy);
        } catch (error) {
            toast.show(`${error}`);
            console.error(error);
        }
    };

    const handleRequest = async () => {
        try {
            const payload = {
                itemId: parseInt(id),
                ownerId: data?.owner.memberId,
                renterId: userId,
                startDate: startDate
                    ? `${new Date(startDate).toISOString().split('.')[0]}`
                    : `${new Date().toISOString().split('.')[0]}`,
                dueDate: endDate
                    ? `${new Date(endDate).toISOString().split('.')[0]}`
                    : `${new Date().toISOString().split('.')[0]}`,
            };
            console.log(payload);
            const response = await axiosPost(`/api/v1/rentals`, payload);
            console.log('Response for submitRequest: ', response.data);
            toast.show('요청이 완료되었습니다.');
            router.replace('/(tabs)/itemList');
        } catch (error) {
            toast.show(`${error}`);
            console.log(error);
        }
    };

    if (!data) {
        return <ActivityIndicator />;
    }

    return (
        <GestureHandlerRootView style={Common.container}>
            {/* <Image source={{uri: imageUrl}} style={itemList.detailImage} /> */}
            <ImageGallery imgUrls={data?.imageUrls} />

            <BottomScrollSheet snapPointList={['50%', '60%', '70%', '80%']}>
                <ItemDetails
                    itemId={data.itemId}
                    owner={data.owner}
                    name={data.name}
                    imageUrls={data.imageUrls}
                    description={data.description}
                    damagedDescription={data.damagedDescription}
                    price={data.price}
                    status={data.status}
                    damagedPolicy={data.damagedPolicy}
                    returnPolicy={data.returnPolicy}
                    startDate={data.startDate}
                    endDate={data.endDate}
                    createdAt={data.createdAt}
                    updatedAt={data.updatedAt}
                />
            </BottomScrollSheet>
            <ItemDetailsButtonBar handleRequest={handleRequest} />
        </GestureHandlerRootView>
    );
};

export default Postings;
