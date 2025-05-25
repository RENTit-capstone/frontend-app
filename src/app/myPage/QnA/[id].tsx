import { axiosGet } from "@/api";
import Badge from "@/components/Badge";
import { Common } from "@/styles/common";
import { itemList } from "@/styles/components/itemList";
import { QnAProcessedType, QnAType } from "@/types/types";
import formatISOToDate from "@/utils/formatDate";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Alert, Text, View } from "react-native";

type QnAPostingType = {
    inquiryId: number,
    memberId: number,
    type: QnAType,
    title: string,
    content: string,
    processed: boolean,
    createdAt: string,
}

const QnAPosting = () => {
    const {id} = useLocalSearchParams();
    const [data, setData] = useState<QnAPostingType>();    
    const processed = useRef<QnAProcessedType>("NOTPROCESSED");
    
    const fetchQnAPosting = async () => {
        try {
            const response = await axiosGet(`/api/v1/inquiries/${id}`);
            setData(response.data);
            processed.current = response.data.processed? "PROCESSED" : "NOTPROCESSED";
        }
        catch(error) {
            Alert.alert(`${error}`);
            console.error(error);
        }
    }
    
    if (!data)  return <Text>표시할 데이터가 없습니다.</Text>

    return (
        <View style={[Common.container, Common.wrapper]}>
            <View>
                <Text>{data.title}</Text>
                <Badge status={processed.current} /> 
                <Text>작성일: {formatISOToDate(data.createdAt)}</Text>
            </View>
            <View style={itemList.rowDivider} />
            <View>
                <Text>
                    {data.content}
                </Text>
            </View>
        </View>
    );
}
export default QnAPosting;