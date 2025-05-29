import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import { axiosPost } from '@/api';
import { useBottomSheetStore } from '@/stores/useBottomSheetStore';
import usePostingInput from '@/hooks/usePostingInput';
import { ImagePickerAsset } from 'expo-image-picker';
import toISOStringWithoutMs from '@/utils/toISOStringWithoutMS';
import { Alert } from 'react-native';

export const useNewPosting = () => {
    const { openBottomSheet } = useBottomSheetStore();
    const router = useRouter();

    const [startDate, setStartDate] = useState<string | null>(null);
    const [endDate, setEndDate] = useState<string | null>(null);
    const [selectedImages, setSelectedImages] = useState<ImagePicker.ImagePickerAsset[]>([]);

    const { values, handleChange } = usePostingInput({
        name: '',
        itemImg: '',
        damagedDescription: '',
        description: '',
        price: '',
        damagedPolicy: '',
        returnPolicy: '',
    });

    const handleImageSelect = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsMultipleSelection: true,
            quality: 1,
        });

        if (!result.canceled) setSelectedImages(result.assets);
    };

    const handleDateSelect = async () => {
        const {
            result: { startDate, endDate },
        } = await openBottomSheet('dateSelector');
        setStartDate(startDate);
        setEndDate(endDate);
    };

    const handleSubmit = async () => {
        try {
            const formData = getPostingFormData(values, selectedImages, startDate, endDate);
            await axiosPost(`/api/v1/items`, formData);
            Alert.alert('업로드에 성공하였습니다.');
            router.replace('/(tabs)/itemList');
        } catch (err) {
            console.error(err);
            Alert.alert('업로드에 실패했습니다.');
        }
    };

    const handleCancel = () => {
        Alert.alert('작성 중인 내용이 있습니다. 정말로 나가시겠습니까?', '', [
            { text: '아니요', style: 'cancel' },
            { text: '네', onPress: () => router.back() },
        ]);
    };

    const getPostingFormData = (
        values: any,
        images: ImagePickerAsset[],
        startDate: string | null,
        endDate: string | null,
    ) => {
        const payload = {
            ...values,
            status: 'AVAILABLE',
            startDate: toISOStringWithoutMs(startDate ? new Date(startDate) : new Date()),
            endDate: toISOStringWithoutMs(endDate ? new Date(endDate) : new Date()),
        };

        const formData = new FormData();
        formData.append('form', JSON.stringify(payload));
        // formData.append('form', JSON.stringify(payload));
        // formData.append('name', payload.name);
        // formData.append('description', payload.description);
        // formData.append('damagedDescription', payload.damagedDescription);
        // formData.append('price', payload.price);
        // formData.append('status', 'AVAILABLE');
        // formData.append('startDate', payload.startDate); // ISO 문자열
        // formData.append('endDate', payload.endDate);
        // formData.append('damagedPolicy', payload.damagedPolicy);
        // formData.append('returnPolicy', payload.returnPolicy);

        images.forEach((img) => {
            formData.append('images', {
                uri: img.uri,
                name: img.fileName ?? 'image.jpg',
                type: img.type ?? 'image/jpeg',
            } as any);
        });

        return formData;
    };

    return {
        values,
        handleChange,
        startDate,
        endDate,
        selectedImages,
        handleImageSelect,
        handleDateSelect,
        handleSubmit,
        handleCancel,
    };
};
