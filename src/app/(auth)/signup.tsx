import { KeyboardAvoidingView, SafeAreaView, Text, View } from "react-native";
import { Link } from "expo-router"
import TextInput from "@/components/TextInput";
import Button from "@/components/Button";
import { Styles } from "@/styles/styles";
import login from "@/api/login";
import useInput from "@/hooks/useInput";
import { SignupType } from "@/types/types";
import Logo from "@/assets/images/logo.svg";

const Signup = () => {
    const {values, handleChange} = useInput({
        email: "",
        pw: "",
        pwConfirm: "",
        name: "",
        nickname: "",
        gender: "",
        phone: "",
        university: "",
        studentId: "",        
    });

    const handleSubmit = () => {
        //제출 시 백엔드에 정보 보내고 email 인증하는 코드 입력하는 창으로 리다이렉션
        console.log(values);
        try {
            signup(values);
        } 
        catch (error) {
            console.log(error);
        }
    };

    return (
        <SafeAreaView style={Styles.container}>
            <KeyboardAvoidingView style={Styles.container}>
                <Logo />
                <Text>RENTit 회원가입</Text>
                <View style={Styles.fullYStack}>
                    <TextInput 
                        label="이메일" 
                        handleChangeText={handleChange}
                        value={values.email}
                        keyboardType="email-address"
                    />
                    <TextInput 
                        label="비밀번호" 
                        handleChangeText={handleChange}
                        value={values.pw}
                        secureTextEntry={true}
                    />
                    <TextInput 
                        label="비밀번호 확인" 
                        handleChangeText={handleChange}
                        value={values.pwConfirm}
                        secureTextEntry={true}
                    />
                    <TextInput 
                        label="이름" 
                        handleChangeText={handleChange}
                        value={values.name}
                    />
                    <TextInput 
                        label="닉네임" 
                        handleChangeText={handleChange}
                        value={values.nickname}
                    />
                    <TextInput      //드롭다운인풋 -> react-native-dropdown-picker 사용
                        label="성별" 
                        handleChangeText={handleChange}
                        value={values.gender}
                    />
                    <TextInput 
                        label="전화번호" 
                        handleChangeText={handleChange}
                        value={values.phone}
                        keyboardType="name-phone-pad"
                    />
                    <TextInput 
                        label="학교" 
                        handleChangeText={handleChange}
                        value={values.name}
                        keyboardType="email-address"
                    />
                    <TextInput 
                        label="학번" 
                        handleChangeText={handleChange}
                        value={values.name}
                        keyboardType="email-address"
                    />
                    <Button 
                        onPress={handleSubmit}
                        disabled={(form.email === "") || (form.pw === "")}
                    >
                        가입하기
                    </Button>

                    <Link href={{pathname: "/(auth)/login"}}>
                        <Text style={[Styles.textOption]}>로그인</Text>
                    </Link>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default Signup;