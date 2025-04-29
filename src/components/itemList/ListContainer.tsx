import { useEffect, useState } from "react";
import { View } from "react-native";
import { ListItemProps, ListContainerProps } from "@/types/types";
import { Common } from "@/styles/common";
import ListItem from "./ListItem";
import { itemList } from "@/styles/components/itemList";

const sampleData: ListItemProps = {id: 0, title: "string", img: "", available: false, price: 50000, period: 7, messages: 2, likes: 3}
const sampleList: ListItemProps[] = [sampleData, sampleData, sampleData];

const ListContainer = (props: ListContainerProps) => {
    const [data, setData] = useState(sampleList);
    const {type} = props;

    useEffect (() => {
        //const data = fetchItemList();
        // setData(data);
        console.log("type: ", `${type}`);
    }, [type])

    return (
        <>
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
                    <View style={[itemList.rowDivider]} />
                </View>
            )})}
        </>
    )
};

export default ListContainer;
