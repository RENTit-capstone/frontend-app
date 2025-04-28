import { SafeAreaView, ScrollView } from "react-native";
import { Styles } from "@/styles/styles";
import StatusButtonGroup from "@/components/itemList/StatusButtonGroup";
import ItemListTab from "@/components/itemList/ItemListTab";
import { useEffect } from "react";

const ItemList = () => {
  return (
    <SafeAreaView style={Styles.container}>
        <StatusButtonGroup />
        <ScrollView 
            contentContainerStyle={{ flexGrow: 1 }}  
            style={Styles.wideView}
        >
            <ItemListTab />
        </ScrollView>
    </SafeAreaView>
    );
}

export default ItemList;