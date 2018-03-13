import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
} from 'react-native';

var Dimensions = require('Dimensions');
var { width, height } = Dimensions.get('window');
var itemWd = (width - 4 * 15 - 20) / 3.0;
var itemHg = 40;

export default class CityItem extends Component {
  
    state={
        text:this.props.data.split("|")[1],
    }
    textOnpress=()=>{
        
    }

    render() {
        return(
            <View style={{ marginTop: 15, marginLeft: 15, width: itemWd, height: itemHg, backgroundColor: 'white', alignItems: 'center' }}>
                <Text
                    onPress={(event) => {
                        this.textOnpress()
                    }}
                    style={{ lineHeight: itemHg, fontSize: 14, textAlign: 'center', width: itemWd }}>{this.state.text}</Text>
            </View>
        )
    }
}
