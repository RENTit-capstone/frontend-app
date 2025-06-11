import { useState } from 'react';
import { ScrollView, useWindowDimensions, View } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { itemList } from '@/styles/components/itemList';
import { Common } from '@/styles/common';
import AccordionCardContainer from './AccordionCardContainer';

const HistoryTab = () => {
    const othersRoute = () => (
        <View style={[Common.container, { backgroundColor: 'white' }]}>
            <AccordionCardContainer type={'OTHERS'} />
        </View>
    );

    const myRoute = () => (
        <View style={[Common.container, { backgroundColor: 'white' }]}>
            <AccordionCardContainer type={'MINE'} />
        </View>
    );

    const renderScene = SceneMap({
        others: othersRoute,
        mine: myRoute,
    });

    const layout = useWindowDimensions();

    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'others', title: '빌린 이력' },
        { key: 'mine', title: '빌려준 이력' },
    ]);
    return (
        <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{ width: layout.width }}
            renderTabBar={(props) => (
                <TabBar
                    {...props}
                    indicatorStyle={itemList.topTabIndicator}
                    style={[itemList.topTab]}
                    activeColor="#455464"
                    inactiveColor="#767676"
                />
            )}
        />
    );
};

export default HistoryTab;
