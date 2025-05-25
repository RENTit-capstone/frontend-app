import { axiosGet } from "@/api";
import Badge from "@/components/Badge";
import { Common } from "@/styles/common";
import { itemList } from "@/styles/components/itemList";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";

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
    const [data, setData] = useState<QnAListType[]>();
    
    const fetchMyQnA = async () => {
        const response = await axiosGet(`/api/v1/inquiries`);
        console.log(response.data);
    }

    return (
        <ScrollView style={[Common.container, Common.wrapper]}>
            {data && data.map((item) => (
                <>
                <Pressable onPress={() => router.push(`/myPage/QnA/${item.inquiryId}`)}>
                    <View>
                        <Badge status={item.processed ? "PROCESSED" : "NOTPROCESSED"} />
                        <Text>
                            {item.title}
                        </Text>
                    </View>
                </Pressable>
                <View style={itemList.rowDivider} />
            </>
            ))}
        </ScrollView>
    );
}
export default MyQnA;