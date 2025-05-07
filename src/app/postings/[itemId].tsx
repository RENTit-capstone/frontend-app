import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native"

const Postings = () => {
    const { itemId } = useLocalSearchParams();
    console.log(itemId);

    return (
        <View>
            <Text>asdf</Text>
            <Text>{itemId}</Text>
        </View>
    )
}

export default Postings;