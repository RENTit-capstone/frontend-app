import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { axiosPost, axiosPut } from '@/api';
import { useBottomSheetStore } from '@/stores/useBottomSheetStore';
import { ImagePickerAsset } from 'expo-image-picker';
import toISOStringWithoutMs from '@/utils/toISOStringWithoutMS';
import { Alert } from 'react-native';
import useFormInput from './useFormInput';
import { PostingType } from '@/types/types';
import DefaultDamagePolicy from '@/components/items/DefaultDamagePolicy';
import UploadToStorage from '@/utils/uploadToStorage';

export const useNewPosting = () => {
    const params: PostingType = useLocalSearchParams();
    const { openBottomSheet } = useBottomSheetStore();
    const router = useRouter();

    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [selectedImages, setSelectedImages] = useState<ImagePicker.ImagePickerAsset[]>([]);

    function safeJsonParse<T>(input: string | undefined | null, fallback: T): T {
        try {
            return input ? JSON.parse(input) : fallback;
        } catch {
            return fallback;
        }
    }

    const { values, handleChange } = useFormInput<PostingType>({
        name: params?.name || '',
        itemImg: safeJsonParse(params?.itemImg, ''),
        imageKeys: safeJsonParse(params?.imageKeys, ''),
        damagedDescription: params?.damagedDescription || '',
        description: params?.description || '',
        price: params?.price || '',
        damagedPolicy: params?.damagedPolicy || DefaultDamagePolicy,
        returnPolicy: params?.returnPolicy || '',
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
        const today = new Date();
        const {
            result: { startDate, endDate },
        } = await openBottomSheet('dateSelector', {
            selectableStartDate: today,
            selectableEndDate: null,
            startDate: null,
            endDate: null,
        });
        setStartDate(startDate);
        setEndDate(endDate);
    };

    const handleModify = async () => {
        console.log(startDate);

        try {
            const uploadPromises = selectedImages.map(async (img) => {
                const key = await UploadToStorage(img);
                return key;
            });

            const imageKeys = await Promise.all(uploadPromises);

            const formData = getPostingFormData(values, startDate, endDate, imageKeys);
            console.log(formData);

            const response = await axiosPut(`/api/v1/items/${params.itemId}`, formData);
            console.log(response);
            Alert.alert('게시글이 수정되었습니다.');
            router.replace('/(tabs)/itemList');
        } catch (error) {
            Alert.alert('누락된 사항이 없는지 확인해주세요');
            console.error(error);
        }
    };

    const handleSubmit = async () => {
        if (!/^\d+$/.test(values.price)) {
            Alert.alert('가격은 숫자로만 입력해주세요');
            return;
        }
        if (parseInt(values.price) < 0 || parseInt(values.price) > 1000001) {
            Alert.alert('가격은 0~10000원 사이로 입력해주세요');
            return;
        }
        try {
            const uploadPromises = selectedImages.map(async (img) => {
                const key = await UploadToStorage(img);
                return key;
            });

            const imageKeys = await Promise.all(uploadPromises);

            const formData = getPostingFormData(values, startDate, endDate, imageKeys);
            await axiosPost(`/api/v1/items`, formData);
            Alert.alert('업로드에 성공하였습니다.');
            router.replace('/(tabs)/itemList');
        } catch (err) {
            console.error(err);
            Alert.alert('누락된 사항이 없는지 확인해주세요');
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
            endDate: toISOStringWithoutMs(
                endDate ? new Date(new Date(endDate).setHours(23 + 9, 59, 0, 0)) : new Date(),
            ),
            imageKeys: imageKeys,
        };

        return payload;
    };

    const removeImage = (imageUri: string) => {
        setSelectedImages((prev) => prev.filter((img) => img.uri !== imageUri));
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
        handleModify,
        removeImage,
    };
};
