import { axiosGet, axiosPut } from '@/api';
import Button from '@/components/Button';
import { Common } from '@/styles/common';
import React, { useState, useEffect } from 'react';
import { Image } from 'react-native';
import { View, Text, TextInput, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import UploadToStorage from '@/utils/uploadToStorage';

type ProfileType = {
    name: string;
    nickname: string;
    phone: string;
    profileImg: string;
    imageKey?: string;
};

const EditProfile = () => {
    const [profile, setProfile] = useState<ProfileType>({
        name: '',
        nickname: '',
        phone: '',
        profileImg: '',
        imageKey: '',
    });

    const [selectedImage, setSelectedImage] = useState<ImagePicker.ImagePickerAsset>();
    const [selectedImageKey, setSelectedImageKey] = useState<string>('');

    const [loading, setLoading] = useState(false);

    const fetchProfile = async () => {
        try {
            const res = await axiosGet('/api/v1/members/me');
            const { name, nickname, phone, profileImg } = res.data;
            setProfile({
                name,
                nickname,
                phone,
                profileImg: profileImg, // 기존 이미지를 imageKey로 설정
            });
        } catch (err) {
            Alert.alert('불러오기 실패', '회원 정보를 불러오지 못했습니다.');
        }
    };

    useEffect(() => {
        fetchProfile();
    }, []);

    const handleUpdate = async () => {
        setLoading(true);

        try {
            let imageKey = profile.imageKey; // 기본값: 기존 이미지 키

            // 이미지가 새로 선택된 경우에만 업로드
            if (selectedImage) {
                imageKey = await UploadToStorage(selectedImage);
            }

            // 프로필 업데이트
            await axiosPut('/api/v1/members', {
                memberType: 'STUDENT',
                name: profile.name,
                nickname: profile.nickname,
                phone: profile.phone,
                imageKey: imageKey,
            });

            Alert.alert('수정 완료', '프로필이 성공적으로 수정되었습니다.');
        } catch (error) {
            console.error('업데이트 실패:', error);
            Alert.alert('수정 실패', '프로필을 수정하지 못했습니다.');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (key: keyof ProfileType, value: string) => {
        setProfile((prev) => ({ ...prev, [key]: value }));
    };

    const handleImageSelect = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsMultipleSelection: false, // 한 장만 선택
            quality: 1,
        });

        if (!result.canceled && result.assets.length > 0) {
            setSelectedImage(result.assets[0]); // 첫 번째 이미지만 저장
        }
    };

    return (
        <View style={[Common.container, Common.wrapper]}>
            <Text style={{ fontWeight: 'bold', fontSize: 20, marginVertical: 24 }}>
                회원 정보 수정
            </Text>
            <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 8 }}>이름</Text>
            <TextInput
                style={Common.textInput}
                value={profile.name}
                onChangeText={(text) => handleChange('name', text)}
                placeholder="이름"
            />

            <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 8 }}>닉네임</Text>
            <TextInput
                style={Common.textInput}
                value={profile.nickname}
                onChangeText={(text) => handleChange('nickname', text)}
                placeholder="닉네임"
            />

            <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 8 }}>연락처</Text>
            <TextInput
                style={Common.textInput}
                value={profile.phone}
                onChangeText={(text) => handleChange('phone', text)}
                placeholder="연락처"
                keyboardType="phone-pad"
            />

            <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 8 }}>프로필 이미지</Text>
            <View>
                <Image
                    source={{ uri: selectedImage?.uri || profile.profileImg }}
                    style={{
                        width: 96,
                        height: 96,
                        borderRadius: 48,
                        marginBottom: 16,
                        backgroundColor: '#ccc',
                    }}
                />
                <View style={[Common.XStack]}>
                    <Button type="primary" onPress={handleImageSelect}>
                        이미지 수정
                    </Button>
                </View>
            </View>
            <View style={Common.XStack}>
                <Button type="primary" onPress={handleUpdate} disabled={loading}>
                    {loading ? '수정 중...' : '수정하기'}
                </Button>
            </View>
        </View>
    );
};

const styles = {
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 6,
        padding: 10,
        marginBottom: 16,
    },
};

export default EditProfile;
