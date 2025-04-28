import { SafeAreaView, ScrollView } from "react-native";
import { Common } from "@/styles/common";
import StatusButtonGroup from "@/components/itemList/StatusButtonGroup";
import ItemListTab from "@/components/itemList/ItemListTab";
import { useEffect } from "react";

const ItemList = () => {
  return (
    <SafeAreaView style={Common.container}>
        <StatusButtonGroup />
        <ScrollView 
            contentContainerStyle={{ flexGrow: 1 }}  
            style={Common.wideView}
        >
            <ItemListTab />
        </ScrollView>
    </SafeAreaView>
    );
}

export default ItemList;