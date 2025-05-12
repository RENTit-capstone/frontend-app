import { Text, View } from "react-native";
import { useState } from "react";
import Button from "../Button";
import TextInput from "../TextInput";
import { useSignupVerificationStore } from "@/stores/useSignupVerificationStore";

const EmailInfoScreen = (props: any) => {
    const {values, errors, handleChange} = props;
    const {sendCode, verifyCode} = useSignupVerificationStore();
    const [showVerifyInput, setShowverifyInput] = useState(false);
    
    const handleSendCode = () => {
        if (errors.email)  console.log('email error');  //TODO: 이메일 오류 시 에러처리

        sendCode(values.email);
        setShowverifyInput(true);
    }

    return (
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
            <Button 
                type="primary" 
                onPress={handleSendCode} 
                disabled={!(values.email.length>3) || !!errors.email}
            >
                전송
            </Button>
            {showVerifyInput &&
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
                    onPress={() => verifyCode(values.verifyCode)} 
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