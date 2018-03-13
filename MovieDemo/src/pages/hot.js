import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
} from 'react-native';
import {
    StackNavigator,
  } from 'react-navigation';
import movies from './localmovies.json'
import MovieItem from '../components/movieitem';
const  hotPush='https://api.douban.com/v2/movie/in_theaters';
export default class Hotpage extends Component {
    static navigationOptions={
        title:'热映',
    }
    state={
        dataSource:'',
        city:'北京',
    }
    componentWillMount(){
        fetch(`${hotPush}?city=${this.state.city}`)
        .then(response=>response.json())
        .then(data=>{
            this.setState({
                dataSource:data,
            })
        })
        .catch(error=>{
           // console.error();
        })
        // this.setState({
        //     dataSource:movies,
        // })
    }
    render() {
        return (
            <View style={styles.container}>
                <FlatList style={styles.flat}
                    data={this.state.dataSource.subjects}
                    numColumns={3}
                    removeClippedSubviews={false}
                    renderItem={({item,index})=>{
                        return(
                            <MovieItem datasource={item} key={item.id}/>
                        )
                    }}
                />
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    flat:{
        paddingHorizontal:10,
    }
})