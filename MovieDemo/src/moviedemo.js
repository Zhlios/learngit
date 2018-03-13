import React,{ Component } from 'react';
import {
    View,
    StyleSheet,
  } from 'react-native';  
import {
    StackNavigator,
    TabNavigator,
  } from 'react-navigation';
import Hotpage from './pages/hot';
import Morepage from './pages/more';
import Moviespage from './pages/movies';
import Recommendpage from './pages/recommend';
import Settingpage from './pages/setting';
import TabBarItem from './components/tabbaritem';
import CityPage from './components/city';
  const MainTab=TabNavigator({
      hot:{
          screen:Hotpage,
          navigationOptions:({navigation}) => ({
            tabBarLabel:'热门',
            tabBarIcon:({focused,tintColor}) => (
                <TabBarItem
                    tintColor={tintColor}
                    focused={focused}
                    normalImage={require('./images/hot.png')}
                    selectedImage={require('./images/hot_select.png')}
                />
          )
          })
      },
      more:{
        screen:Morepage,
        navigationOptions:({navigation}) => ({
          tabBarLabel:'更多',
          tabBarIcon:({focused,tintColor}) => (
            <TabBarItem
                tintColor={tintColor}
                focused={focused}
                normalImage={require('./images/more.png')}
                selectedImage={require('./images/more_select.png')}
            />
         )
        })
    },
    movie:{
        screen:Moviespage,
        tabBarOptions:{
            activeTintColor:'red',
            showLabel:false,
        },
        navigationOptions:({navigation}) => ({
          tabBarLabel:'电影',
          tabBarIcon:({focused,tintColor}) => (
            <TabBarItem
                tintColor={tintColor}
                focused={focused}
                normalImage={require('./images/movie.png')}
                selectedImage={require('./images/movie_select.png')}
            />
        )
        })
    },
    recommend:{
        screen:Recommendpage,
        navigationOptions:({navigation}) => ({
          tabBarLabel:'推荐',
          tabBarIcon:({focused,tintColor}) => (
            <TabBarItem
                tintColor={tintColor}
                focused={focused}
                normalImage={require('./images/recommend.png')}
                selectedImage={require('./images/recommend_select.png')}
            />
      )
        })
    },
    set:{
        screen:Settingpage,
        navigationOptions:({navigation}) => ({
          tabBarLabel:'设置',
          tabBarIcon:({focused,tintColor}) => (
            <TabBarItem
                tintColor={tintColor}
                focused={focused}
                normalImage={require('./images/setting.png')}
                selectedImage={require('./images/setting_select.png')}
            />
      )
        })
    },
  },{
    tabBarPosition:'bottom',
    swipeEnabled:false,
    animationEnabled:false,
    tabBarOptions:{
        activeTintColor:'red',
    }
  })

  const MovieDemo=StackNavigator({
      maintab:{
          screen:MainTab,
      },
      CityPage:{
          screen:CityPage,
      }

  })

 export default MovieDemo;