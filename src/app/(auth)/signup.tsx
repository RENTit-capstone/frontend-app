import { KeyboardAvoidingView, SafeAreaView, Text, View } from "react-native";
import { Link } from "expo-router"
import Button from "@/components/Button";
import { Common } from "@/styles/common";
import useInput from "@/hooks/useInput";
import Logo from "@/assets/images/logo.svg";
import { useState } from "react";
import EmailInfoScreen from "@/components/signup/EmailInfoScreen";
import UserInfoScreen from "@/components/signup/UserInfoScreen";
import { useSignupVerificationStore } from "@/stores/useSignupVerificationStore";
import { UserInfoType } from "@/types/types";

const Signup = () => {
    const lastPage = 2;
    const [page, setPage] = useState(0);
    const {signup} = useSignupVerificationStore();
    const {values, errors, handleChange, hideNext} = useInput({
        email: "",
        pw: "",
        pwConfirm: "",
        name: "",
        nickname: "",
        gender: "male",
        phone: "",
        university: "",
        studentId: "",
        emailVerifyCode: "",        
    });

    const handleSubmit = async () => {
        const userInfo: UserInfoType = {
            email: values.email,
            password: values.pw,
            name: values.name,
            memberType: "STUDENT",
            nickname: values.nickname,
            university: values.university,
            studentId: values.studentId,
            gender: values.gender,
            phone: values.phone,
            profileImg: null,
        }
        try {
            const response = await signup(userInfo);
            console.log(response);  //TODO: dialog로 "회원가입 완료" 띄우기
        }
        catch(error) {
            console.error(error);
        }
    };


    return (
        <SafeAreaView style={Common.container}>
            <KeyboardAvoidingView style={Common.container}>
                <Logo />
                <Text>RENTit 회원가입</Text>
                <View style={Common.YStack}>
                    {page==0 && <EmailInfoScreen values={values} errors={errors} handleChange={handleChange}/>}
                    {page===1 && <UserInfoScreen /> }

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
                                onPress={handleSubmit}
                                disabled={hideNext(page)}
                                type="primary"
                            >
                                가입하기
                            </Button>
                        ) : (
                            <Button 
                                onPress={() => (setPage(page+1))}
                                disabled={hideNext(page)}
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