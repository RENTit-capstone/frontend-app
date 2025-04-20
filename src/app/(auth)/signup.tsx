import { KeyboardAvoidingView, SafeAreaView, Text, View } from "react-native";
import { Link } from "expo-router"
import TextInput from "@/components/TextInput";
import Button from "@/components/Button";
import { Styles } from "@/styles/styles";
import login from "@/api/login";
import useInput from "@/hooks/useInput";
import { SignupType } from "@/types/types";
import Logo from "@/assets/images/logo.svg";
import { useState } from "react";

const Signup = () => {
    const totalPage = 3;
    const [page, setPage] = useState(0);
    const {values, errors, handleChange, isEmpty} = useInput({
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
            // signup(values);
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
                    {page==0 && 
                        <>
                            <TextInput 
                                label="이메일" 
                                name="email"
                                handleChangeText={handleChange}
                                value={values.email}
                                keyboardType="email-address"
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
                    <Button 
                        onPress={() => (setPage(page-1))}
                        disabled={page<=0}
                    >
                        이전
                    </Button>
                    {page===totalPage-1?(
                        <Button 
                            onPress={() => console.log(errors)}
                            // disabled={errors}
                        >
                            가입하기
                        </Button>
                    ) : (
                        <Button 
                            onPress={() => (setPage(page+1))}
                            disabled={isEmpty(page)}
                        >
                            다음
                        </Button>
                    )}

                    <Link href={{pathname: "/(auth)/login"}}>
                        <Text style={[Styles.textOption]}>로그인</Text>
                    </Link>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default Signup;