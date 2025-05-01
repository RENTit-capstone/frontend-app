import { SafeAreaView, View } from "react-native";
import { Common } from "@/styles/common";
import AccordionCardContainer from "@/components/history/AccordionCardContainer";

const History = () => {
  return (
    <SafeAreaView style={Common.container}>
        <AccordionCardContainer />
    </SafeAreaView>
    );
}

export default History;