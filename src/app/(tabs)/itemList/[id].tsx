import Avatar from "@/components/Avatar";
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
        <View style={Common.container}>
            <Image source={require("@/assets/images/icon.png")} style={itemList.detailImage} />
            
            {/* bottom sheet */}
            <View style={itemList.bottomSheet}>

                <View style={[itemList.detailsHeader, Common.wrapper]}>
                    <View style={[Common.textWrapper, itemList.detailsHeader]}>
                        <View style={[Common.textWrapper, itemList.detailsHeader]}>
                            <Avatar /> 
                            <Text>판매자 마루</Text>    
                        </View>
                        <Text>채팅2 관심3</Text>
                    </View>
                    <View style={[itemList.rowDivider, {marginTop: 0, width: "100%"}]} />

                    <View style={[Common.textWrapper, {gap: 10}]}>
                        <Badge available={OUT} />
                        {!OUT && <Text>반납일: 2025.05.01</Text> }
                    </View>

                    <View style={[Common.textWrapper, itemList.detailsHeader]}>    
                        <Text style={Common.bold}>노트북</Text>
                        <Text style={Common.bold}>5,000원 | 일</Text>
                    </View>
                </View>



                <ScrollView style={[itemList.detailInfo, Common.wrapper]}>
                    <View style={Common.section}>
                        <Text style={itemList.title}>내용</Text>
                        <Text>
                            내용 입력
                            내용 입력
                        </Text>
                    </View> 
                    <View style={Common.section}>
                        <Text style={itemList.title}>하자</Text>
                        <Text>
                            하자 입력
                            하자 입력
                        </Text>
                    </View>
                    <View style={Common.section}>
                        <Text style={itemList.title}>파손정책</Text>
                        <Text>
                            파손정책 입력
                            파손정책 입력
                        </Text>
                    </View>
                </ScrollView>
            </View>
        </View>
    )
}  

export default Postings;

