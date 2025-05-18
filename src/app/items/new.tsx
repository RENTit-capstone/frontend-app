import TextInput from "@/components/TextInput";
import usePostingInput from "@/hooks/usePostingInput";
import { Common } from "@/styles/common";
import { View, Text, ScrollView } from "react-native";

const NewPosting = () => {
    const { values, handleChange } = usePostingInput({
        name: "",
        itemImg: "",
        description: "",
        price: "",
        status: "AVAILABLE",
        damagedPolicy: "",
        returnPolicy: "",
        startDate: "",
        endDate: "",
    });
    
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


        </ScrollView>
    )
}
export default NewPosting;