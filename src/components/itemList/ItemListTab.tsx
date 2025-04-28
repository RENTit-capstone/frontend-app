import { useState } from 'react';
import { SafeAreaView, View, useWindowDimensions } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import ListView from './ListVIew';

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
      />
    </SafeAreaView>
  );
}

export default ItemListTab;