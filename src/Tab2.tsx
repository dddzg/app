import React, {Component} from "react";
import {StyleSheet, Text, View, Image,ScrollView,RefreshControl,Platform,NativeModules,LayoutAnimation} from "react-native";
import {Icon, Carousel,WhiteSpace} from "antd-mobile";
import Card from './Component/Card'
import {inject,observer} from 'mobx-react'
import {AppState,Drawer,get,ip} from './'
import {CardProps} from './Component/Card'
const UIManager = NativeModules.UIManager;
var CustomLayoutAnimation = {
    duration: 666,
    create: {
      type: LayoutAnimation.Types.linear,
      property: LayoutAnimation.Properties.opacity,
    },
    update: {
      type: LayoutAnimation.Types.easeInEaseOut,
    },
  };
@inject('appState')
@observer
class Tab2 extends Component < {appState?:AppState},{data:CardProps[],isRefresh:boolean} > {
    constructor(props) {
        super(props);
        this.state={
            data:[],
            isRefresh:false
        }
        if (UIManager.setLayoutAnimationEnabledExperimental) {
            UIManager.setLayoutAnimationEnabledExperimental(true);
        }
    }
    componentDidMount(){
        this.props.appState&& this.props.appState.getWorks();
    }
    componentWillUpdate() {
        LayoutAnimation.configureNext(CustomLayoutAnimation);
    }
    fresh=async ()=>{
        this.setState({isRefresh:true});
        await (this.props.appState as AppState).getWorks();
        this.setState({isRefresh:false});
    }
    render() {
        return (
            <Drawer exit={this.props.appState && this.props.appState.exit} name={String(this.props.appState && this.props.appState.name)}>
                <ScrollView style={{backgroundColor:'#f5f5f9',height:'100%'}} 
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.isRefresh}
                        onRefresh={this.fresh}
                        title="Loading..."
                        colors={['#03A9F4']}
                        progressBackgroundColor="#fff"
                    />
                }>
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
                    <View style={{height:'100%',paddingBottom:70}}>
                        {this.props.appState && this.props.appState.data.map((value,_index)=>{
                            return (
                                <Card
                                key={value.id}
                                {...value}
                                />
                            )
                        })}
                    </View>
                    <WhiteSpace size="lg" />
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

                    {/*<Text>这是抢单页面123!!!</Text>*/}
                </ScrollView>
           </Drawer>
        )
    }
}

export default Tab2;