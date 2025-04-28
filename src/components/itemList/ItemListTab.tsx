import { useState } from 'react';
import { SafeAreaView, useWindowDimensions } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import ListView from './ListVIew';
import { Styles } from '@/styles/styles';

const IndividualRoute = () => (
  <ListView />
);

const GroupRoute = () => (
  <ListView />
);

const renderScene = SceneMap({
  individual: IndividualRoute,
  group: GroupRoute,
});

const ItemListTab = () => {
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
            indicatorStyle={Styles.topTabIndicator}
            style={[Styles.topTab]}
            activeColor="#455464"
            inactiveColor="#767676"
          />
        )}
      />
    </SafeAreaView>
  );
}

export default ItemListTab;