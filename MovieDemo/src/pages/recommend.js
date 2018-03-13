import React,{Component} from 'react';
import{
    View,
    Stylesheet,
    Text,
} from 'react-native';
import { connect } from 'react-redux';
import {getUserName  } from '../store/storeaction';
import { NativeModules } from 'react-native';
var CityLocationManage = NativeModules.CityLocationManage;
class Recommendpage  extends  Component{
    state={
        text:'未改变前的数据',
        city:'定位失败',
    }
    async componentDidMount(){
        try{
            var city=await CityLocationManage.LocationForMyCity();
            this.setState({
                city:city,
            })
        }catch(error){
            console.log(error);
        }
    }
    render(){
        return(
            <View>
                <Text>{this.props.ShiTuReducer.UserName}</Text>
                <Text>{this.state.city}</Text>
           </View>
        )
    }
}
export default connect((state) => {
    const { ShiTuReducer } = state;
    return {
        ShiTuReducer,   
    };
},{ getUserName })(Recommendpage)