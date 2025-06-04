import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import { axiosPost } from '@/api';
import { useBottomSheetStore } from '@/stores/useBottomSheetStore';
import { ImagePickerAsset } from 'expo-image-picker';
import toISOStringWithoutMs from '@/utils/toISOStringWithoutMS';
import { Alert } from 'react-native';
import useFormInput from './useFormInput';
import { PostingType } from '@/types/types';
import DefaultDamagePolicy from '@/components/items/DefaultDamagePolicy';
import UploadToStorage from '@/utils/uploadToStorage';

export const useNewPosting = () => {
    const { openBottomSheet } = useBottomSheetStore();
    const router = useRouter();

    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [selectedImages, setSelectedImages] = useState<ImagePicker.ImagePickerAsset[]>([]);

    const { values, handleChange } = useFormInput<PostingType>({
        name: '',
        itemImg: '',
        damagedDescription: '',
        description: '',
        price: '',
        damagedPolicy: DefaultDamagePolicy,
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
            const uploadPromises = selectedImages.map(async (img) => {
                const key = await UploadToStorage(img);
                console.log('key', key);
                return key;
            });

            const imageKeys = await Promise.all(uploadPromises);

            const formData = getPostingFormData(values, startDate, endDate, imageKeys);
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
        startDate: Date | null,
        endDate: Date | null,
        imageKeys: string[],
    ) => {
        const payload = {
            ...values,
            status: 'AVAILABLE',
            startDate: toISOStringWithoutMs(startDate ? new Date(startDate) : new Date()),
            endDate: toISOStringWithoutMs(endDate ? new Date(endDate) : new Date()),
            imageKeys: imageKeys,
        };

        return payload;
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
