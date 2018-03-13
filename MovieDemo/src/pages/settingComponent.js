import React, {Component} from 'react';
import{
    View,
    Text,
    Image,
    StyleSheet,
} from 'react-native';
const Dimensions = require('Dimensions');
const screenWidth = Dimensions.get('window').width;
export default class SettingComponent extends Component{

    sectionItem=()=>{
        datasource=this.props.datasource;
        console.log(datasource.unique_id);
        if(datasource.unique_id=="head_id"){
            return (
                <View style={styles.bodyStyle}> 
                    <Image style={styles.headImg} source={{uri:'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1606168596,876635122&fm=27&gp=0.jpg'}}/>
                    <View style={styles.colBody}>
                        <Text >{datasource.name}</Text>
                        <Text >{datasource.weixin_id}</Text>
                    </View>
                    <Image style={styles.erweimaImg} source={require('../images/erweima.png')}/>
                    <Image style={styles.jiantou_left} source={require('../images/jiantou_left.png')}/>
                </View>
            )  
        }
        return(
            <View style={styles.bodyStyle}>
                <Image style={{width:30,height:30,marginTop:10,marginBottom:10,marginLeft:20}} source={datasource.headImg}/>
                <Text style={{marginLeft:5}}>{datasource.name}</Text>
                <Image style={styles.jiantou_left} source={require('../images/jiantou_left.png')}/>
            </View>
        )
    }
    render(){
        return(
            <View style={{flex:1}}>
                {this.sectionItem()}
            </View>
        )
    }
}

const styles=StyleSheet.create({
    bodyStyle:{
        flex:1,
        flexDirection:'row', 
        backgroundColor:'white',
        alignItems:'center',
    
    },
    colBody:{
        marginLeft:10,
        height:45,
        justifyContent:'space-around',
    },
    headImg:{
        marginLeft:20,
        marginTop:15,
        marginBottom:15,
        width: 50,
        height:50,
    },

    erweimaImg:{
        position:'absolute',
        right:35,
        width: 30,
        height:30,
    },
    jiantou_left:{
        position:'absolute',
        right:5,
        width: 30,
        height:30,
    }
})