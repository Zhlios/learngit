import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    Text,
    Image,
    TouchableOpacity,
} from 'react-native';
import Stars from './stars';
const Dimensions = require('Dimensions');
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const itemEdge = 10;
const itemWidth = (screenWidth - 4 * itemEdge) / 3.0;
const imageHeight = itemWidth * 1.43;
export default class MovieItem extends Component {

    getStars = (count, grade) => {
        let total = 5;
        let full, half, empty;
        full = parseInt(count[0]);
        if (count[1] === '0') {
            half = 0;
            empty = total - full;
        } else {
            half = 1;
            empty = total - full - half;
        }
        const result = [];
        let calculate=0;
        for (let i = 0; i < full; i++) {
            calculate=calculate+1;
            result.push(<Image key={calculate} style={styles.stars} source={require('../images/star-full.png')} />);
        }
        if(half==1){
            calculate=calculate+1;
        }
        result.push(half == 1 && <Image key={calculate} style={styles.stars} source={require('../images/star-half.png')} />);
        for (let i = 0; i < empty; i++) {
            calculate=calculate+1;
            result.push(<Image key={calculate} style={styles.stars} source={require('../images/star-empty.png')} />)
        }
        return (
            <View style={styles.starsBody}>
                {result}
                <Text>{grade}</Text>
            </View>
        );
    }
    render() {
        const { datasource } = this.props;
        return (
            <View style={styles.container}>
                <TouchableOpacity >
                    <Image style={styles.headImg} source={{ uri: datasource.images.medium }} />
                    <Text style={styles.title} numberOfLines={1}>{datasource.title}</Text>
                    {this.getStars(datasource.rating.stars, datasource.rating.average)}
                </TouchableOpacity>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        width: itemWidth,
        marginRight: itemEdge,
    },
    headImg: {
        width: itemWidth,
        height: imageHeight,
    },
    title: {
        marginTop: 5,
        marginBottom: 5,
        width: itemWidth,
        height: 30,
        fontSize: 16,
        textAlign: 'center',
        lineHeight: 30,
    },
    stars: {
        width: 12,
        height: 12,
    },
    starstitle: {
        lineHeight: 12,
        height: 12,
    },
    starsBody: {
        flex: 1,
        flexDirection: 'row',
        marginBottom:  10,
        width: itemWidth,
        justifyContent: 'center',
        alignItems: 'center',
    }


})