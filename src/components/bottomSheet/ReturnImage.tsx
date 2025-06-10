import * as ImagePicker from 'expo-image-picker';
import { View, Image, Alert, Text } from 'react-native';
import { useEffect, useState } from 'react';
import UploadToStorage from '@/utils/uploadToStorage';
import Button from '../Button';
import { axiosPost } from '@/api';
import { useBottomSheetStore } from '@/stores/useBottomSheetStore';
import { Common } from '@/styles/common';

const ReturnImageUpload = () => {
    const [imageUri, setImageUri] = useState<string | null>(null);
    const { visible, result, setResult } = useBottomSheetStore();
    const [key, setKey] = useState<string>();

    useEffect(() => {
        console.log('key: ', key);
        setResult({ ...result, key: key });
    }, [key]);

    const takePhotoAndUpload = async () => {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('카메라 권한이 필요합니다.');
            return;
        }

        const result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 1,
        });

        if (result.canceled) return;

        const asset = result.assets[0];
        setImageUri(asset.uri);
        const key = await UploadToStorage(asset);
        setKey(key);
        console.log(key);

        return key;
    };

    return (
        <View>
            <View style={{ alignItems: 'center', paddingVertical: 15 }}>
                <Text style={{ fontSize: 18, fontWeight: 500 }}>반납 이미지 업로드</Text>
            </View>

            {imageUri && (
                <Image
                    source={{ uri: imageUri }}
                    style={{ width: 200, height: 200, marginTop: 16 }}
                />
            )}
            <View style={[Common.XStack]}>
                <Button type="primary" onPress={takePhotoAndUpload} style={{}}>
                    사진 찍기
                </Button>
            </View>
        </View>
    );
};
export default ReturnImageUpload;
