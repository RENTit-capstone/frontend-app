import { Link } from "expo-router"
import { LoginType } from "@/types/types";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import TextInput from "@/components/TextInput";
import { Text, View, TouchableOpacity } from "react-native";

const Login = () => {
    const [form, setForm] = useState({
        email: "",
        pw: "",
    });
    const handleValidation = (data: LoginType) => {

    }

    const handleSubmit = (data: LoginType) => {
        console.log(data);
    }

    const handleChange = (prop: string) => (value: string) => {
        setForm({ ...form, [prop]: value });
    }

    return (
            <SafeAreaView>
                <Text>RENTit 로그인</Text>
                <View>
                    <TextInput 
                        label="email" 
                        handleChangeText={handleChange("email")}
                        value={form.email}
                        placeholder="email@email.com"
                        keyboardType="email-address"
                    />
                    <TextInput 
                        label="password" 
                        handleChangeText={handleChange("pw")}
                        value={form.pw}
                        secureTextEntry={true}
                    />
                </View>
                <TouchableOpacity 
                    onPress={() => handleSubmit(form)}
                    disabled={(form.email === "") && (form.pw === "")}
                    >
                    <Text>로그인</Text>
                </TouchableOpacity>
                <Link
                    href={{pathname: "/"}}
                >
                    <Text>회원가입</Text>
                </Link>
            </SafeAreaView>
    )
}

export default Login;