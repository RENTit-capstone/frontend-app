import { useState } from 'react';
import { ScrollView, useWindowDimensions, View } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { itemList } from '@/styles/components/itemList';
import { Common } from '@/styles/common';
import AccordionCardContainer from './AccordionCardContainer';

const HistoryTab = () => {

  const othersRoute = () => (
    <ScrollView style={Common.container}>
      <AccordionCardContainer type={"OTHERS"}/>
    </ScrollView>
    
  );
  
  const myRoute = () => (
    <ScrollView style={Common.container}>
      <AccordionCardContainer type={"MINE"}/>
    </ScrollView>
  );
  
  const renderScene = SceneMap({
    others: othersRoute,
    mine: myRoute,
  });

  const layout = useWindowDimensions();

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'others', title: '나의 대여' },
    { key: 'mine', title: '나의 물품' },
  ]);
  return (
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
  );
}

export default HistoryTab;