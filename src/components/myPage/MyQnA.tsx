import { axiosGet } from "@/api";
import { Common } from "@/styles/common";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, ScrollView } from "react-native";

type QnAListType = {
    inquiryId : number,
    memberId : number,
    type : string,
    title : string,
    content : string,
    processed : false,
    createdAt : string,
}

const MyQnA = () => {
    const router = useRouter();
    const [data, setData] = useState([]);
    
    const fetchMyQnA = async () => {
        const response = await axiosGet(`/api/v1/inquiries`);
        console.log(response.data);
    }
    return (
        <ScrollView style={[Common.container, Common.wrapper]}>
            <Pressable onPress={router.push(`/`)}>
                
            </Pressable>

        </ScrollView>
    );
}
export default MyQnA;