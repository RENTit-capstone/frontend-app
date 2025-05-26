import { Text, View } from "react-native";
import { Common } from "@/styles/common";
import StatusButtonGroup from "@/components/itemList/StatusButtonGroup";
import { useRouter } from "expo-router";

const Mypage = () => {
  const router = useRouter();

  return (
    <View style={Common.container}>
        <StatusButtonGroup />
    </View>
    );
}

export default Mypage;