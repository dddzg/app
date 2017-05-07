import React, {Component} from "react";
import {StyleSheet, Text, View, Image,ScrollView} from "react-native";
import {Icon, Carousel,WhiteSpace} from "antd-mobile";
import Card from './Component/Card'

export default class Tab2 extends Component < any, any > {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <ScrollView style={{backgroundColor:'#ececf1'}}>
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
                <Card
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
                {/*<Card/>
                <Card/>
                <Card/>
                <Card/>
                <Card/>*/}
                <WhiteSpace size="lg" />
                {/*<Text>这是抢单页面123!!!</Text>*/}
            </ScrollView>
        )
    }
}

