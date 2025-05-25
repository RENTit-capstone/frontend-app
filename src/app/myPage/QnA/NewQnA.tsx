import { axiosPost } from "@/api";
import useAuthStore from "@/stores/useAuthStore";
import { Alert, ScrollView, Text, View } from "react-native";
import KeyboardAvoidingView from "../../../components/KeyboardAvoidingView";
import { useState } from "react";
import { Common } from "@/styles/common";
import TextInput from "../../../components/TextInput";
import Button from "../../../components/Button";
import { useRouter } from "expo-router";

const NewQnA = () => {
    const {userId} = useAuthStore();
    const router = useRouter();
    const [form, setForm] = useState({
        title: "",
        content: ""
    });
    const [image, setImage] = useState("");

    const handleChange = (name: string) => (text: string) => {
        setForm({...form, [name]: text});
    }

    const handleSubmit = async () => {
        const payload = {
            memberId : userId,
            title : form.title,
            content : form.content,
            type : "SERVICE"
        }
        try {
            const response = await axiosPost(`/api/v1/inquiries`, payload);
            console.log(response.data);
            Alert.alert("작성이 완료되었습니다");
            router.replace("/(tabs)/itemList");
        }
        catch(error) {
            Alert.alert(`${error}`);
            console.error(error);
        }
    }  
    
    const handleCancel = () => {
        Alert.alert(
            "문의 작성을 취소하시겠습니까?",
            "입력하신 내용이 삭제됩니다",
            [{
                text: "취소",
                onPress: () => console.log("취소"),
                style: "cancel"
            },{ 
                text: "확인", 
                onPress: () => router.replace("/(tabs)/itemList"),
            }],
            { cancelable: false }
        );
    }

    return (
        <KeyboardAvoidingView>
            <ScrollView style={Common.wrapper}>
                <Text>문의 작성</Text>
                <TextInput 
                    label="제목"
                    name="title"
                    handleChangeText={handleChange("title")}
                    value={form.title}
                />
                <TextInput 
                    label="내용" 
                    name="content"
                    handleChangeText={handleChange("description")}
                    value={form.content}
                    multiline={true}
                    style={[Common.textArea, {height: 128}]}
                />

                <View style={Common.XStack}>
                    <Button type="option" onPress={handleCancel}>
                        취소
                    </Button>
                    <Button type="primary" onPress={handleSubmit}>
                        업로드
                    </Button>
                </View>

            </ScrollView>
        </KeyboardAvoidingView>
    );
}
export default NewQnA;