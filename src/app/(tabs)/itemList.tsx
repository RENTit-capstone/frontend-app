import { SafeAreaView, ScrollView } from "react-native";
import Logo from "@/assets/images/logo.svg";
import { Styles } from "@/styles/styles";
import ListView from "@/components/itemList/ListVIew";
import StatusButtonGroup from "@/components/itemList/StatusButtonGroup";
import ItemListTab from "@/components/itemList/ItemListTab";


export default function TabTwoScreen() {
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
