import { Text, View } from "react-native";
import Button from "../Button";
import TextInput from "../TextInput";
import { useSignupVerificationStore } from "@/stores/useSignupVerificationStore";
import { Common } from "@/styles/common";

const EmailInfoScreen = (props: any) => {
    const {validate} = props;
    const {values, errors, handleChange} = validate;
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
                handleChangeText={handleChange("university")}
                value={values.university}
                errorMsg={errors.university}
            />
            <TextInput 
                label="학번" 
                name="studentId"
                handleChangeText={handleChange("studentId")}
                value={values.studentId}
                errorMsg={errors.studentId}
            />   
            <TextInput 
                label="이메일" 
                name="email"
                handleChangeText={handleChange("email")}
                value={values.email}
                keyboardType="email-address"
                placeholder="email@email.com"
                errorMsg={errors.email}
            />
            
            <View style={Common.XStack}>
                <Button 
                    type="primary" 
                    onPress={handleSendCode} 
                    disabled={!(values.email.length>3) || !!errors.email}
                >
                    전송
                </Button>
            </View>

            {emailCodeSent &&
            <>
                <TextInput
                    label="이메일 인증 코드"
                    name="emailVerifyCode"
                    handleChangeText={handleChange("emailVerifyCode")}
                    value={values.emailVerifyCode}
                />
                <Text>{`${values.email}로 확인 코드가 전송되었습니다.`}</Text>
                <View style={Common.XStack}>
                    <Button 
                        type="primary" 
                        onPress={handleVerifyCode} 
                        disabled={!(values.email.length>3) || !!errors.email}
                    >
                        확인
                    </Button>
                </View>
            </>
            }
        </> 
    );
}

export default EmailInfoScreen;