import { Pressable, Text, View } from "react-native";
import { Common } from "@/styles/common";
import StatusButtonGroup from "@/components/itemList/StatusButtonGroup";
import { useRouter } from "expo-router";

const options = [{
    category: "문의",
    contents: [{
        name: "문의 작성",
        link: "/myPage/QnA/NewQnA"
        }, { 
        name: "내 문의 보기", 
        link: "/myPage/QnA/MyQnA",
        }, {
        name: "OTP 발급", 
        link: "/myPage/otp", 
        }, {
        name: "사물함 이용 안내",
        link: "/myPage/otp",
    }]
}];

const Mypage = () => {
  const router = useRouter();

  return (
    <View style={Common.container}>
        <StatusButtonGroup />
        {options.map((item) => (
            <View>
                <Text>{item.category}</Text>
                {item.contents.map((subpage) => (
                    <Pressable onPress={() => router.push(subpage.link)}>
                        <Text>{subpage.name}</Text>
                    </Pressable>
                ))}
            </View>
        ))}
    </View>
    );
}

export default Mypage;