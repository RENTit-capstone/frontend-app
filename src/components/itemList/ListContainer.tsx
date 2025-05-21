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
        console.log(searchOptions);
        fetchResult();
    }, [type, searchOptions])

    const fetchResult = async () => {
        const role = (type==="INDIVIDUAL")? "STUDENT" : ["COMPANY", "COUNCIL"];
        const params = useUrl({
            keyword: searchOptions.keyword || "",
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
            console.log(params)
            const response = await axiosGet(`/api/v1/items?${params}`);
            console.log(response);
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
