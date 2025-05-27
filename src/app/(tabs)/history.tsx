import { SafeAreaView, View } from "react-native";
import { Common } from "@/styles/common";
import AccordionCardContainer from "@/components/history/AccordionCardContainer";
import HistoryTab from "@/components/history/HistoryTab";

const History = () => {
  return (
    <SafeAreaView style={Common.container}>
      <HistoryTab />
    </SafeAreaView>
    );
}

export default History;