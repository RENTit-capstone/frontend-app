import { KeyboardAvoidingView, Text, View } from 'react-native';
import { Link } from 'expo-router';
import Button from '@/components/Button';
import { Common } from '@/styles/common';
import useValidateInput from '@/hooks/useValidateInput';
import Logo from '@/assets/images/logo.svg';
import { useState } from 'react';
import EmailInfoScreen from '@/components/signup/EmailInfoScreen';
import UserInfoScreen from '@/components/signup/UserInfoScreen';
import { useSignupVerificationStore } from '@/stores/useSignupVerificationStore';
import { UserInfoType } from '@/types/types';

const Signup = () => {
    const lastPage = 1;
    const [page, setPage] = useState(0);
    const { emailVerified, signup } = useSignupVerificationStore();
    const validate = useValidateInput({
        email: '',
        pw: '',
        pwConfirm: '',
        name: '',
        nickname: '',
        gender: '',
        phone: '',
        university: '',
        studentId: '',
        emailVerifyCode: '',
    });
    const { values, errors, handleChange, blockNext } = validate;

    const handleSubmit = async () => {
        const userInfo: UserInfoType = {
            email: values.email,
            password: values.pw,
            name: values.name,
            memberType: 'STUDENT',
            nickname: values.nickname,
            university: values.university,
            studentId: values.studentId,
            gender: values.gender,
            phone: values.phone,
            profileImg: null,
        };
        try {
            const response = await signup(userInfo);
            console.log(response); //TODO: dialog로 "회원가입 완료" 띄우기
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <KeyboardAvoidingView style={[Common.container, Common.wrapper]}>
            <View style={[Common.YStack, { justifyContent: 'flex-start' }]}>
                <View style={{ paddingVertical: '10%' }}>
                    <Logo />
                </View>

                {page == 0 && <EmailInfoScreen validate={validate} />}
                {page === 1 && <UserInfoScreen validate={validate} />}

                <View style={Common.XStack}>
                    <Button onPress={() => setPage(page - 1)} disabled={page <= 0} type="option">
                        이전
                    </Button>

                    {page === lastPage ? (
                        <Button onPress={handleSubmit} disabled={blockNext(page)} type="primary">
                            가입하기
                        </Button>
                    ) : (
                        <Button
                            onPress={() => setPage(page + 1)}
                            disabled={!emailVerified && blockNext(page)}
                            type="primary"
                        >
                            다음
                        </Button>
                    )}
                </View>

                <Link href={{ pathname: '/(auth)/login' }}>
                    <Text style={[Common.textOption]}>로그인</Text>
                </Link>
            </View>
        </KeyboardAvoidingView>
    );
};

export default Signup;
