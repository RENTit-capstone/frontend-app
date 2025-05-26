import { Text, View } from "react-native";
import { Common } from "@/styles/common";
import StatusButtonGroup from "@/components/itemList/StatusButtonGroup";
import { useRouter } from "expo-router";

const options = ["문의 작성", "내 문의 보기", "OTP 발급", "사물함 이용 안내"]

const Mypage = () => {
  const router = useRouter();

  return (
    <View style={Common.container}>
        <StatusButtonGroup />
        {options.map((item) => (
            <View>
                <Text>{item}</Text>
            </View>
        ))}
    </View>
    );
}

export default Mypage;