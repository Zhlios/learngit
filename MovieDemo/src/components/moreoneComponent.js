import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    FlatList,
    Button
} from 'react-native';
import Swiper from 'react-native-swiper';
var Dimensions = require('Dimensions');
var { width, height } = Dimensions.get('window');
var itemcwidth=width-100-90;
const  willcomePush='https://api.douban.com/v2/movie/coming_soon';
export default class MoreOneCom extends Component {

    state={
        start:0,
        count:10,
        data:[],
        refresh:false,  //显示是否在刷新
    }
    getDataFromServer=()=>{
        return fetch(`${willcomePush}?start=${this.state.start}&count=10`)
        .then(response=>response.json())
        .then(data=>{
            return data;
        })
        .catch((error)=>{
            console.log(error)
        })
    }
    freshData=async()=>{
        const json=await this.getDataFromServer();
        console.log(json);
        this.setState({
            start:this.state.start+10,
            data:json.subjects,
        })
    }
    getItem=(item,index)=>{
        let casts="主演:";
         item.casts.map((item,index)=>{
             if(index==0){
                casts=casts+item.name;
             }else{
                casts=casts+"/"+item.name;
             }
            
         })
        return(
            <View key={index} style={{flex:1,flexDirection:'row',width:width,height:130,backgroundColor:'white'}}>
                <Image style={{marginLeft:20,width:80,height:100,top:15}} source={{uri:item.images.small}}/>
                <View style={{top:15,width:itemcwidth,marginLeft:10}} >
                    <Text style={{fontSize:17,fontWeight:'bold'}} numberOfLines={1} >{item.title}</Text>
                    {this.getStars(item.rating.stars,item.rating.average)}
                    <Text style={{marginTop:3,color:'#ABABAB',fontSize:13,lineHeight:19}} numberOfLines={1} color={'#DBDBDB'}>{item.directors[0].name}</Text>
                    <Text style={{marginTop:3,color:'#ABABAB',fontSize:13,lineHeight:19}} numberOfLines={2} color={'#DBDBDB'}>{casts}</Text>
                </View>
                <View style={{alignItems:'center',width:75}}>
                    <Text style={{color:'#FF4500',fontSize:11,marginTop:30}}>{item.collect_count+'万人看过'}</Text>
                    <Text style={{color:'#FF4500',fontSize:11,marginTop:10,borderColor:"#FF4500",borderRadius:4,borderWidth:1 ,width:60,height:28,lineHeight:28,textAlign:'center'}}>购票</Text>
                </View>
            </View>
        )
    }
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
            result.push(<Image key={calculate} style={{width:10,height:10,marginLeft:i==0?0:5}} source={require('../images/star-full.png')} />);
        }
        if(half==1){
            calculate=calculate+1;
        }
        result.push(half == 1 && <Image key={calculate} style={{width:10,height:10,marginLeft:calculate==1?0:5}} source={require('../images/star-half.png')} />);
        for (let i = 0; i < empty; i++) {
            calculate=calculate+1;
            result.push(<Image key={calculate} style={{width:10,height:10,marginLeft:calculate==1?0:5}} source={require('../images/star-empty.png')} />)
        }
        return (
            <View style={{flexDirection:'row',alignItems:'center',marginTop:5,height:20}}>
                {result}
                <Text style={{marginLeft:15,height:15}}>{grade}</Text>
            </View>
        );
    }
    headcomponent=()=>{
        return(
            <View style={{height:150}}>
                    <Swiper  autoplay
                        showsPagination
                        paginationStyle={{
                            bottom:10,
                        }}
                    >
                        <View style={styles.lunbosty}>
                            <Image style={styles.lbimgsty} source={require('../images/gongfuyujia.jpg')} />
                        </View>
                        <View style={styles.lunbosty}>
                            <Image style={styles.lbimgsty} source={require('../images/houhuiwuqi.jpeg')} />
                        </View>
                        <View>
                            <Image style={styles.lbimgsty} source={require('../images/yongganchuanshuo.jpg')} />
                        </View>
                        <View style={styles.lunbosty}>
                            <Image style={styles.lbimgsty} source={require('../images/yigeshaozi.jpg')} />
                        </View>   
                    </Swiper>
                </View>
        )
    }
    componentWillMount(){
        this.freshData();
     
    }
 
    render() {
        return (
            <View style={{backgroundColor:'white'}}>
                <FlatList
                    removeClippedSubviews={false}
                    data={this.state.data}
                    onRefresh={()=>this.freshData()}
                    refreshing={this.state.refresh}
                    renderItem={({item,index})=>{
                        return this.getItem(item,index);
                    }}
                    ListHeaderComponent={()=>{
                        return(
                            this.headcomponent()
                        )
                    }}
                    ItemSeparatorComponent={()=>{
                        return(
                            <View style={{height:0.5,backgroundColor:"#e4e3eb"}}/>
                        )
                    }}
                >
                </FlatList>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    swpiersty: {
    },
    lunbosty: {
       flex:1,
    },
    lbimgsty: {
        width: width,
        height: 150,
    },
    lbtextsty: {

    },
})

