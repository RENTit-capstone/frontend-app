import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { ListItemProps, ListContainerProps } from "@/types/types";
import { Common } from "@/styles/common";
import ListItem from "./ListItem";
import { itemList } from "@/styles/components/itemList";
import SearchGroup from "./SearchGroup";
import useUrl from "@/hooks/useUrl";
import { axiosGet } from "@/api";

const ListContainer = (props: ListContainerProps) => {
    const [data, setData] = useState([]);
    const [searchOptions, setSearchOptions] = useState({
        startDate: "", 
        endDate: "",
        startPrice: "",
        endPrice: "",
    })
    const {type} = props;

    useEffect (() => {
        fetchResult();
    }, [type, searchOptions])

    const fetchResult = async () => {
        const today = new Date();
        const role = (type==="INDIVIDUAL")? "STUDENT" : ["COMPANY", "COUNCIL"];
        const params = useUrl({
            keyword: "",
            startDate: searchOptions.startDate || "",
            endDate: searchOptions.endDate || "",
            minPrice: searchOptions.startPrice || "",
            maxPrice: searchOptions.endPrice || "",
            stauts: ["AVAILABLE", "OUT"],
            ownerRoles: role,
            page: 0,
            size: 20,
            sort: ["createdAt", "desc"],
        });
        try {
            const response = await axiosGet(`/api/v1/items?${params}`);
            setData(response.data.content);
        }
        catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <SearchGroup onChange={setSearchOptions}/>
            {data.map((item: ListItemProps, index:number) => {
                return (
                <View key={index} style={itemList.listContainer}>
                    <ListItem 
                        id={item.id}
                        nickname={item.nickname}
                        name={item.name}
                        imgUrls={item.imgUrls}
                        price={item.price}
                        status={item.status}
                        startDate={item.startDate}
                        endDate={item.endDate}
                    />
                    <View style={[itemList.rowDivider, {marginTop: 10}]} />
                </View>
            )})}
        </>
    )
};

export default ListContainer;
