export {default as Tab1} from './Tab1'
export {default as Tab2} from './Tab2'
export {default as Tab3} from './Tab3'
export {default as Express} from './Express'
export {default as AppState} from './AppState'
export {default as Login} from './Login'
export {default as Register} from './Register'
export {post,get} from './utils'
export {ip} from './config'
import React, {Component} from "react";
import {AppRegistry, StyleSheet, Text, View, Image,StatusBar} from "react-native";
import {Button,Toast} from "antd-mobile";
import {TabBar, Icon, Carousel} from "antd-mobile";
import {Tab1,Tab2,Tab3} from './'
export default class app extends Component < any, {
  selectedTab : string
} > {
    static navigationOptions = {
    title: 'Index',
    header :null
    };
  public Tab1='Tab1';
  public Tab2='Tab2';
  public Tab3='Tab3';
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: this.Tab1
    };
    
  }
  componentWillMount(){
    Toast.hide();
    // const {navigate} = this.props.navigation;
    // navigate('Login');
  }
  render() {
    const Item = TabBar.Item;
    return (
      <TabBar
        children
        unselectedTintColor="#949494"
        tintColor="#33A3F4"
        barTintColor="white">
        <Item
          title="下单"
          key="下单"
          iconStyle={{
            width:22,
            height:22,
          }}
          icon={require('../pic/alipay_web.png')}
          selectedIcon={require('../pic/alipay_web_sel.png')}
          selected={this.state.selectedTab === this.Tab1}
          onPress={() => {
          this.setState({selectedTab: this.Tab1});
        }}>
          <Tab1 navigation={this.props.navigation}/>
        </Item>
        <Item
          title="抢单"
          key="抢单"
          iconStyle={{
            width:22,
            height:22,
          }}
          icon={require('../pic/alipay_web.png')}
          selectedIcon={require('../pic/alipay_web_sel.png')}
          selected={this.state.selectedTab === this.Tab2}
          onPress={() => {
          this.setState({selectedTab: this.Tab2});
        }}>
          <Tab2/>
        </Item>
      </TabBar>
    );
  }
}