import { axiosPost } from '@/api';
import { Alert, Image, ScrollView, Text, View } from 'react-native';
import KeyboardAvoidingView from '../../../components/KeyboardAvoidingView';
import { useState } from 'react';
import { Common } from '@/styles/common';
import TextInput from '../../../components/CustomTextInput';
import Button from '../../../components/Button';
import { useLocalSearchParams, useRouter } from 'expo-router';
import DropDown from '@/components/Dropdown';
import * as ImagePicker from 'expo-image-picker';
import { itemList } from '@/styles/components/itemList';
import UploadToStorage from '@/utils/uploadToStorage';

const DamageReport = () => {
    const { rentalId } = useLocalSearchParams();
    const router = useRouter();
    const [form, setForm] = useState({
        title: '',
        content: '',
        type: '',
    });
    const [selectedImages, setSelectedImages] = useState<ImagePicker.ImagePickerAsset[]>([]);

    const handleChange = (name: string) => (text: string) => {
        setForm({ ...form, [name]: text });
    };

    const handleSubmit = async () => {
        const uploadPromises = selectedImages.map(async (img) => {
            const key = await UploadToStorage(img);
            console.log('key', key);
            return key;
        });

        const imageKeys = await Promise.all(uploadPromises);

        const payload = {
            rentalId: rentalId,
            title: form.title,
            content: form.content,
            images: imageKeys,
        };
        try {
            const response = await axiosPost(`/api/v1/inquiries/damage`, payload);
            Alert.alert('파손 신고 작성이 완료되었습니다');
            router.replace('/myPage/qna/MyQnA');
        } catch (error) {
            Alert.alert(`누락된 항목이 없는지 확인해주세요`);
            console.error(error);
        }
    };

    const handleImageSelect = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsMultipleSelection: true,
            quality: 1,
        });

        if (!result.canceled) setSelectedImages(result.assets);
    };

    const handleCancel = () => {
        Alert.alert(
            '파손 신고를 취소하시겠습니까?',
            '입력하신 내용이 삭제됩니다',
            [
                {
                    text: '취소',
                    style: 'cancel',
                },
                {
                    text: '확인',
                    onPress: () => router.replace('/(tabs)/itemList'),
                },
            ],
            { cancelable: false },
        );
    };

    return (
        <KeyboardAvoidingView>
            <ScrollView style={Common.wrapper}>
                <TextInput
                    label="제목"
                    name="title"
                    handleChangeText={handleChange('title')}
                    value={form.title}
                />
                <View style={{ marginBottom: 24 }}>
                    <Text>문의 유형</Text>
                    <DropDown
                        label={'파손 신고'}
                        selectedColor="#111111"
                        disabled
                        style={[Common.textInput, { width: '100%' }]}
                    />
                </View>
                <ScrollView
                    horizontal
                    contentContainerStyle={[
                        Common.XStack,
                        { paddingVertical: 16, marginBottom: 16 },
                    ]}
                >
                    <Button
                        type="option"
                        onPress={handleImageSelect}
                        style={itemList.imageSelectButton}
                    >
                        이미지 선택
                    </Button>

                    {selectedImages.map((img) => (
                        <Image
                            key={img.uri}
                            source={{ uri: img.uri }}
                            style={{ width: 100, height: 100 }}
                        />
                    ))}
                </ScrollView>
                <TextInput
                    label="내용"
                    name="content"
                    handleChangeText={handleChange('content')}
                    value={form.content}
                    multiline={true}
                    style={[Common.textArea, { height: 256 }]}
                />

                <View style={Common.XStack}>
                    <Button type="option" onPress={handleCancel}>
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
export default DamageReport;
