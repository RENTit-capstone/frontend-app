import ItemListTab from "@/components/itemList/ItemListTab";
import TextInput from "@/components/TextInput";
import { useState } from "react";
import { Pressable, SafeAreaView, Text, View } from "react-native"
import SearchIcon from "@/assets/images/search.svg";
import { Common } from "@/styles/common";

const Search = () => {
    const [keyword, setKeyword] = useState("");

    const submitKeyword = () => {
        console.log(keyword);
    }

    return (
        <SafeAreaView style={Common.container}>
            <View style={Common.wrapper}>
                <TextInput 
                    label=""
                    name="keyword"
                    handleChangeText={setKeyword}
                    placeholder="검색어를 입력해주세요"
                    value={keyword}
                    style={{paddingRight: 42}}
                />
                <Pressable style={Common.floatingIcon} onPress={submitKeyword}>
                    <SearchIcon />
                </Pressable>

                <ItemListTab />
            </View>
        </SafeAreaView>
    );
}

export default Search;