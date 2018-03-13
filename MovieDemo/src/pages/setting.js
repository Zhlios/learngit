import React, { Component } from 'react';
import {
    View,
    Stylesheet,
    Text,
    SectionList,
} from 'react-native';
import SettingComponent from './settingComponent';
import settings from './settingdata';
export default class Settingpage extends Component {
    static navigationOptions={
        title:'设置',
    }
    _separator=()=>{
        return <View style={{height:1,backgroundColor:'#e4e3eb'}}></View>
    }
    render(){
        return(
            <View style={{flex:1}}> 
                <SectionList
                    ItemSeparatorComponent={this._separator}
                    removeClippedSubviews={false}
                    renderSectionHeader={({section}) => {
                        return(
                            <View style={{height:10}}>
                            </View>
                        )
                    }}
                    renderItem={({item})=>{
                        return(
                             <SettingComponent datasource={item}/>
                        )
                    }}
                    sections={[
                        {data:settings.first,key:'first'},
                        {data:settings.second,key:'second'},
                        {data:settings.third,key:'third'},
                        {data:settings.four,key:'four'}
                    ]   
                    }
                />
            </View>
        )
    }
}

