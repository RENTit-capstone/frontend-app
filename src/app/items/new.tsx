import { axiosPost } from "@/api";
import Button from "@/components/Button";
import TextInput from "@/components/TextInput";
import usePostingInput from "@/hooks/usePostingInput";
import { Common } from "@/styles/common";
import { useEffect, useState } from "react";
import { View, Text, ScrollView, Alert, Image } from "react-native";
import Colors from "@/constants/Colors";
import useDateSelectorStore from "@/stores/useDateSelectorStore";
import * as ImagePicker from "expo-image-picker";
import { itemList } from "@/styles/components/itemList";


const NewPosting = () => {
    const {openDateSelector} = useDateSelectorStore();
    const [startDate, setStartDate] = useState<string | null>(null);
    const [endDate, setEndDate] = useState<string | null>(null);
    const [selectedImage, setSelectedImage] = useState<any[]>([]);
    const { values, handleChange } = usePostingInput({
        name: "",
        itemImg: "",
        description: "",
        price: "",
        damagedPolicy: "",
        returnPolicy: "",
    });

    useEffect(() => {
        console.log(selectedImage)
    }, [selectedImage]);

    const selectImage = async () => {
        const selectedImgs = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsMultipleSelection: true,
            quality: 1,
        });

        if (!selectedImgs.canceled) {
            console.log(selectedImgs.assets);
            setSelectedImage(selectedImgs.assets);
        }
        else {
            setSelectedImage([]);
        }
    }

    const handleSubmit = async () => {
        const formData = new FormData();
        const payload = {
            name: values.name,
            description: values.description,
            price: values.price,
            status: "AVAILABLE",
            damagedPolicy: values.damagedPolicy,
            returnPolicy: values.returnPolicy,
            startDate: startDate,
            endDate: endDate,
        };

        formData.append("form", new Blob([JSON.stringify(payload)], {type: "application/json"}));

        selectedImage.forEach((image: any) => {
            formData.append("images", {
                filename: image.uri,
                name: "images"
            } as any);
        });

        try {
            console.log(formData);
            const response = await axiosPost(`/api/v1/items`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            });
            console.log("Response for handleSubmit: ", response);
        }
        catch(error) {
            Alert.alert(`${error}`);
            console.error(error);
        }
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
            <View style={[Common.XStack, {paddingVertical: 16}]}>
                <Button type="option" onPress={selectImage} style={itemList.imageSelectButton}>
                    이미지 선택
                </Button>
            
                {selectedImage.length > 0 && 
                    selectedImage.map((image) => (
                        <View key={image.uri}>
                            <Image source={{uri: image.uri}} style={{width: 100, height: 100}}/>
                        </View>
                ))}
            </View>
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