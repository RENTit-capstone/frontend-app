import { axiosPost } from '@/api';
import Button from '@/components/Button';
import TextInput from '@/components/TextInput';
import usePostingInput from '@/hooks/usePostingInput';
import { Common } from '@/styles/common';
import { useState } from 'react';
import { View, Text, ScrollView, Alert, Image, KeyboardAvoidingView, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { itemList } from '@/styles/components/itemList';
import { useBottomSheetStore } from '@/stores/useBottomSheetStore';
import DefaultDamagePolicy from '@/components/items/DefaultDamagePolicy';
import { useRouter } from 'expo-router';
import { Colors } from '@/styles/tokens';

const NewPosting = () => {
    const { openBottomSheet } = useBottomSheetStore();
    const [startDate, setStartDate] = useState<string | null>(null);
    const [endDate, setEndDate] = useState<string | null>(null);
    const [selectedImage, setSelectedImage] = useState<any[]>([]);
    const router = useRouter();

    const { values, handleChange } = usePostingInput({
        name: '',
        itemImg: '',
        damagedDescription: '',
        description: '',
        price: '',
        damagedPolicy: DefaultDamagePolicy,
        returnPolicy: '',
    });

    const selectImage = async () => {
        const selectedImgs = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsMultipleSelection: true,
            quality: 1,
        });

        if (!selectedImgs.canceled) {
            setSelectedImage(selectedImgs.assets);
        } else {
            setSelectedImage([]);
        }
    };

    const handleSubmit = async () => {
        const formData = new FormData();
        const payload = {
            name: values.name,
            description: values.description,
            damagedDescription: values.damagedDescription,
            price: values.price,
            status: 'AVAILABLE',
            damagedPolicy: values.damagedPolicy,
            returnPolicy: values.returnPolicy,
            startDate: startDate
                ? `${new Date(startDate).toISOString().split('.')[0]}`
                : `${new Date().toISOString().split('.')[0]}`,
            endDate: endDate
                ? `${new Date(endDate).toISOString().split('.')[0]}`
                : `${new Date().toISOString().split('.')[0]}`,
        };

        formData.append('form', JSON.stringify(payload));
        formData.append('name', payload.name);
        formData.append('description', payload.description);
        formData.append('damagedDescription', payload.damagedDescription);
        formData.append('price', payload.price);
        formData.append('status', 'AVAILABLE');
        formData.append('startDate', payload.startDate); // ISO 문자열
        formData.append('endDate', payload.endDate);
        formData.append('damagedPolicy', payload.damagedPolicy);
        formData.append('returnPolicy', payload.returnPolicy);

        selectedImage.forEach((image: any) => {
            formData.append('images', {
                uri: image.uri,
                name: image.fileName ?? 'image.jpg',
                type: image.type ?? 'image/jpeg',
            } as any);
        });

        try {
            // console.log(formData._parts);
            const response = await axiosPost(`/api/v1/items`, formData);
            console.log('Response for handleSubmit: ', response);
            Alert.alert('업로드에 성공하였습니다.');
            router.replace('/(tabs)/itemList');
        } catch (error) {
            Alert.alert(`${error}`);
            console.error(error);
        }
    };

    const handleDateSelect = async () => {
        const {
            result: { startDate, endDate },
        } = await openBottomSheet('dateSelector');
        setStartDate(startDate);
        setEndDate(endDate);
    };

    return (
        <KeyboardAvoidingView
            style={Common.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
        >
            <ScrollView style={Common.wrapper}>
                <View style={[Common.XStack, { paddingVertical: 16 }]}>
                    <Button type="option" onPress={selectImage} style={itemList.imageSelectButton}>
                        이미지 선택
                    </Button>

                    {selectedImage.length > 0 &&
                        selectedImage.map((image) => (
                            <View key={image.uri}>
                                <Image
                                    source={{ uri: image.uri }}
                                    style={{ width: 100, height: 100 }}
                                />
                            </View>
                        ))}
                </View>
                <TextInput
                    label="물품명"
                    name="name"
                    handleChangeText={handleChange('name')}
                    value={values.name}
                />
                <TextInput
                    label="가격"
                    name="price"
                    handleChangeText={handleChange('price')}
                    value={values.price}
                    keyboardType="numeric"
                />
                <TextInput
                    label="물품 설명"
                    name="description"
                    handleChangeText={handleChange('description')}
                    placeholder="어떤 물품인지 설명해주세요."
                    value={values.description}
                    multiline={true}
                />
                <TextInput
                    label="하자 설명"
                    name="damagedDescription"
                    handleChangeText={handleChange('damagedDescription')}
                    placeholder="기존에 있던 하자를 미리 설명해주세요."
                    value={values.damagedDescription}
                    multiline={true}
                />
                <TextInput
                    label="파손정책"
                    name="damagedPolicy"
                    handleChangeText={handleChange('damagedPolicy')}
                    value={values.damagedPolicy}
                    multiline={true}
                    style={[{ height: 64 }]}
                />
                <TextInput
                    label="반납정책"
                    name="returnPolicy"
                    handleChangeText={handleChange('returnPolicy')}
                    value={values.returnPolicy}
                    multiline={true}
                    style={[{ height: 64 }]}
                />
                <View style={[Common.fullScreen]}>
                    <Text>대여 가능 기간</Text>
                    <View style={[Common.XStack, Common.fullScreen, { alignItems: 'center' }]}>
                        <View
                            style={[
                                Common.textInput,
                                { width: '80%', backgroundColor: Colors.option },
                            ]}
                        >
                            {startDate && endDate && (
                                <Text>
                                    {startDate} ~ {endDate}
                                </Text>
                            )}
                        </View>
                        <Button
                            type="primary"
                            onPress={handleDateSelect}
                            style={{ height: 40, justifyContent: 'center', paddingVertical: 0 }}
                        >
                            기간 선택
                        </Button>
                    </View>
                </View>

                <View style={Common.XStack}>
                    <Button type="option" onPress={handleSubmit}>
                        취소
                    </Button>
                    <Button type="primary" onPress={handleSubmit}>
                        업로드
                    </Button>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};
export default NewPosting;
