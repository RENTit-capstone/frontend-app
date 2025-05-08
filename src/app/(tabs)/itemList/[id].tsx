import Avatar from "@/components/Avatar";
import Badge from "@/components/Badge";
import { Common } from "@/styles/common";
import { itemList } from "@/styles/components/itemList";
import { useLocalSearchParams } from "expo-router";
import { Image, SafeAreaView, ScrollView, Text, View, ViewBase } from "react-native"
import Messages from "@/assets/images/message.svg";
import Likes from "@/assets/images/heart.svg";
import { PostingsType } from "@/types/types";
import { useEffect, useState } from "react";
import { axiosGet } from "@/api";

    const sampleData: PostingsType = {
    id: 0,
    owner: "string", 
    name: "string",
    itemImg: "string", 
    description: "string",
    price: 5000, 
    status: "OUT",
    damagedPolicy: "string",
    startDate: "string",
    endDate: "string",
    messages: 2, 
    likes: 3,
}

const Postings = () => {
    const { id } = useLocalSearchParams();
    const [data, setData] = useState<PostingsType>(sampleData);
    const OUT = false;

    useEffect(() => {
        fetchItemDetails();
    }, []);

    const fetchItemDetails = async () => {
        try {
            const response = await axiosGet(`/api/v1/items/${id}`);
            console.log("Response for fetchItemDetails: ", response.data);
            setData(response.data);
        }
        catch(error) {
            console.error(error);
        }
    }

    return (
        <SafeAreaView style={Common.container}>
            <Image source={require("@/assets/images/icon.png")} style={itemList.detailImage} />
            
            {/* bottom sheet */}
            <View style={[itemList.bottomSheet, Common.container]}>

                <View style={[itemList.detailsHeader, Common.wrapper]}>
                    <View style={[Common.textWrapper, itemList.detailsHeader]}>
                        <View style={[Common.textWrapper, itemList.detailsHeader]}>
                            <Avatar /> 
                            <Text>판매자 {data.owner}</Text>    
                        </View>
                        <View style={[Common.textWrapper, {gap: 3}]}>
                            <Messages /><Text>{data.messages}</Text>
                            <Likes /> <Text>{data.likes}</Text>
                        </View>
                    </View>
                    <View style={[itemList.rowDivider, {marginTop: 0, width: "100%"}]} />

                    <View style={[Common.textWrapper, {gap: 10}]}>
                        <Badge status={data.status} />
                        {data.status==="OUT" && <Text>반납일: 2025.05.01</Text> }
                    </View>

                    <View style={[Common.textWrapper, itemList.detailsHeader]}>    
                        <Text style={Common.bold}>{data.name}</Text>
                        <Text style={Common.bold}>{data.price.toLocaleString()}원</Text>
                    </View>
                </View>


                
                <ScrollView style={[itemList.detailInfo, Common.wrapper]}>
                    <View style={Common.section}>
                        <Text style={itemList.title}>내용</Text>
                        <Text>
                            {data.description}
                        </Text>
                    </View> 
                    <View style={Common.section}>
                        <Text style={itemList.title}>하자</Text>
                        <Text>
                            하자 입력
                            하자 입력
                            {/* 백엔드 부재 */}
                        </Text>
                    </View>
                    <View style={Common.section}>
                        <Text style={itemList.title}>파손정책</Text>
                        <Text>
                            {data.damagedPolicy}
                        </Text>
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}  

export default Postings;

