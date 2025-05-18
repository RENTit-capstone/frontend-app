import { SafeAreaView } from "react-native";
import { Common } from "@/styles/common";
import StatusButtonGroup from "@/components/itemList/StatusButtonGroup";
import ItemListTab from "@/components/itemList/ItemListTab";
import Button from "@/components/Button";
import { useRouter } from "expo-router";

const ItemList = () => {
  const router = useRouter();

  return (
    <SafeAreaView style={Common.container}>
        <StatusButtonGroup />
        <Button type="primary" onPress={() => router.navigate("/items/new")} style={Common.floatingButton}>
          글쓰기
        </Button>
        <ItemListTab />
    </SafeAreaView>
    );
}

export default ItemList;