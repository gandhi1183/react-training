import React, { Component } from "react";

import {
  createStackNavigator,
  createAppContainer,
  createBottomTabNavigator
} from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';

import HomeScreen from './activity/HomeScreen';
import SearchScreen from './activity/SearchScreen';
import DetailScreen from './activity/DetailScreen';

console.disableYellowBox = false;
const RootStack = createBottomTabNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      tabBarLabel: 'Home',
      tabBarIcon: () => <Icon name="home" size={25} style={{color:'gray'}} />,
    },
  },
  Search: {
    screen: SearchScreen,
    navigationOptions: {
      tabBarLabel: 'Search',
      tabBarIcon: () => <Icon name="search" size={25} style={{color:'gray'}} />,
    },
  }
}
);

const StackApp = createStackNavigator({
  App : RootStack,
  DetailBerita: {
    screen: DetailScreen  
  },
})

const App = createAppContainer(StackApp);

export default App;