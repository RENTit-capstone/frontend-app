import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native"

const Postings = () => {
    const { id } = useLocalSearchParams();
    console.log(id);

    return (
        <View>
            <Text>asdf</Text>
            <Text>{id}</Text>
        </View>
    )
}

export default Postings;