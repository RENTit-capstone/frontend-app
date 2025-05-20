import { axiosPost } from "@/api";
import Button from "@/components/Button";
import TextInput from "@/components/TextInput";
import usePostingInput from "@/hooks/usePostingInput";
import { Common } from "@/styles/common";
import { useState } from "react";
import { View, Text, ScrollView, Alert, Image } from "react-native";
import Colors from "@/constants/Colors";
import useDateSelectorStore from "@/stores/useDateSelectorStore";
import ImagePicker from "expo-image-picker";


const NewPosting = () => {
    const {openDateSelector} = useDateSelectorStore();
    const [startDate, setStartDate] = useState<string | null>(null);
    const [endDate, setEndDate] = useState<string | null>(null);
<<<<<<< HEAD
    const [imageSrc, setImageSrc] = useState<any[]>([]);
    const formData = new FormData();
=======
    const [image, setImage] = useState<any>(null);
>>>>>>> 7f46a24844f1ff58b5ae9a71034026812017d9d6
    const { values, handleChange } = usePostingInput({
        name: "",
        description: "",
        price: "",
        damagedPolicy: "",
        returnPolicy: "",
    });

    const selectImage = async () => {
        const selectedImg = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsMultipleSelection: true,
        });

        if (!selectedImg.canceled) {
            selectedImg.assets.forEach((image) => {
                formData.append('images', image.uri);
                setImageSrc((prev) => [...prev, image.uri]);
            });
        }
    }

    const handleSubmit = async () => {
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

        formData.append('form', JSON.stringify(payload));

        try {
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
    
<<<<<<< HEAD
=======
    const selectImg = async () => {
        const result = await ({});
        if (!result.canceled) setImage(result.assets[0]);
    }
>>>>>>> 7f46a24844f1ff58b5ae9a71034026812017d9d6

    const handleDateSelect = async () => {
        const { startDate, endDate } = await openDateSelector();
        setStartDate(startDate);
        setEndDate(endDate);
        console.log(startDate, endDate);
    }

    return (
        <>
        <ScrollView style={[Common.container, Common.wrapper]}>
<<<<<<< HEAD
            <Button type="primary" onPress={selectImage}>이미지 선택</Button>
            {imageSrc[0] && 
                imageSrc.map((image) => {
                    <Image source={{uri: image.uri}}/>
            })}
=======
            <Button type="primary" onPress={selectImg}>이미지 선택</Button>
            {image && 
            <Image source={{uri: image.uri}}}/>
            }
>>>>>>> 7f46a24844f1ff58b5ae9a71034026812017d9d6
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