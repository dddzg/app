/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React, { Component } from "react";
import { AppRegistry, NativeModules} from "react-native";
import app, { Express, Login, Register } from './src';
import { StackNavigator } from 'react-navigation';
import AppState from './src/AppState';
import { Provider } from 'mobx-react';
import { ThemeProvider } from 'react-native-material-ui';
const UIManager = NativeModules.UIManager;
const SimpleApp = StackNavigator({
    Login: { screen: Login },
    Register: { screen: Register },
    Home: { screen: app },
    Express: { screen: Express },
});
class Dzg extends Component<any,any> {
    componentWillMount() {
        if (UIManager.setLayoutAnimationEnabledExperimental) {
            UIManager.setLayoutAnimationEnabledExperimental(true);
        }
    }
    render() {
        const appState = new AppState();
        return (<Provider appState={appState}>
        <ThemeProvider>
          <SimpleApp />
        </ThemeProvider>
      </Provider>);
    }
}
AppRegistry.registerComponent("app", () => Dzg);
/*
import {Tab1,Tab2,Tab3} from './src'
export default class app extends Component < any, {
  selectedTab : string
} > {
  public Tab1='Tab1';
  public Tab2='Tab2';
  public Tab3='Tab3';
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: this.Tab1
    };
    
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
          icon={require('./pic/alipay_web.png')}
          selectedIcon={require('./pic/alipay_web_sel.png')}
          selected={this.state.selectedTab === this.Tab1}
          onPress={() => {
          this.setState({selectedTab: this.Tab1});
        }}>
          <Tab1/>
        </Item>
        <Item
          title="抢单"
          key="抢单"
          iconStyle={{
            width:22,
            height:22,
          }}
          icon={require('./pic/alipay_web.png')}
          selectedIcon={require('./pic/alipay_web_sel.png')}
          selected={this.state.selectedTab === this.Tab2}
          onPress={() => {
          this.setState({selectedTab: this.Tab2});
        }}>
          <Tab2/>
        </Item>
        <Item
          title="我的"
          key="我的"
          iconStyle={{
            width:22,
            height:22,
          }}
          icon={require('./pic/alipay_web.png')}
          selectedIcon={require('./pic/alipay_web_sel.png')}
          selected={this.state.selectedTab === this.Tab3}
          onPress={() => {
          this.setState({selectedTab: this.Tab3});
        }}>
          <Tab3/>
        </Item>
      </TabBar>
    );
  }
}*/
// <View style={styles.container}>   <Text style={styles.welcome}>     Welcome
// dzg!   </Text>   <Text style={styles.instructions}>     To get started, edit
// index.android.js   </Text>   <Text style={styles.instructions}>     Double
// tap R on your keyboard to reload,{'\n'}     Shake or press menu button for
// dev menu   </Text>   <Button className="btn" type="primary">primary
// 按钮</Button> </View> const styles = StyleSheet.create({   container: {
// flex: 1,     justifyContent: "center",     alignItems: "center",
// backgroundColor: "#F5FCFF"   },   welcome: {     fontSize: 20,     textAlign:
// "center",     margin: 10   },   instructions: {     textAlign: "center",
// color: "#333333",     marginBottom: 5   } }); 
