import { SafeAreaView, View } from "react-native";
import { Common } from "@/styles/common";
import Accordion from "@/components/history/Accordion";

const History = () => {
  return (
    <SafeAreaView style={Common.container}>
        <Accordion />
    </SafeAreaView>
    );
}

export default History;