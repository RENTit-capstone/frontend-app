import { Text, View, Image } from "react-native";
import { TextInputProps } from "@/types/types";
import { Styles } from "@/styles/styles";
import { TextThemes } from "@/styles/theme";
import ListItem from "./ListItem";

const ListView = () => {
    // props: ListItemProps
    // const {} = props;

    return (
        <View style={Styles.listView}>
            <ListItem />
            <ListItem />
            <ListItem />
        </View>
    )
};

export default ListView;
