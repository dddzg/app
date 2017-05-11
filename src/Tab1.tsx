import React, {Component} from "react";
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    Alert,
    DrawerLayoutAndroid,
    StatusBar,
    AsyncStorage
} from "react-native";
import {Icon, Carousel, WhiteSpace, NoticeBar} from "antd-mobile";
import {Grid, Toast} from 'antd-mobile';
import {Button} from 'react-native-material-ui';
import {inject} from 'mobx-react'
import AppState from './AppState'
import { NavigationActions } from 'react-navigation'

import {Drawer} from './'
@inject('appState')
class Tab1 extends Component < {appState?:AppState,[index:string]:any},
any > {
    public name = ['代拿快递', '叫早安', '课程服务', '自定义']
    public englName = ['Express', 'GoodMorning', 'Class', 'Self']
    public source = [require('./../pic/d2.png'), require('./../pic/d1.png'), require('./../pic/d3.png'), require('./../pic/d4.png')]
    public renderItem(dataItem : {
        text: string
    }, index : number) {
        return (
            <View
                style={{
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                height: '100%'
            }}>
                <Image
                    style={{
                    width: 40,
                    height: 40
                }}
                    source={this.source[index]}/>
                <Text style={{
                    marginTop: 10
                }}>{dataItem.text}</Text>
            </View>
        )
    }
    render() {
        const data = Array
            .from(new Array(4))
            .map((_val, i) => ({text: this.name[i]}));
        return (
            <Drawer exit={this.props.appState && this.props.appState.exit} name={String(this.props.appState && this.props.appState.name)}>
                <ScrollView style={{backgroundColor:'#f5f5f9',height:'100%'}} >
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
                    <NoticeBar mode="closable">
                        这是一个萌萌的公告，你可以选择关掉它
                    </NoticeBar>
                    <Grid
                        data={data}
                        columnNum={3}
                        hasLine={true}
                        renderItem={this
                        .renderItem
                        .bind(this)}
                        onClick={(_el, index) => this.props.navigation.navigate(this.englName[index])}/>
               </ScrollView>
            </Drawer>
        )
    }
}

export default Tab1;