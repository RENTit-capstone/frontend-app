import { useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect } from "react";
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

