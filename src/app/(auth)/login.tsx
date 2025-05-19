import { Link } from "expo-router"
import { LoginType } from "@/types/types";
import { useState } from "react";
import TextInput from "@/components/TextInput";
import { Text, View } from "react-native";
import Button from "@/components/Button";
import { Common } from "@/styles/common";
import Logo from "@/assets/images/logo.svg";
import { axiosPost } from "@/api";
import useAuthStore from "@/stores/useAuthStore";


const Login = () => {
    const {setAccessToken, setRefreshToken} = useAuthStore();
    const [form, setForm] = useState({
        email: "",
        pw: "",
    });

    const login = async (payload: LoginType) => {
        try {
            const response = await axiosPost(`/api/v1/auth/login`, payload);
            setAccessToken(response.data.accessToken);
            await setRefreshToken(response.data.refreshToken);
            console.log("Response for login: ", response.data);
        } 
        catch (error) {
            console.log(error);
        }
    }

    const handleChange = (prop: string) => (value: string) => {
        setForm({ ...form, [prop]: value });
    }

    return (
            <View style={[Common.container, Common.wrapper]}>
                <View style={[Common.YStack, {justifyContent: "flex-start"}]}>
                    <View style={{paddingVertical: "10%"}}>
                        <Logo />
                    </View>                    
                    <TextInput 
                        name="email"
                        label="email" 
                        handleChangeText={handleChange("email")}
                        value={form.email}
                        placeholder="email@email.com"
                        keyboardType="email-address"
                    />
                    <TextInput 
                        name="pw"
                        label="password" 
                        handleChangeText={handleChange("pw")}
                        value={form.pw}
                        secureTextEntry={true}
                    />
                    <View style={Common.XStack}>
                        <Button 
                            onPress={() => login(form)}
                            disabled={(form.email === "") || (form.pw === "")}
                            type="primary"
                        >
                            로그인
                        </Button>
                    </View>

                    <Link href={{pathname: "/(auth)/signup"}}>
                        <Text style={[Common.textOption]}>회원가입</Text>
                    </Link>
                </View>
            </View>
    )
}

export default Login;