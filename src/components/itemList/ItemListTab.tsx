import { useState } from 'react';
import { ScrollView, useWindowDimensions, View } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import ListContainer from './ListContainer';
import { itemList } from '@/styles/components/itemList';
import { Common } from '@/styles/common';

const ItemListTab = () => {
    const IndividualRoute = () => (
        <View style={Common.container}>
            <ListContainer type={'INDIVIDUAL'} />
        </View>
    );

    const GroupRoute = () => (
        <View style={Common.container}>
            <ListContainer type={'GROUP'} />
        </View>
    );

    const renderScene = SceneMap({
        individual: IndividualRoute,
        group: GroupRoute,
    });

    const layout = useWindowDimensions();

    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'individual', title: '개인' },
        { key: 'group', title: '단체' },
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

export default ItemListTab;
