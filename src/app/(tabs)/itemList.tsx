import { SafeAreaView } from "react-native";
import { Common } from "@/styles/common";
import StatusButtonGroup from "@/components/itemList/StatusButtonGroup";
import ItemListTab from "@/components/itemList/ItemListTab";

const ItemList = () => {
  return (
    <SafeAreaView style={Common.container}>
        <StatusButtonGroup />
        <ItemListTab />
    </SafeAreaView>
    );
}

export default ItemList;