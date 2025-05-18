import { axiosPost } from "@/api";
import Button from "@/components/Button";
import TextInput from "@/components/TextInput";
import usePostingInput from "@/hooks/usePostingInput";
import { Common } from "@/styles/common";
import { View, Text, ScrollView, Alert } from "react-native";

const NewPosting = () => {
    const { values, handleChange } = usePostingInput({
        name: "",
        itemImg: "",
        description: "",
        price: "",
        damagedPolicy: "",
        returnPolicy: "",
        startDate: "",
        endDate: "",
    });

    const handleSubmit = async () => {
        const payload = {
            ownerId: 0,
            status: "AVAILABLE",
            values
        }
        try {
            const response = await axiosPost(`/api/v1/items`, payload);
            console.log("Response for handleSubmit: ", response);
        }
        catch(error) {
            Alert.alert(`${error}`);
            console.error(error);
        }
    }

    return (
        <ScrollView style={Common.container}>
            <TextInput 
                label="물품명" 
                name="name"
                handleChangeText={handleChange}
                value={values.name}
            />
            <TextInput 
                label="설명" 
                name="description"
                handleChangeText={handleChange}
                value={values.description}
            />
            <TextInput 
                label="가격" 
                name="price"
                handleChangeText={handleChange}
                value={values.price}
                keyboardType="numeric"
            />
            <TextInput 
                label="파손정책" 
                name="damagedPolicy"
                handleChangeText={handleChange}
                value={values.damagedPolicy}
            />
            <TextInput 
                label="반납정책" 
                name="returnPolicy"
                handleChangeText={handleChange}
                value={values.returnPolicy}
            />
            <TextInput 
                label="대여 가능 기간" 
                name="startDate"
                handleChangeText={handleChange}
                value={values.damagedPolicy}
            />

            <Button type="primary" onPress={handleSubmit}>
                업로드
            </Button>
        </ScrollView>
    )
}
export default NewPosting;