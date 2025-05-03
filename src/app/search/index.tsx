import ListContainer from "@/components/itemList/ListContainer";
import { SafeAreaView, Text, View } from "react-native"

const Search = () => {
    return (
        <SafeAreaView>
            <View>
                <Text>search</Text>
                <ListContainer type="search" />
            </View>
        </SafeAreaView>
    );
}

export default Search;