import { Link } from "expo-router"
import { LoginType } from "@/types/types";
import { useState } from "react";
import TextInput from "@/components/TextInput";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import Button from "@/components/Button";
import { Styles } from "@/styles/styles";
import Logo from "@/assets/images/logo.svg";


const Login = () => {
    const [form, setForm] = useState({
        email: "",
        pw: "",
    });

    const handleSubmit = (data: LoginType) => {
        console.log(data);
    }

    const handleChange = (prop: string) => (value: string) => {
        setForm({ ...form, [prop]: value });
    }

    return (
            <View style={Styles.container}>
                <Logo />
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
                <Button 
                    onPress={() => handleSubmit(form)}
                    disabled={(form.email === "") || (form.pw === "")}
                >
                    로그인
                </Button>
                <Link
                    href={{pathname: "/"}}
                >
                    <Text style={[Styles.textOption]}>회원가입</Text>
                </Link>
            </View>
    )
}

export default Login;