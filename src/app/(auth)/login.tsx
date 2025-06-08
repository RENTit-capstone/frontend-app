import { Link, useRouter } from 'expo-router';
import { LoginType } from '@/types/types';
import { useEffect, useState } from 'react';
import TextInput from '@/components/CustomTextInput';
import { Alert, ScrollView, Text, View } from 'react-native';
import Button from '@/components/Button';
import { Common } from '@/styles/common';
import Logo from '@/assets/images/logo.svg';
import { axiosGet, axiosNoInterceptor, axiosPost } from '@/api';
import useAuthStore from '@/stores/useAuthStore';
import useToast from '@/hooks/useToast';
import KeyboardAvoidingView from '@/components/KeyboardAvoidingView';

const Login = () => {
    const router = useRouter();
    const toast = useToast();
    const {
        setAccessToken,
        setRefreshToken,
        setUserId,
        setUniversity,
        setUserName,
        setUserProfileImg,
    } = useAuthStore();
    const [form, setForm] = useState({
        email: '',
        password: '',
    });

    const login = async (payload: LoginType) => {
        try {
            const res = await axiosNoInterceptor.post(`/api/v1/auth/login`, payload);
            if (!res.data.success) throw new Error(res.data.message);

            setUserId(res.data.data.memberId);
            await setAccessToken(res.data.data.accessToken);
            await setRefreshToken(res.data.data.refreshToken);
            const userInfo = await axiosGet(`/api/v1/members/me`);
            setUserName(userInfo.data.nickname);
            setUserProfileImg(userInfo.data.profileImg);
            setUniversity(userInfo.data.university);

            if (fcmToken) {
                await axiosPost('/api/v1/device-token', { token: fcmToken });
                console.log('FCM 토큰 전송 완료');
                Alert.alert('FCM 토큰 전송 완료');
            }

            router.replace('/(tabs)/itemList');
            toast.show('로그인에 성공했습니다.');
        } catch (error) {
            toast.show('이메일, 비밀번호를 다시 확인해주세요.');
            console.log(error);
        }
    };

    const handleChange = (prop: string) => (value: string) => {
        setForm({ ...form, [prop]: value });
    };

    return (
        <KeyboardAvoidingView>
            <ScrollView
                style={[Common.container, Common.wrapper]}
                contentContainerStyle={{ justifyContent: 'flex-start', alignItems: 'center' }}
            >
                <View style={[Common.YStack, { flex: 1, width: '100%' }]}>
                    <View style={{ paddingVertical: '10%' }}>
                        <Logo />
                    </View>
                    <TextInput
                        name="email"
                        label="email"
                        handleChangeText={handleChange('email')}
                        value={form.email}
                        placeholder="email@email.com"
                        keyboardType="email-address"
                    />
                    <TextInput
                        name="password"
                        label="password"
                        handleChangeText={handleChange('password')}
                        value={form.password}
                        secureTextEntry={true}
                    />
                    <View style={[Common.XStack, { alignSelf: 'stretch' }]}>
                        <Button
                            onPress={() => login(form)}
                            disabled={form.email === '' || form.password === ''}
                            type="primary"
                        >
                            로그인
                        </Button>
                    </View>
                    <Link href={{ pathname: '/(auth)/signup' }}>
                        <Text style={[Common.textOption]}>회원가입</Text>
                    </Link>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default Login;
