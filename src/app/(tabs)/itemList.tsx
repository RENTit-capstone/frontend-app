import { Text, View } from 'react-native';
import { Common } from '@/styles/common';
import StatusButtonGroup from '@/components/itemList/StatusButtonGroup';
import ItemListTab from '@/components/itemList/ItemListTab';
import Button from '@/components/Button';
import { useRouter } from 'expo-router';
import Plus from '@/assets/images/plus.svg';
import useFirebaseNotification from '@/hooks/useFirebaseNotification';

const ItemList = () => {
    const router = useRouter();
    useFirebaseNotification();

    return (
        <View style={Common.container}>
            <StatusButtonGroup />
            <Button
                type="primary"
                onPress={() => router.navigate('/items/new')}
                style={Common.floatingButton}
            >
                <View style={[Common.XStack, { alignItems: 'center', gap: 4 }]}>
                    <Plus />
                    <Text style={{ color: 'white', fontSize: 16 }}>글쓰기</Text>
                </View>
            </Button>
            <ItemListTab />
        </View>
    );
};

export default ItemList;
