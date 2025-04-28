import { Text, View, Image } from "react-native";
import { TextInputProps } from "@/types/types";
import { Styles } from "@/styles/styles";
import { TextThemes } from "@/styles/theme";
import ListItem from "./ListItem";

const ListView = () => {
    // props: ListItemProps
    // const {} = props;
    const exampleArray = [1, 1, 1];

    return (
        <View style={Styles.listView}>
            {exampleArray.map((item, index) => {
                return (
                <>
                    <ListItem />
                    <View style={[Styles.divider, Styles.rowDivider]} />
                </>
            )})}
        </View>
    )
};

export default ListView;
