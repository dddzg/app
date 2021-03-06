import React, {Component} from "react";
import { StyleSheet, Text, View, Image} from "react-native";
import { Icon,Toast } from 'antd-mobile';
import {post,ip} from '../'
import {inject} from 'mobx-react'
export interface CardProps{
    money:number,
    title:string,
    content:string,
    school:string,
    img:number
    id:number,
    phone?:string
    extra?:string
    [index:string]:any
}
@inject('appState')
export default class Card extends Component<CardProps,any>{
    backgroundImg(num:number){
        // let num=Math.floor(Math.random()*5)+1;
        if (num===1)
            return require('./t1.png')
        if (num===2)
            return require('./t2.png')
        if (num===3)
            return require('./t3.png')
        if (num===4)
            return require('./t4.png')
        if (num===5)
            return require('./t5.png')
        return require('./t1.png')
    }
    constructor(props){
        super(props);
    }
    submit=()=>{
        const data={
            server_openid:this.props.appState.id,
            id:this.props.id
        }
        Toast.loading('接单中……',0);
            const go=async ()=>{
                const res=await post(ip+'/order/take.php',data);
                if (res.response===0){
                    Toast.hide();
                    Toast.success('接单成功',1);
                    this.props.appState.addData(this.props.id);
                    this.props.appState.getWorks();
                    console.log(res);
                    // console.log(this.props.appState.navigation);
                    // this.props.navigation.goBack();
                }else{
                    Toast.info(res.info,1);
                }
            }
        go();
        console.log(data);
    }
    render(){
        return (
            <View style={styles.view}>
                <Image
                    style={styles.image}
                    source={this.backgroundImg(this.props.img)}
                />
                <View style={{        
                    marginLeft:24,
                    marginRight:24
                    }}>
                <View style={{
                    justifyContent:'space-between',
                    flexDirection:'row'
                }}>
                    <View style={{
                        flexDirection:'row'
                    }}>
                        <Text style={styles.money}>{this.props.money}</Text>
                        <Text style={styles.small}>￥</Text>
                    </View>
                    <Image
                        style={{
                            width:50,
                            height:50,
                            borderRadius:100,
                            marginTop:20
                        }}
                        source={{
                            uri:'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2641221615,2526718407&fm=23&gp=0.jpg'
                        }}
                    />
                </View>
                
                <Text style={styles.words}>{this.props.title+'  '}
                    <Text style={styles.smallWords}>
                        {this.props.content.length>=15?this.props.content.slice(0,15)+'……':this.props.content}
                    </Text>
                </Text>
                <View style={{
                    marginTop:10,
                    marginBottom:15,
                    justifyContent:'space-between',
                    flexDirection:'row'
                }}>
                    <Text >                   
                        <Icon type={'\ue685'}
                        size={'xxs'} color='#a7a7a7' />
                        <Text style={{
                            color:'#a7a7a7',
                        }}>
                            {' '+(this.props.extra || this.props.school)}
                        </Text>
                    </Text>
                    {
                        this.props.phone?
                        <Text style={{
                                color:'#2196F3',
                        }}>{this.props.phone}</Text>:
                        <Text onPress={this.submit}>
                            <Text style={{
                                color:'#2196F3',
                            }}>
                                接受任务
                            </Text>
                            <Icon type={'right'}
                            size={'xxs'} color='#2196F3' />
                        </Text>
                    }
                </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    smallWords:{
        marginLeft:15,
        fontSize:15,
        
    },
    words:{
        marginTop:0,
        fontSize:20,
        color:'#a7a7a7',
        borderBottomWidth:1,
        borderColor:'rgba(167, 167, 167, 0.42)'
    },
    small:{
        fontSize:20,
        textAlignVertical:'top',
        color:'#fbc02d',
        top:10
    },
    money:{
        fontSize:60,
        color:'#fbc02d',
        marginLeft:-5
    },
    view:{
        position:'relative',
        overflow:'hidden',
        marginTop:15,
        backgroundColor:'white'
    },
    image:{
        position:'absolute',
        top:-50,
        right:-40,
        width:130,
        height:130,
        maxHeight:200
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});