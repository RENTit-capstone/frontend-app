import { axiosNoInterceptor, axiosPost, axiosPut } from '@/api';
import axios from 'axios';
import { Alert } from 'react-native';
import * as FileSystem from 'expo-file-system';

const UploadToStorage = async (assets: any) => {
    if (!assets) {
        Alert.alert('업로드할 파일을 선택해주세요.');
        return;
    }
    try {
        const payload = {
            fileName: assets.uri,
            contentType: assets.mimeType,
        };
        // url 받아오기
        const response = await axiosPost(`/api/v1/files/presigned/upload`, payload);
        const url = response.data.presignedUrl;
        console.log(response.data);

        //storage에 업로드
        const imageFile = await fetch(assets.uri);
        const imageBlob = await imageFile.blob();
        await fetch(url, {
            method: 'PUT',
            headers: { 'Content-Type': payload.contentType },
            body: imageBlob,
        });
        return response.data.objectKey;
    } catch (error) {
        console.error(error);
    }
};
export default UploadToStorage;
