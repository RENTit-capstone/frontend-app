import TextInput from "../TextInput";

const EmailInfoScreen = () => {
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
                    onPress={handleSendCode} 
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