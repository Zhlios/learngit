import React,{Component} from 'react';
import{
    View,
    Stylesheet,
    Text,
} from 'react-native';
import { connect } from 'react-redux';
import { getUserName } from '../store/storeaction';
class Moviespage  extends  Component{ 
    
    state={
        myarr:['1'],
        text:'heelo',
    }
    change=()=>{
        this.props.getUserName('helloworldjjjjjjjj');
        console.log('hahah');
        arr=this.state.myarr;
        arr.push('sss');
        this.setState({
            myarr:arr.concat('11'),
        })
    }
    addText=()=>{
       return(
           <View>
           {this.state.myarr.map((item,key)=>(
                <View key={key}><Text>hellonihao</Text></View>
                ))}
            </View>
            )      
    }
    render(){
        return(
            <View> 
                <Text onPress={()=>{this.change()}}>修改推荐界面的数据</Text>
                <Text>{this.state.text}</Text>
                {this.addText()}
            </View>
           
        )
    }
}
export default connect((state) => {
    const { ShiTuReducer } = state;
    return {
        ShiTuReducer,   
    };
},{ getUserName })(Moviespage)