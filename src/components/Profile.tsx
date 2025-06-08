import { axiosGet } from '@/api';
import { useEffect, useState } from 'react';
import { Image, Text, View } from 'react-native';
import Button from './Button';
import { Common } from '@/styles/common';
import { useRouter } from 'expo-router';

type ProfileType = {
    memberId: number;
    email: string;
    name: string;
    nickname: string;
    role: string;
    profileImg: string;
    createdAt: string;
};

const Profile = () => {
    const [data, setData] = useState<ProfileType>();
    const router = useRouter();

    const fetchData = async () => {
        try {
            const userInfo = await axiosGet(`/api/v1/members/me`);
            console.log(userInfo);
            setData(userInfo.data);
        } catch (error) {
            console.error('Error fetching profile:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    if (!data) return;

    return (
        <View
            style={{
                alignSelf: 'center',
                justifyContent: 'center',
                alignContent: 'center',
                alignItems: 'center',
            }}
        >
            <Image
                source={{ uri: data.profileImg }}
                style={{
                    width: 96,
                    height: 96,
                    borderRadius: 48,
                    marginBottom: 16,
                    backgroundColor: '#ccc',
                }}
            />
            <Text style={{ fontSize: 20, fontWeight: '600', marginBottom: 4 }}>
                {data.name} ({data.nickname})
            </Text>
            <Text style={{ fontSize: 16, color: '#555', marginBottom: 8 }}>{data.email}</Text>
            <Text style={{ fontSize: 14, color: '#333', marginBottom: 4 }}>역할: {data.role}</Text>
            <Text style={{ fontSize: 14, color: '#666' }}>
                가입일: {new Date(data.createdAt).toLocaleDateString()}
            </Text>
            <View style={Common.XStack}>
                <Button type="primary" onPress={() => router.push('/myPage/editProfile')}>
                    회원 정보 수정
                </Button>
            </View>
        </View>
    );
};

export default Profile;
