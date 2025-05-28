import { Stack } from 'expo-router';

const ItemLayout = () => {
    return (
        <>
            <Stack.Screen options={{ headerShown: true }} />
            <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen
                    name="[id]"
                    options={{
                        title: 'item',
                    }}
                />
                <Stack.Screen
                    name="new"
                    options={{
                        title: '물품 등록',
                    }}
                />
            </Stack>
        </>
    );
};
export default ItemLayout;
