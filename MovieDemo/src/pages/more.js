import React, { Component } from 'react';

import {
    View,
    Stylesheet,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    AsyncStorage,
} from 'react-native';
import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view';
import MovieOneCom from '../components/moreoneComponent';
import { NativeModules } from 'react-native';
var CityLocationManage = NativeModules.CityLocationManage;

var Dimensions = require('Dimensions');
var { width, height } = Dimensions.get('window');
var itemcwidth=width-100;
export default class Morepage extends Component {
    static navigationOptions = {
        title: '更多',
        header: null,
        city:'',
    }
    constructor(props) {
        super(props);
        const { navigate } = this.props.navigation;
        this.state = {
            typeArr: [
                { 'title': '福利', 'type': '福利', 'navigate': navigate },
                { 'title': 'iOS', 'type': 'iOS', 'navigate': navigate },
                { 'title': 'Android', 'type': 'Android', 'navigate': navigate },
                { 'title': '前端', 'type': '前端', 'navigate': navigate },
                { 'title': '休息视频 ', 'type': '休息视频', 'navigate': navigate },
                { 'title': '拓展资源', 'type': '拓展资源', 'navigate': navigate }
            ],
        }
    }
    onPressImageToSearch = () => {

    }
    componentWillMount(){
        this.getcity();
    }
    getcity=async()=>{
        AsyncStorage.getItem('city').then((city)=>{
            if(city){
                this.setState({
                    city:city
                })
            }
        });
        try{
            var city=await CityLocationManage.LocationForMyCity();
            AsyncStorage.setItem('city',city);
            this.setState({
                city:city,
            })
        }catch(error){
            console.log(error);
        }
    }
    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={{ flex: 1 }}>
                <View style={{ height: 20, backgroundColor: 'white' }}></View>
                <View style={{ height: 40, backgroundColor: 'white', flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ color: '#ABABAB', lineHeight: 40, fontSize: 14, marginLeft: 20 }} onPress={()=>{navigate('CityPage',{info:this.state.city})}}>{this.state.city?this.state.city:'北京'}</Text>
                    <Image style={{ width: 20, height: 20, marginLeft: 0 }} source={require('../images/dingweixia.png')} />
                    <TouchableOpacity onPress={() => { this.onPressImageToSearch() }}>
                        <View style={{ height:30, flexDirection: 'row', marginLeft: 10,backgroundColor:'#E5E5E5',borderRadius:4,width:itemcwidth}}>
                            <Image style={{width:25,height:25,marginTop:2.5,marginLeft:5}} source={require('../images/search.png')} />
                            <Text style={{marginLeft:5,color:'#ABABAB',lineHeight:30,fontSize:14}}>电影/电视剧/影人</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <ScrollableTabView
                    renderTabBar={() => <ScrollableTabBar style={{ height: 40 }} />}
                    tabBarActiveTextColor='#4ECBFC'
                    tabBarInactiveTextColor='black'
                    tabBarBackgroundColor='white'
                    tabBarUnderlineStyle={{ backgroundColor: '#4ECBFC', height: 2 }}
                >
                    <MovieOneCom tabLabel={'即将上映'} />
                    <MovieOneCom tabLabel={'正在热映'} />
                </ScrollableTabView>
            </View>
        )
    }
}