import { KeyboardAvoidingView, SafeAreaView, Text, View } from "react-native";
import { Link } from "expo-router"
import TextInput from "@/components/TextInput";
import Button from "@/components/Button";
import { Common } from "@/styles/common";
import useInput from "@/hooks/useInput";
import Logo from "@/assets/images/logo.svg";
import { useState } from "react";
import {sendEmailVerifyCode, signup, verifyEmail} from "@/api/auth";
import EmailInfoScreen from "@/components/signup/EmailInfoScreen";
import UserInfoScreen from "@/components/signup/UserInfoScreen";
import UnivInfoScreen from "@/components/signup/UnivInfoScreen";

const Signup = () => {
    const lastPage = 3;
    const [page, setPage] = useState(0);
    const [showVerifyInput, setShowverifyInput] = useState(false);
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
        if (errors.email)  console.log('asdf');
        setShowverifyInput(true);
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
                    {page==0 && <EmailInfoScreen />}
                    {page===1 && <UserInfoScreen /> }
                    {page===2 && <UnivInfoScreen />}

                    <View style={Common.XStack}>
                        <Button 
                            onPress={() => (setPage(page-1))}
                            disabled={page<=0}
                            type="option"
                        >
                            이전
                        </Button>
                        
                        {page===lastPage?(
                            <Button 
                                onPress={handleEmailVerify}
                                disabled={blockNext(page)}
                                type="primary"
                            >
                                가입하기
                            </Button>
                        ) : (
                            <Button 
                                onPress={() => (setPage(page+1))}
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