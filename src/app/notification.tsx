import { axiosGet, axiosPut } from '@/api';
import { Common } from '@/styles/common';
import { itemList } from '@/styles/components/itemList';
import { useEffect, useState } from 'react';
import { Alert, Pressable, ScrollView, Text, View } from 'react-native';

type NotificationType = {
    id: number;
    type: string;
    title: string;
    body: string;
    read: boolean;
    createdAt: string;
};

const Notification = () => {
    const [data, setData] = useState<NotificationType[]>();
    const fetchNotification = async () => {
        try {
            const response = await axiosGet(`/api/v1/notifications`);
            console.log(response.data.content);
            setData(response.data.content);
        } catch (error) {
            console.error(error);
            Alert.alert(`${error}`);
        }
    };

    const readNotification = async (id: number) => {
        try {
            const response = await axiosPut(`/api/v1/notifications/${id}/read`);
            console.log(response.data);
        } catch (error) {
            console.error(error);
            Alert.alert(`${error}`);
        }
    };

    useEffect(() => {
        fetchNotification();
    }, []);

    if (!data) return;

    return (
        <ScrollView style={[Common.container, Common.wrapper]}>
            {data.map((item) => (
                <>
                    <Pressable onPress={() => readNotification(item.id)}>
                        <Text style={Common.bold}>{item.title}</Text>
                        <Text>{item.body}</Text>
                    </Pressable>
                    <View style={itemList.rowDivider} />
                </>
            ))}
        </ScrollView>
    );
};
export default Notification;
