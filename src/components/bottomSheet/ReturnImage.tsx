import * as ImagePicker from 'expo-image-picker';
import { View, Image, Alert } from 'react-native';
import { useState } from 'react';
import UploadToStorage from '@/utils/uploadToStorage';
import Button from '../Button';

const ReturnImageUpload = () => {
    const [imageUri, setImageUri] = useState<string | null>(null);

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
        UploadToStorage(asset.uri);
    };

    return (
        <View>
            <Button type="primary" onPress={takePhotoAndUpload}>
                사진 찍기
            </Button>
            {imageUri && (
                <Image
                    source={{ uri: imageUri }}
                    style={{ width: 200, height: 200, marginTop: 16 }}
                />
            )}
        </View>
    );
};
export default ReturnImageUpload;
