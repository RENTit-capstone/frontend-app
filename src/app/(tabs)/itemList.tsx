import { SafeAreaView, ScrollView, View } from "react-native";
import { Common } from "@/styles/common";
import StatusButtonGroup from "@/components/itemList/StatusButtonGroup";
import ItemListTab from "@/components/itemList/ItemListTab";
import { useEffect } from "react";
import { itemList } from "@/styles/components/itemList";

const ItemList = () => {
  return (
    <SafeAreaView style={Common.container}>
        <StatusButtonGroup />
        <ItemListTab />
    </SafeAreaView>
    );
}

export default ItemList;