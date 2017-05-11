import React, {Component} from "react";
import {StyleSheet, Text, View, Image,ScrollView} from "react-native";
import {Icon, Carousel,WhiteSpace} from "antd-mobile";
import Card from './Component/Card'
import {inject} from 'mobx-react'
import {AppState,Drawer,get,ip} from './'
import {CardProps} from './Component/Card'

const name = ['','叫早安', '代拿快递', '课程服务', '自定义']
@inject('appState')
class Tab2 extends Component < {appState?:AppState},{data:CardProps[]} > {
    constructor(props) {
        super(props);
        this.state={
            data:[]
        }
    }
    componentDidMount(){
        const getWorks=async ()=>{
            let data=await get(ip+'/order/retrieve.php',
            {server_openid:this.props.appState && this.props.appState.id});
            data=data.info;
            console.log(data);
            (this.props.appState as AppState).initData=data;
            this.setState({
                data:(data as any[]).map((value,index)=>{
                    return {
                        money:Math.floor(value.total_fee) ,
                        title:name[value.service_type_id],
                        content:value.service_detail,
                        school:value.user_address,
                        img:index%4+1,
                        num:index%4+1,
                    }
                })
            })
        }
        getWorks();
    }
    render() {
        return (
            <Drawer exit={this.props.appState && this.props.appState.exit} name={String(this.props.appState && this.props.appState.name)}>
                <Carousel autoplayInterval={1000} infinite autoplay={true} selectedIndex={0}>
                    <Image
                        key={1}
                        style={{
                        width: '100%',
                        height: 160
                    }}
                        source={{
                        uri: 'http://images.enet.com.cn/egames/articleimage/2013/0826/20130826022204121.jpg'
                    }}/>
                    <Image
                        key={2}
                        style={{
                        width: '100%',
                        height: 160
                    }}
                        source={{
                        uri: 'http://images.enet.com.cn/egames/articleimage/2013/0826/20130826022204121.jpg'
                    }}/>
                </Carousel>
                {this.state.data.map((value,index)=>{
                    return (
                        <Card
                        key={index}
                        {...value}
                        />
                    )
                })}
                {/*<Card
                    content='明天早上6:00叫我起床'
                    img={1}
                    school='华南理工大学'
                    money={99}
                    title='叫早安'
                    num={1}
                />
                <Card
                    content='明天早上6:00叫我起床'
                    img={2}
                    school='华南理工大学'
                    money={100}
                    title='叫早安'
                    num={2}
                />
                <Card
                    content='明天早上6:00叫我起床'
                    img={3}
                    school='华南理工大学'
                    money={100}
                    title='叫早安'
                    num={3}
                />
                <Card
                    content='明天早上6:00叫我起床'
                    img={3}
                    school='华南理工大学'
                    money={100}
                    title='叫早安'
                    num={3}
                />*/}
                {/*<Card/>
                <Card/>
                <Card/>
                <Card/>
                <Card/>*/}
                <WhiteSpace size="lg" />
                {/*<Text>这是抢单页面123!!!</Text>*/}
           </Drawer>
        )
    }
}

export default Tab2;