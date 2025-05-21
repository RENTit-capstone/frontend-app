import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { ListItemProps, ListContainerProps } from "@/types/types";
import ListItem from "./ListItem";
import { itemList } from "@/styles/components/itemList";
import SearchGroup from "./SearchGroup";
import useUrl from "@/hooks/useUrl";
import { axiosGet } from "@/api";
import { Common } from "@/styles/common";

const ListContainer = (props: ListContainerProps) => {
    const {type} = props;
    const [last, setLast] = useState(false);
    const [page, setPage] = useState(0);
    const [data, setData] = useState([]);
    const [searchOptions, setSearchOptions] = useState({
        keyword: "",
        startDate: "", 
        endDate: "",
        startPrice: "",
        endPrice: "",
    })

    useEffect (() => {
        fetchResult();
    }, [type, searchOptions])

    const fetchResult = async () => {
        const role = (type==="INDIVIDUAL")? "STUDENT" : ["COMPANY", "COUNCIL"];
        const params = useUrl({
            keyword: searchOptions.keyword || "",
            startDate: new Date(searchOptions.startDate).toISOString() || "",
            endDate: new Date(searchOptions.endDate).toISOString() || "",
            minPrice: searchOptions.startPrice || "",
            maxPrice: searchOptions.endPrice || "",
            stauts: ["AVAILABLE", "OUT"],
            ownerRoles: role,
            page: page,
            size: 20,
            sort: ["createdAt", "desc"],
        });
        try {
            const response = await axiosGet(`/api/v1/items?${params}`);
            setPage(response.data.pageable.pageNumber+1);
            setData(response.data.content);
            setLast(response.data.last);
        }
        catch (error) {
            console.error(error);
        }
    }

    const handleChangeOptions = (newOptions: any) => {
        setSearchOptions(prev => ({
            ...prev,
            ...newOptions,
        }));
    };

    return (
        <>
            <SearchGroup onChange={handleChangeOptions}/>
            {data.length>0 ? (
                data.map((item: ListItemProps, index:number) => {
                return (
                <View key={index} style={itemList.listContainer}>
                    <ListItem 
                        itemId={item.itemId}
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
            )})) : (
                <View style={[Common.wrapper, {backgroundColor: "white", alignItems: "center"}]}>
                    <Text>표시할 데이터가 없습니다.</Text>
                </View>
            )
        }
        </>
    )
};

export default ListContainer;
