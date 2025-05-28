import ItemHeader from '@/components/header/ItemHeader';
import { Colors } from '@/styles/tokens';
import { Stack } from 'expo-router';

const ItemLayout = () => {
    return (
        <>
            <Stack.Screen options={{ headerShown: false }} />
            <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen
                    name="[id]"
                    options={{
                        title: 'item',
                        headerShown: true,
                        header: () => <ItemHeader name="[id]" />,
                        headerTransparent: true,
                    }}
                />
                <Stack.Screen
                    name="new"
                    options={{
                        title: '물품 등록',
                        headerShown: true,
                        header: () => <ItemHeader name="new" />,
                    }}
                />
            </Stack>
        </>
    );
};
export default ItemLayout;
