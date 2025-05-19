import { axiosPost } from "@/api";
import Button from "@/components/Button";
import TextInput from "@/components/TextInput";
import usePostingInput from "@/hooks/usePostingInput";
import { Common } from "@/styles/common";
import { useState } from "react";
import { View, Text, ScrollView, Alert, Image } from "react-native";
import Colors from "@/constants/Colors";
import useDateSelectorStore from "@/stores/useDateSelectorStore";


const NewPosting = () => {
    const {openDateSelector} = useDateSelectorStore();
    const [startDate, setStartDate] = useState<string | null>(null);
    const [endDate, setEndDate] = useState<string | null>(null);
    const [image, setImage] = useState<any>(null);
    const { values, handleChange } = usePostingInput({
        name: "",
        itemImg: "",
        description: "",
        price: "",
        damagedPolicy: "",
        returnPolicy: "",
    });

    const handleSubmit = async () => {
        const payload = {
            ownerId: 0,
            status: "AVAILABLE",
            startDate: startDate,
            endDate: endDate,
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
    
    const selectImg = async () => {
        const result = await ({});
        if (!result.canceled) setImage(result.assets[0]);
    }

    const handleDateSelect = async () => {
        const { startDate, endDate } = await openDateSelector();
        setStartDate(startDate);
        setEndDate(endDate);
        console.log(startDate, endDate);
    }

    return (
        <>
        <ScrollView style={[Common.container, Common.wrapper]}>
            <Button type="primary" onPress={selectImg}>이미지 선택</Button>
            {image && 
            <Image source={{uri: image.uri}}}/>
            }
            <TextInput 
                label="물품명"      
                name="name"
                handleChangeText={handleChange}
                value={values.name}
            />
            <TextInput 
                label="가격" 
                name="price"
                handleChangeText={handleChange}
                value={values.price}
                keyboardType="numeric"
            />
            <TextInput 
                label="설명" 
                name="description"
                handleChangeText={handleChange}
                value={values.description}
                multiline={true}
                style={[Common.textArea, {height: 128}]}
            />
            <TextInput 
                label="파손정책" 
                name="damagedPolicy"
                handleChangeText={handleChange}
                value={values.damagedPolicy}
                multiline={true}
                style={[Common.textArea, {height: 64}]}
            />
            <TextInput 
                label="반납정책" 
                name="returnPolicy"
                handleChangeText={handleChange}
                value={values.returnPolicy}
                multiline={true}
                style={[Common.textArea, {height: 64}]}
            />
            <View style={[Common.fullScreen]}>
                <Text>대여 가능 기간</Text>
                <View style={[Common.XStack, Common.fullScreen, {alignItems: "center"}]}>
                    <View style={[Common.textInput, {width: "80%", backgroundColor: Colors.option}]}>
                        {startDate&&endDate&& <Text>{startDate} ~ {endDate}</Text>}
                    </View>
                    <Button type="primary" onPress={handleDateSelect} style={{height: 40, justifyContent: "center"}}>
                        기간 선택
                    </Button>

                </View>
            </View>

            <View style={Common.XStack}>
                <Button type="option" onPress={handleSubmit}>
                    취소
                </Button>
                <Button type="primary" onPress={handleSubmit}>
                    업로드
                </Button>
            </View>

        </ScrollView>
        </>
    )
}
export default NewPosting;