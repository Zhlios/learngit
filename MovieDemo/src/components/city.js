import React, { Component } from 'react';
import {
    View,
    Text,
    SectionList,
    FlatList,
    Alert,
} from 'react-native';
import { hotCity, letter, cityList } from './citydata';
import CityItem from  './cityItem';
var Dimensions = require('Dimensions');
var { width, height } = Dimensions.get('window');
var itemWd = (width - 4 * 15 - 20) / 3.0;
var itemHg = 40;
export default class CityView extends Component {
    static navigationOptions={
        title:'国内',
        localcity:'',
    }
    state = {
        presentCity: '',
        sectionarr: [],
        datasource:'',
    }
    creatItem = (item, index) => {
        const itemarr = [];
        item.map((item, index) => {
            itemarr.push(
                <CityItem data={item} key={index}/>
             
            )
        })
        return (
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', paddingBottom: 15 }}>
                {itemarr}
            </View>

        )
    }
    componentWillMount(){
        this.getSection();
    }
    getSection = () => {
        arr = [],
        { params } = this.props.navigation.state  
        arr.push({ data: [[`shenzhen|${params.info}||`]], title: '当前城市', key: 'dq' });
        arr.push({ data: [hotCity], title: '热门城市', key: 'rm' });
        cityArr = [];
        letter.map((item, index) => {
            json = {
                data: [cityList[item]],
                title: item,
                key: item,
            }
            cityArr.push(json);
        });
        this.setState({
            datasource:arr.concat(cityArr),
        })
    }
    textOnpress=(params,event)=>{
    console.log(params);
    console.log(event);
 
    }
    render() {
        return (
            <View style={{ flex: 1, flexDirection: 'row' }}>
                <SectionList
                    removeClippedSubviews={false}
                    keyExtractor={(item, index) => item}
                    renderSectionHeader={({ section }) => {
                        return (
                            <View style={{ height: 30, backgroundColor: '#E4E3EB' }}>
                                <Text style={{ marginLeft:15,lineHeight: 30 }}>{section.title}</Text>
                            </View>
                        )
                    }}
                    renderItem={({ item, index }) => {
                        return (
                            this.creatItem(item, index)
                        )
                    }}
                    sections={
                        this.state.datasource
                    }
                />
                <View style={{ width: 20,paddingVertical:100 }}>
                    <FlatList
                        style={{ width: 20,height:300}}
                        data={letter}
                        renderItem={({ item, index }) => {
                            return (
                                <View key={index} style={{ alignItems: 'center' }}>
                                    <Text>{item}</Text>
                                </View>
                            )
                        }}
                    />
                </View>
            </View>
        )
    }
}