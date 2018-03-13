import React,{ Component } from 'react';
import { 
    AppRegistry,
    View,
    StyleSheet,
} from 'react-native';
import {Provider} from 'react-redux';
import Moviedemo from './moviedemo';
// 引入store文件，下步会创建
import configureStore from './store/ConfigureStore';

// 调用 store 文件中的rootReducer常量中保存的方法
const store = configureStore();

if(!__DEV__){
    global.console={
        info:()=>{},
        error:()=>{},
        warn:()=>{},
        log:()=>{},
    }
}
export default class Index extends Component{
    render(){
        return(
            <Provider store={store}>
                <Moviedemo />
            </Provider>
        )
    }
}
AppRegistry.registerComponent('MovieDemo',()=>Index);