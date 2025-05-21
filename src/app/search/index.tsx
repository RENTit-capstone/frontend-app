import ItemListTab from "@/components/itemList/ItemListTab";
import TextInput from "@/components/TextInput";
import { useState } from "react";
import { Pressable, SafeAreaView } from "react-native"
import SearchIcon from "@/assets/images/search.svg";
import { Common } from "@/styles/common";
import { axiosGet } from "@/api";
import useUrl from "@/hooks/useUrl";
import { ListItemProps } from "@/types/types";

const Search = () => {
    const [searchResult, setSearchResult] = useState<ListItemProps>();
    const [keyword, setKeyword] = useState("");

    const fetchResult = async () => {
        const today = new Date();
        const params = useUrl({
            keyword: keyword,
            startDate: today.toISOString(),    //임의값
            endDate: today.toISOString(),
            minPrice: 0,
            maxPrice: 100000,                  //임의값
            stauts: ["AVAILABLE", "OUT"],
            ownerRoles: ["STUDENT", "COMPANY", "COUNCIL"],
            page: 0,
            size: 20,
            sort: ["createdAt", "desc"],
        });
        try {
            const response = await axiosGet(`/api/v1/items?${params}`);
            console.log("Response for fetchResult: ", response.data);
            setSearchResult(response.data);
        }
        catch (error) {
            console.error(error);
        }
    }

    return (
        <SafeAreaView style={[Common.container, Common.wrapper]}>
            <TextInput 
                label=""
                name="keyword"
                handleChangeText={setKeyword}
                placeholder="검색어를 입력해주세요"
                value={keyword}
                style={{paddingRight: 42, marginHorizontal: 20, marginTop: 15,}}
            />
            <Pressable style={Common.floatingIcon} onPress={fetchResult}>
                <SearchIcon />
            </Pressable>

            {searchResult && <ItemListTab/>}
        </SafeAreaView>
    );
}

export default Search;