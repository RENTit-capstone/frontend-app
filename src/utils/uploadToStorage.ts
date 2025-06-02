import { axiosPost, axiosPut } from '@/api';
import { Alert } from 'react-native';

const UploadToStorage = async (uri: string | null) => {
    // const fileName = uri ?? `upload-${Date.now()}.jpg`;
    // const fileName = uri;
    if (!uri) {
        Alert.alert('업로드할 파일을 선택해주세요.');
        return;
    }
    try {
        const payload = null;
        // url 받아오기
        const response = await axiosPost(`/api/presign/`, payload);
        const url = response.data;
        console.log(response.data);

        const fileBlob = await uriToBlob(uri);
        //storage에 업로드
        const res = await axiosPut(url, fileBlob, {
            headers: {
                'Content-Type': 'image/jpeg',
            },
        });
        console.log(res.data);
    } catch (error) {
        console.error(error);
    }
    alert('업로드 완료!');
};
export default UploadToStorage;

async function uriToBlob(uri: string): Promise<Blob> {
    const response = await fetch(uri);
    return await response.blob();
}
