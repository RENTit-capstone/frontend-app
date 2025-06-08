import { Link, useRouter } from 'expo-router';
import { LoginType } from '@/types/types';
import { useState } from 'react';
import TextInput from '@/components/CustomTextInput';
import { Text, View } from 'react-native';
import Button from '@/components/Button';
import { Common } from '@/styles/common';
import Logo from '@/assets/images/logo.svg';
import { axiosGet, axiosNoInterceptor } from '@/api';
import useAuthStore from '@/stores/useAuthStore';
import useToast from '@/hooks/useToast';
import useNotification from '@/hooks/useNotification';

const Login = () => {
    const router = useRouter();
    const toast = useToast();
    const { setAccessToken, setRefreshToken, setUserId, setUserName } = useAuthStore();
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

            router.replace('/(tabs)/itemList');
            toast.show('로그인에 성공했습니다.');
            useNotification();
        } catch (error) {
            toast.show('이메일, 비밀번호를 다시 확인해주세요.');
            console.log(error);
        }
    };

    const handleChange = (prop: string) => (value: string) => {
        setForm({ ...form, [prop]: value });
    };

    return (
        <View style={[Common.container, Common.wrapper]}>
            <View style={[Common.YStack, { justifyContent: 'flex-start' }]}>
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
        </View>
    );
};

export default Login;
