import { SafeAreaView, View } from 'react-native';
import { Common } from '@/styles/common';
import HistoryTab from '@/components/history/HistoryTab';

const History = () => {
    return (
        <SafeAreaView style={Common.container}>
            <HistoryTab />
        </SafeAreaView>
    );
};

export default History;
