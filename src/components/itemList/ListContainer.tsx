import { useEffect, useState } from "react";
import { View } from "react-native";
import { ListItemProps, ListContainerProps } from "@/types/types";
import { Common } from "@/styles/common";
import ListItem from "./ListItem";
import { itemList } from "@/styles/components/itemList";
import SearchGroup from "./SearchGroup";
import useUrl from "@/hooks/useUrl";
import { axiosGet } from "@/api";

const sampleData: ListItemProps = {id: 0, title: "string", img: "", available: false, price: 50000, period: 7, messages: 2, likes: 3}
const sampleList: ListItemProps[] = [sampleData, sampleData, sampleData];

const ListContainer = (props: ListContainerProps) => {
    const [data, setData] = useState(sampleList);
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
        const role = (type==="INDIVIDUAL")? ["STUDENT"] : ["COMPANY", "COUNCIL"];
        const params = useUrl({
            keyword: null,
            startDate: searchOptions.startDate,
            endDate: searchOptions.endDate,
            minPrice: searchOptions.startPrice,
            maxPrice: searchOptions.endPrice,
            stauts: ["AVAILABLE", "OUT"],
            ownerRoles: role,
            page: 0,
            size: 20,
            sort: ["createdAt", "desc"],
        });
        try {
            const response = await axiosGet(`/api/v1/items?${params}`);
            console.log("Response for fetchResult: ", response.data);
            setData(response.data);
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
                        title={item.title}
                        img={item.img}
                        available={item.available}
                        price={item.price}
                        period={item.period}
                        messages={item.messages}
                        likes={item.likes}
                    />
                    <View style={[itemList.rowDivider, {marginTop: 10}]} />
                </View>
            )})}
        </>
    )
};

export default ListContainer;
