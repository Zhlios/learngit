import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, FlatList,Button} from 'react-native';
import UMshare from '../umshare/ShareUtil'
const detailapi = 'https://api.douban.com/v2/movie/subject';
var Dimensions = require('Dimensions');
var { width, height } = Dimensions.get('window');

export default class MovieDetail extends Component {
    static navigationOptions =({navigation, screenProps})=>({
        title: '电影',
        headerRight: (
            <Button
              title='分享'
              onPress={() => navigation.state.params.clickShare()}
            />
          )
    })
    state = {
        id: this.props.navigation.state.params.id,
        dtjson: {},
        isLoading: false,
        result:'',
    }
    clickShare=()=>{
        //console.log('haaa');
        UMshare.shareboard(this.state.dtjson.summary,this.state.dtjson.images.small,this.state.dtjson.share_url,this.state.dtjson.title,[0,1,2,3],(code,message) =>{
            this.setState({result:message});
            console.log(code);
        });
        
    }
    componentWillMount() {
        this.getDetailData().then(response => {
            console.log(response);
            this.setState({
                dtjson: response,
                isLoading: true,
            })
        });
    }
    componentDidMount() {
        const {setParams} = this.props.navigation
        setParams({clickShare: () => this.clickShare()})
    }
    getDetailData = () => {
        return fetch(`${detailapi}/${this.state.id}`)
            .then(response => response.json())
            .then(response => {
                return response;
            })
            .catch(error => {
                console.log(error);
            })
    }
    getPingjie = () => {
        var str = this.state.dtjson.year;
        this.state.dtjson.countries.map((item, index) => {
            str = str + '/' + item;
        });
        this.state.dtjson.genres.map((item, index) => {
            str = str + '/' + item;
        });
        return str;
    }
    getStars = (count) => {
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
            result.push(<Image key={calculate} style={{width:10,height:10}} source={require('../images/star-full.png')} />);
        }
        if(half==1){
            calculate=calculate+1;
        }
        result.push(half == 1 && <Image key={calculate} style={{width:10,height:10}} source={require('../images/star-half.png')} />);
        for (let i = 0; i < empty; i++) {
            calculate=calculate+1;
            result.push(<Image key={calculate} style={{width:10,height:10}} source={require('../images/star-empty.png')} />)
        }
        return (
            <View style={{flexDirection:'row',}}>
                {result}
            </View>
        );
    }

    listHeadComponent=()=>{
        console.log('ahahha');
        return (
            <View style={{width:20,height:100}}> 
            </View>
        )
    }
    getFlatListData=()=>{
        var arr=[];
         arr=this.state.dtjson.directors.concat(this.state.dtjson.casts);
        return arr;
    }
    render() {
        return (
            <View style={styles.contaner}>
                {this.state.isLoading ?
                    <ScrollView style={{backgroundColor:'#F4F4F4' }}>
                        <View style={{ backgroundColor: '#607B8B', paddingVertical: 30 }}>
                            <Image source={{ uri: this.state.dtjson.images.small }} style={styles.postImg} />
                        </View>
                        <View style={styles.desview}>
                            <View style={{width:width-120}}>
                                <Text style={{ fontWeight: 'bold', fontSize: 20, marginTop: 15, marginLeft: 15 }}>{this.state.dtjson.title}</Text>
                                <Text style={{ fontSize: 11, marginTop: 5, marginLeft: 15, color: '#ABABAB' }}>{this.getPingjie()}</Text>
                                <Text style={{ fontSize: 11, marginTop:1, marginLeft: 15, color: '#ABABAB' }}>{'原名:' + this.state.dtjson.original_title}</Text>
                                <Text style={{ fontSize: 11, marginTop:1, marginLeft: 15, color: '#ABABAB' }}>{'上映时间:2018-03-09(中国大陆)'}</Text>
                                <Text style={{ fontSize: 11, marginTop:1, marginLeft: 15, color: '#ABABAB' }}>{'片长：134 分钟/ 135 分钟(中国大陆)'}</Text>
                            </View>
                            <View style={{ marginTop:10,width:120,justifyContent:'center',alignItems:'center'}}>
                                <View style={{height:80,width:80,alignItems:'center',backgroundColor:'white'}}>
                                    <Text style={{fontSize:10,color:'#ABABAB',marginTop:3}} >豆瓣评分</Text>
                                    <Text style={{fontSize:10,fontWeight:'bold',fontSize:16,marginTop:3,marginBottom:3}}>{this.state.dtjson.rating.average}</Text>
                                    {
                                        this.getStars(this.state.dtjson.rating.stars)
                                    }
                                    <Text style={{fontSize:10,color:'#ABABAB',marginTop:3}}>{this.state.dtjson.wish_count+'万人'}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{flexDirection:'row', height:60,alignItems:'center',justifyContent:'space-around'}}>
                            <Text style={{color:'#FFA500',lineHeight:30,height:30,borderColor:'#FFA500',borderWidth:1,width:80,textAlign:'center'}}>想看</Text>
                            <Text style={{color:'#FFA500',lineHeight:30,height:30,borderColor:'#FFA500',borderWidth:1,width:80,textAlign:'center'}}>看过</Text>
                        </View>
                        <View>
                            <Text style={{marginLeft:15,color:'#ABABAB'}}>剧情简介</Text>
                            <Text style={{marginLeft:15,lineHeight:17,fontSize:14,marginTop:5,marginRight:15}}>{this.state.dtjson.summary}</Text>
                        </View>
                        <View>
                            <Text style={{marginLeft:15,color:'#ABABAB',marginTop:10,marginBottom:10}}>影人</Text>
                            <FlatList style={{marginBottom:50}}
                                horizontal={true}
                                ListFooterComponent={
                                    this.listHeadComponent
                                }
                                showsHorizontalScrollIndicator={false}
                                data={this.getFlatListData()}
                                renderItem={({item,index})=>{
                                    return(
                                        <View key={index} style={{marginLeft:15}}>
                                            <Image style={{width:80,height:100}} source={{uri:item.avatars.small}}/>
                                            <Text style={{width:80,fontSize:14,color:'#ABABAB'}}>{item.name}</Text>
                                        </View>
                                    )
                                }}
                            />
                            
                        </View>

                    </ScrollView>
                    :
                    <View></View>}

            </View>
        )
    }
}

const styles = StyleSheet.create({
    contaner: {
        flex: 1,
        backgroundColor:'#E8E8E8'
    },
    postImg: {
        height: 220,
        resizeMode: 'contain'
    },
    desview: {
        flexDirection: 'row',
        height: 100,
    }
})