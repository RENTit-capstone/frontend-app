import { Stack } from "expo-router"

const ItemLayout = () => {
    return (
    <>
    <Stack.Screen options={{headerShown: false}} />
        <Stack
            screenOptions={{headerShown: true}}>
        <Stack.Screen
            name="[id]"
            options={{
                title: "item"
            }}
        />
    </Stack>
    </>
    );
}
export default ItemLayout;