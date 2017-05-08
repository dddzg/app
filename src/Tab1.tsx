import React, {Component} from "react";
import {AppRegistry, StyleSheet, Text, View, Image,ScrollView,Alert,DrawerLayoutAndroid,StatusBar} from "react-native";
import {Icon, Carousel,WhiteSpace,NoticeBar} from "antd-mobile";
import { Grid,Toast } from 'antd-mobile';
import { Button } from 'react-native-material-ui';
export default class Tab1 extends Component<any,any>{
    public name=['代拿快递','叫早安','课程服务','自定义']
    public englName=['Express','GoodMorning','Class','Self']
    public source=[require('./../pic/d2.png'),require('./../pic/d1.png'),require('./../pic/d3.png'),require('./../pic/d4.png')]
    
    public renderItem(dataItem:{text:string}, index:number){
        return (
            <View style={{
                flexDirection:'column',
                justifyContent:'center',
                alignItems:'center',
                width:'100%',
                height:'100%'
            }}

            >
                <Image
                    style={{
                        width:40,
                        height:40
                    }}
                    source={this.source[index]}
                />
                <Text style={{marginTop:10}}>{dataItem.text}</Text>
            </View>
        )   
    }
    render(){
        const data = Array.from(new Array(4)).map((_val, i) => ({
            text: this.name[i],
        }));
        const navigationView = (
            <View style={{flex: 1, backgroundColor: '#fff'}}>
                <View
                style={{
                    height:180
                }}
                >
                    <Image
                    style={{
                        height:180,
                        position:'absolute'
                    }}
                    source={require('../pic/drawer-header.png')}
                    />
                    <View style={{
                        marginLeft:16,
                        position:'absolute',
                        bottom:18,
                    }}>
                        <Image
                            style={{
                                width:60,
                                height:60,
                                borderRadius:100,
                            }}
                            source={{
                                uri:'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2641221615,2526718407&fm=23&gp=0.jpg'
                            }}
                        />
                        <Text style={{
                            fontSize:16,
                            marginTop:8
                        }}>飞奔的啦啦啦</Text>
                    </View>
                </View>
                <View style={{
                    marginTop:9
                }}>
                {
                    ['个人信息','我接的单','关于APP'].map((value,index)=>
                        <Button key={index} default text={value} style={{
                            text:{
                                fontSize: 18,
                                color:'rgb(148, 148, 148)',
                                fontWeight:'normal'
                            },
                            container:{
                                height:44,
                                justifyContent:'flex-start'
                            }
                        }}/>
                    )
                }
                </View>
            </View>
        );
        return (
            <DrawerLayoutAndroid
                accessible={true}
                ref='dzg'
                drawerWidth={280}
                drawerPosition={DrawerLayoutAndroid.positions.Left}
                renderNavigationView={() => navigationView}>
                <StatusBar
                    translucent ={true}
                    backgroundColor ='rgba(0,0,0,0.2)'
                />
                <ScrollView style={{backgroundColor:'#ececf1'}}>
                    <View style={{
                        backgroundColor:'#fff',
                        height:24
                    }}></View>
                    <View style={{
                        flexDirection:'row',
                        justifyContent:'space-between',
                        alignItems:'center',
                        backgroundColor:'#fff',
                        height:48
                    }}>
                        <View
                        onTouchStart={()=>{
                            (this.refs.dzg as any).openDrawer();
                        }} 
                        style={{
                            flexDirection:'row',
                            alignItems:'center',
                        }}> 
                            <Image
                                style={{
                                    width:36,
                                    height:36,
                                    borderRadius:100,
                                    marginLeft:5
                                }}
                                source={{
                                    uri:'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2641221615,2526718407&fm=23&gp=0.jpg'
                                }}
                            />
                            <Text style={{marginLeft:3}}>飞奔的啦啦啦</Text>
                        </View>
                        <View style={{
                            flexDirection:'row',
                            justifyContent:'space-between',
                            alignItems:'center',
                        }}> 
                            <Text style={{
                                color:'#108ee9',
                                fontSize:14
                            }}>华南理工大学</Text>
                            <Icon type='right' color='#108ee9' size='xxs'></Icon>
                        </View>
                    </View>

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
                    <NoticeBar mode="closable" >
                        这是一个萌萌的公告，你可以选择关掉它
                    </NoticeBar>
                    <Grid data={data} columnNum={3} hasLine={true} renderItem={this.renderItem.bind(this)}
                        onClick={(_el, index) => this.props.navigate(this.englName[index])}
                    />
                </ScrollView>
            </DrawerLayoutAndroid>
        )
    }
}