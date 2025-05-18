import { axiosPost } from "@/api";
import BottomScrollSheet from "@/components/BottomScrollSheet";
import Button from "@/components/Button";
import DateSelector from "@/components/items/DateSelector";
import TextInput from "@/components/TextInput";
import usePostingInput from "@/hooks/usePostingInput";
import { Common } from "@/styles/common";
import { useState } from "react";
import { View, Text, ScrollView, Alert } from "react-native";
import { combine } from "zustand/middleware";
import Cancel from "@/assets/images/cancel.svg";
import Colors from "@/constants/Colors";


const NewPosting = () => {
    const [showDateSelector, setShowDateSelector] = useState(false);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
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
        <>
        <ScrollView style={[Common.container, Common.wrapper]}>
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
            <View style={[Common.fullScreen]}>
                <Text>대여 가능 기간</Text>
                <View style={[Common.XStack, Common.fullScreen, {alignItems: "center"}]}>
                    <View style={[Common.textInput, {width: "80%", backgroundColor: Colors.option}]}>
                        <Text>{startDate} ~ {endDate}</Text>
                    </View>
                    <Button type="primary" onPress={() => setShowDateSelector(true)} style={{height: 40, justifyContent: "center"}}>
                        기간 선택
                    </Button>

                </View>
            </View>


            <Button type="primary" onPress={handleSubmit}>
                업로드
            </Button>
            
        </ScrollView>
        {showDateSelector && 
            <View style={Common.darkBackground}>
            <BottomScrollSheet snapPointList={["65%"]} style={{backgroundColor: "#fff"}}  bottomInsent={0}>
                <View>
                    <Button type="option" onPress={() => setShowDateSelector(false)} style={Common.cancel}><Cancel /></Button>
                    <View style={{alignItems: "center", paddingVertical: 15,}}>
                        <Text style={{fontSize: 18, fontWeight: 500}}>일정 선택</Text>
                    </View>
                    <DateSelector 
                        startDate={startDate}
                        endDate={endDate}
                        setStartDate={setStartDate}
                        setEndDate={setEndDate}
                        />
                    <Button type="primary" onPress={() => setShowDateSelector(false)}>저장</Button>
                </View>
            </BottomScrollSheet>
        </View>
        }
        </>
    )
}
export default NewPosting;