import { KeyboardAvoidingView, SafeAreaView, Text, View } from "react-native";
import { Link } from "expo-router"
import TextInput from "@/components/TextInput";
import Button from "@/components/Button";
import { Common } from "@/styles/common";
import useInput from "@/hooks/useInput";
import Logo from "@/assets/images/logo.svg";
import { useState } from "react";
import {sendEmailVerifyCode, signup, verifyEmail} from "@/api/auth";

const Signup = () => {
    const lastPage = 3;
    const [page, setPage] = useState(0);
    const {values, errors, handleChange, blockNext} = useInput({
        email: "",
        pw: "",
        pwConfirm: "",
        name: "",
        nickname: "",
        gender: "",
        phone: "",
        university: "",
        studentId: "",
        emailVerifyCode: "",        
    });

    const handleSubmit = async () => {
        //page 2에서 회원가입 폼 전송 시 호출
        console.log(values);

        try {                
            const response = await signup(values);
            if (response.data){
                handleSendCode();       //이메일로 코드 전송  
                const newPage = page+1;
                setPage(newPage);
            }
        } 
        catch (error) {
            console.log(error);

            //실패 dialog 띄우기
            console.log("네트워크가 불안정합니다.\n 다시 시도해 주세요.");
        }
    };

    const handleSendCode = async () => {
        //이메일 인증 코드 전송 API 호출
        try{
            const response = await sendEmailVerifyCode(values.email);
            if (response.data) {
            }
        }
        catch (error){
            console.log(error);
            //실패 dialog
        }
    }

    const handleEmailVerify = async () => {
        // 이메일 코드 일치 확인 API 호출
        console.log(values.emailVerifyCode);

        try{
            const response = await verifyEmail(values.emailVerifyCode);
            if (response.data) {
                //성공 시 가입완료 dialog 띄우고 로그인 창으로 리다이렉션
                console.log("성공했습니다. 로그인해주세요");
                
            }
        }
        catch (error){
            console.log(error);
            //실패 dialog
        }
    }

    return (
        <SafeAreaView style={Common.container}>
            <KeyboardAvoidingView style={Common.container}>
                <Logo />
                <Text>RENTit 회원가입</Text>
                <View style={Common.YStack}>
                    {page==0 && 
                        <>
                            <TextInput 
                                label="이메일" 
                                name="email"
                                handleChangeText={handleChange}
                                value={values.email}
                                keyboardType="email-address"
                                placeholder="email@email.com"
                                errorMsg={errors.email}
                            />
                            <TextInput 
                                label="비밀번호" 
                                name="pw"
                                handleChangeText={handleChange}
                                value={values.pw}
                                secureTextEntry={true}
                                errorMsg={errors.pw}
                            />
                            <TextInput 
                                label="비밀번호 확인" 
                                name="pwConfirm"
                                handleChangeText={handleChange}
                                value={values.pwConfirm}
                                secureTextEntry={true}
                                errorMsg={errors.pwConfirm}
                            />
                        </>
                    }
                    {page===1 &&
                        <>
                            <TextInput 
                                label="이름" 
                                name="name"
                                handleChangeText={handleChange}
                                value={values.name}
                                errorMsg={errors.name}
                            />
                            <TextInput 
                                label="닉네임" 
                                name="nickname"
                                handleChangeText={handleChange}
                                value={values.nickname}
                                errorMsg={errors.nickname}
                            />
                            <TextInput      //드롭다운인풋 -> react-native-dropdown-picker 사용
                                label="성별" 
                                name="gender"
                                handleChangeText={handleChange}
                                value={values.gender}
                                errorMsg={errors.gender}
                            />
                            <TextInput 
                                label="전화번호" 
                                name="phone"
                                handleChangeText={handleChange}
                                value={values.phone}
                                keyboardType="name-phone-pad"
                                placeholder="01012345678"
                                errorMsg={errors.phone}
                            />
                        </>
                    }
                    {page===2 &&
                        <>
                            <TextInput 
                                label="학교" 
                                name="university"
                                handleChangeText={handleChange}
                                value={values.university}
                                errorMsg={errors.university}
                            />
                            <TextInput 
                                label="학번" 
                                name="studentId"
                                handleChangeText={handleChange}
                                value={values.studentId}
                                errorMsg={errors.studentId}
                            />                            
                        </>
                    }
                    {page==lastPage && 
                        <>
                            <Text>{`${values.email}로 확인 코드가 전송되었습니다.`}</Text>
                            <TextInput
                                label="이메일 인증 코드"
                                name="emailVerifyCode"
                                handleChangeText={handleChange}
                                value={values.emailVerifyCode}
                            />                                
                        </>
                    }
                    <View style={Styles.XStack}>
                        <Button 
                            onPress={() => (setPage(page-1))}
                            disabled={page<=0}
                            type="option"
                        >
                            이전
                        </Button>
                        {page===lastPage?(
                            //email 인증 코드 전부 입력 시 가입 완료 
                            <Button 
                                onPress={handleEmailVerify}
                                disabled={blockNext(page)}
                                type="primary"
                            >
                                가입하기
                            </Button>
                        ) : (
                            //정보 입력이 끝나는 page 2에서는 handleSubmit로 백엔드에 정보 전송
                            //그렇지 않은 page 0, 1에서는 다음 페이지로 이동
                            <Button 
                                onPress={page===2? handleSubmit : () => (setPage(page+1))}
                                disabled={blockNext(page)}
                                type="primary"
                            >
                                다음
                            </Button>
                        )}
                    </View>

                    <Link href={{pathname: "/(auth)/login"}}>
                        <Text style={[Common.textOption]}>로그인</Text>
                    </Link>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default Signup;