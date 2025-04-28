import { useEffect, useState } from "react";
import { View } from "react-native";
import { ListItemProps, ListViewProps } from "@/types/types";
import { Styles } from "@/styles/styles";
import ListItem from "./ListItem";
import fetchItemList from "@/api/itemList";

const ListView = (props: ListViewProps) => {
    const [data, setData] = useState([]);
    const {type} = props;
    
    useEffect (() => {
        const data = fetchItemList();
        // setData(data);
    }, [type])

    return (
        <View style={Styles.listView}>
            {data.map((item: ListItemProps) => {
                return (
                <>
                    <ListItem 
                        id={item.id}
                        title={item.title || "string"}
                        img={item.img}
                        available={item.available || false}
                        price={item.price || 50000}
                        period={item.period || 7}
                        messages={item.messages || 2}
                        likes={item.likes || 3}
                    />
                    <View style={[Styles.divider, Styles.rowDivider]} />
                </>
            )})}
        </View>
    )
};

export default ListView;
