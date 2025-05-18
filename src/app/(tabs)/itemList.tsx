import { SafeAreaView, Text, View } from "react-native";
import { Common } from "@/styles/common";
import StatusButtonGroup from "@/components/itemList/StatusButtonGroup";
import ItemListTab from "@/components/itemList/ItemListTab";
import Button from "@/components/Button";
import { useRouter } from "expo-router";
import Plus from "@/assets/images/plus.svg";

const ItemList = () => {
  const router = useRouter();

  return (
    <SafeAreaView style={Common.container}>
        <StatusButtonGroup />
        <Button type="primary" onPress={() => router.navigate("/items/new")} style={Common.floatingButton}>
          <View style={Common.XStack}>
            <Plus /> <Text>글쓰기</Text>
          </View>
        </Button>
        <ItemListTab />
    </SafeAreaView>
    );
}

export default ItemList;