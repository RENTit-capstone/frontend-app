import { Text, View } from "react-native";
import { useState } from "react";
import Button from "../Button";
import TextInput from "../TextInput";
import { useSignupVerificationStore } from "@/stores/useSignupVerificationStore";

const EmailInfoScreen = (props: any) => {
    const {values, errors, handleChange} = props;
    const {emailCodeSent, sendCode, verifyCode} = useSignupVerificationStore();
    
    const handleSendCode = async () => {
        if (errors.email)  console.log('email error');  //TODO: 이메일, 학교정보 오류 시 에러처리

        try {
            const response = await sendCode(values.email, values.university);
            console.log(response);  //TODO: dialog로 띄우기
        }
        catch(error) {
            console.error(error);
        }
    }

    const handleVerifyCode = async () => {
        try {
            const response = await verifyCode(values.email, values.university, values.emailVerifyCode);
            console.log(response); //TODO: dialog
        }
        catch(error) {
            console.error(error);
        }
    }

    return (
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
            <TextInput 
                label="이메일" 
                name="email"
                handleChangeText={handleChange}
                value={values.email}
                keyboardType="email-address"
                placeholder="email@email.com"
                errorMsg={errors.email}
            />
            <Button 
                type="primary" 
                onPress={handleSendCode} 
                disabled={!(values.email.length>3) || !!errors.email}
            >
                전송
            </Button>
            {emailCodeSent &&
            <>
            <Text>{`${values.email}로 확인 코드가 전송되었습니다.`}</Text>
                <TextInput
                    label="이메일 인증 코드"
                    name="emailVerifyCode"
                    handleChangeText={handleChange}
                    value={values.emailVerifyCode}
                />   
                <Button 
                    type="primary" 
                    onPress={handleVerifyCode} 
                    disabled={!(values.email.length>3) || !!errors.email}
                >
                    확인
                </Button>
            </>
            }
        </> 
    );
}

export default EmailInfoScreen;