import { axiosPost } from "@/api";
import Button from "@/components/Button";
import TextInput from "@/components/TextInput";
import usePostingInput from "@/hooks/usePostingInput";
import { Common } from "@/styles/common";
import { useEffect, useState } from "react";
import { View, Text, ScrollView, Alert, Image, KeyboardAvoidingView, Platform } from "react-native";
import Colors from "@/constants/Colors";
import * as ImagePicker from "expo-image-picker";
import { itemList } from "@/styles/components/itemList";
import { useBottomSheetStore } from "@/stores/useBottomSheetStore";
import DefaultDamagePolicy from "@/components/items/DefaultDamagePolicy";
import useAuthStore from "@/stores/useAuthStore";


const NewPosting = () => {
    const {openBottomSheet} = useBottomSheetStore();
    const [startDate, setStartDate] = useState<string | null>(null);
    const [endDate, setEndDate] = useState<string | null>(null);
    const [selectedImage, setSelectedImage] = useState<any[]>([]);
                const {accessToken} = useAuthStore();

    const { values, handleChange } = usePostingInput({
        name: "",
        itemImg: "",

        description: "",
        price: "",
        damagedPolicy: DefaultDamagePolicy,
        returnPolicy: "",
    });

    const selectImage = async () => {
        const selectedImgs = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsMultipleSelection: true,
            quality: 1,
        });

        if (!selectedImgs.canceled) {
            setSelectedImage(selectedImgs.assets);
        }
        else {
            setSelectedImage([]);
        }
    }

//     const handleSubmit = async () => {
//         const formData = new FormData();
//         const payload = {
//             name: values.name,
//             description: values.description,
//             price: values.price,
//             status: "AVAILABLE",
//             damagedPolicy: values.damagedPolicy,
//             returnPolicy: values.returnPolicy,
//             startDate: startDate,
//             endDate: endDate,
//         };
//         formData.append("form", JSON.stringify(payload));
//             selectedImage.forEach((image: any) => {
//             formData.append("images", {
//                 uri: image.uri,
//                 name: image.fileName ?? "image.jpg",
//                 type: "image/jpeg",
//             } as any);
//             console.log(formData);
//         });

//         try {
//     const response = await fetch(`http://172.21.35.145:8080/api/v1/items`, {
//       method: "POST",
//       headers: {
//         Accept: "application/json",
//         Authorization: `Bearer ${accessToken}`, // ✅ 직접 붙이기
//       },
//       body: formData,
//     });
//          const result = await response.json();
//          console.log(response);
//     // console.log("result:", result);
//     console.log("📩 status:", response.status);

// // response.headers는 Headers 객체
// for (const [key, value] of response.headers.entries()) {
//   console.log(`📬 ${key}: ${value}`);
// }
//   } catch (err) {
//     console.error("Submit error:", err);
//   }
// };


//     const handleSubmit = async () => {
//         const formData = new FormData();
//         const payload = {
//             name: values.name,
//             description: values.description,
//             price: values.price,
//             status: "AVAILABLE",
//             damagedPolicy: values.damagedPolicy,
//             returnPolicy: values.returnPolicy,
//             startDate: startDate,
//             endDate: endDate,
//         };

//         const jsonBlob = new Blob([JSON.stringify(payload)], {
//             type: "application/json",
//         });
//         formData.append("form", jsonBlob, "form");
//         // formData.append("form", new Blob([JSON.stringify(payload)], {type: "application/json"}));

//         selectedImage.forEach((image: any) => {
//             formData.append("images", {
//                 uri: image.uri,
//                 name: image.fileName ?? "image.jpg",
//                 type: image.type ?? "image/jpeg",
//             } as any);
//         });

//         try {
//             console.log(formData._parts);
//             const response = await axiosPost(`/api/v1/items`, formData, {
//             //     headers: {
//             //         "Content-Type": "multipart/form-data",
//             //     }
//           transformRequest: (data, headers) => data,
//     // return data;
// //   }    
//         });
//             console.log("Response for handleSubmit: ", response);
//         }
//         catch(error) {
//             Alert.alert(`${error}`);
//             console.error(error);
//         }
//     }

const handleSubmit = async () => {
    const formData = new FormData();
    const payload = {
        name: values.name,
        description: values.description,
        price: parseInt(values.price),
        status: "AVAILABLE",
        damagedPolicy: values.damagedPolicy,
        returnPolicy: values.returnPolicy,
        startDate: startDate? `${new Date(startDate).toISOString().split('.')[0]}` : `${new Date().toISOString().split('.')[0]}`,
        endDate: endDate? `${new Date(endDate).toISOString().split('.')[0]}` : `${new Date().toISOString().split('.')[0]}`,
    };

    formData.append("form", JSON.stringify(payload));
      formData.append("name", payload.name);
        formData.append("description", payload.description);
        formData.append("price", String(payload.price));
        formData.append("status", "AVAILABLE");
        formData.append("startDate", payload.startDate); // ISO 문자열
        formData.append("endDate", payload.endDate);
        formData.append("damagedPolicy", payload.damagedPolicy);
        formData.append("returnPolicy", payload.returnPolicy);
        formData.append("damagedDescription", "asdf");

    selectedImage.forEach((image: any) => {
        formData.append("images", {
            uri: image.uri,
            name: image.fileName ?? "image.jpg",
            type: image.type ?? "image/jpeg",
        } as any);
    });

    try {
        console.log(formData._parts);
        const response = await axiosPost(`/api/v1/items`, formData);
        console.log("Response for handleSubmit: ", response);
    } catch (error) {
        Alert.alert(`${error}`);
        console.error(error);
    }
};
    
    const handleDateSelect = async () => {
        const { result: { startDate, endDate } } = await openBottomSheet("dateSelector");
        setStartDate(startDate);
        setEndDate(endDate);
    }

    return (
        <KeyboardAvoidingView style={Common.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
        >
        <ScrollView style={Common.wrapper}>
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
                handleChangeText={handleChange("name")}
                value={values.name}
            />
            <TextInput 
                label="가격" 
                name="price"
                handleChangeText={handleChange("price")}
                value={values.price}
                keyboardType="numeric"
            />
            <TextInput 
                label="설명" 
                name="description"
                handleChangeText={handleChange("description")}
                value={values.description}
                multiline={true}
                style={[Common.textArea, {height: 128}]}
            />
            <TextInput 
                label="파손정책" 
                name="damagedPolicy"
                handleChangeText={handleChange("damagedPolicy")}
                value={values.damagedPolicy}
                multiline={true}
                style={[Common.textArea, {height: 64}]}
            />
            <TextInput 
                label="반납정책" 
                name="returnPolicy"
                handleChangeText={handleChange("returnPolicy")}
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
                    <Button type="primary" onPress={handleDateSelect} style={{height: 40, justifyContent: "center", paddingVertical: 0}}>
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
        </KeyboardAvoidingView>
    )
}
export default NewPosting;