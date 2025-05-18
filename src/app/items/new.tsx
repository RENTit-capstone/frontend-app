import TextInput from "@/components/TextInput";
import { Common } from "@/styles/common";
import { View, Text } from "react-native";

const NewPosting = () => {
    return (
        <View style={Common.container}>
            <TextInput label="제목" name="title" handleChangeText={} value=""/>
        </View>
    )
}
export default NewPosting;