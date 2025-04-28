import { useState } from 'react';
import { SafeAreaView, useWindowDimensions } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import ListContainer from './ListContainer';
import { itemList } from '@/styles/components/itemList';

const ItemListTab = () => {

  const IndividualRoute = () => (
    <ListContainer type={"individual"}/>
  );
  
  const GroupRoute = () => (
    <ListContainer type={"group"}/>
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
    <SafeAreaView>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        renderTabBar={props => (
          <TabBar
            {...props}
            indicatorStyle={itemList.topTabIndicator}
            style={[itemList.topTab]}
            activeColor="#455464"
            inactiveColor="#767676"
          />
        )}
      />
    </SafeAreaView>
  );
}

export default ItemListTab;