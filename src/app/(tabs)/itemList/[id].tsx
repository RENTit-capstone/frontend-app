import Badge from "@/components/Badge";
import { Common } from "@/styles/common";
import { itemList } from "@/styles/components/itemList";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect } from "react";
import { Image, ScrollView, Text, View } from "react-native"

const Postings = () => {
    const { id } = useLocalSearchParams();
    console.log(id);
    const OUT = false;

    return (
        <View>
            <Image source={require("@/assets/images/icon.png")} style={itemList.detailImage} />
            
            {/* bottom sheet */}
            <View>
                <Text>판매자 마루 채팅2 관심3</Text>
                <View style={Common.textWrapper}>
                    <Badge available={OUT} />
                    {!OUT && <Text>반납일: 2025.05.01</Text> }
                </View>
                <Text style={{fontSize: 20, fontWeight: 600}}>노트북</Text>
                <Text style={{fontSize: 20, fontWeight: 600}}>5,000원 | 일</Text>
                <ScrollView style={itemList.detailInfo}>
                    <Text>내용</Text>
                    <Text>
                        내용 입력
                        내용 입력
                    </Text>
                    <Text>하자</Text>
                    <Text>
                        하자 입력
                        하자 입력
                    </Text>
                    <Text>파손정책</Text>
                    <Text>
                        파손정책 입력
                        파손정책 입력
                    </Text>
                    <Text>거래희망장소</Text>
                    <Text>홍대입구역 1번출구</Text>
                </ScrollView>
            </View>
        </View>
    )
}  

export default Postings;

