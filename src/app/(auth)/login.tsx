import { Link, useRouter } from "expo-router"
import { LoginType } from "@/types/types";
import { useState } from "react";
import TextInput from "@/components/TextInput";
import { Text, View } from "react-native";
import Button from "@/components/Button";
import { Common } from "@/styles/common";
import Logo from "@/assets/images/logo.svg";
import { axiosNoInterceptor, axiosPost } from "@/api";
import useAuthStore from "@/stores/useAuthStore";


const Login = () => {
    const router = useRouter();
    const {setAccessToken, setRefreshToken} = useAuthStore();
    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const login = async (payload: LoginType) => {
        try {
            const res = await axiosNoInterceptor.post(`/api/v1/auth/login`, payload);
            if (!res.data.success)  throw new Error(res.data.message);

            await setAccessToken(res.data.data.accessToken);
            await setRefreshToken(res.data.data.refreshToken);
            router.replace("/(tabs)/itemList");
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
                        name="password"
                        label="password" 
                        handleChangeText={handleChange("password")}
                        value={form.password}
                        secureTextEntry={true}
                    />
                    <View style={Common.XStack}>
                        <Button 
                            onPress={() => login(form)}
                            disabled={(form.email === "") || (form.password === "")}
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