import {DrawerLayoutAndroid,View,Image,Text,StatusBar,ScrollView} from 'react-native'
import {Button} from 'react-native-material-ui';
import React,{Component} from 'react'
import {Icon} from 'antd-mobile'

class Drawer extends Component<{name:string,exit:any},{}>{
    navigationView = (
            <View
                style={{
                flex: 1,
                backgroundColor: '#fff'
            }}>
                <View style={{
                    height: 180
                }}>
                    <Image
                        style={{
                        height: 180,
                        position: 'absolute'
                    }}
                        source={require('../pic/drawer-header.png')}/>
                    <View
                        style={{
                        marginLeft: 16,
                        position: 'absolute',
                        bottom: 18
                    }}>
                        <Image
                            style={{
                            width: 60,
                            height: 60,
                            borderRadius: 100
                        }}
                            source={{
                            uri: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2641221615,2526718407&fm=23&gp=0.jpg'
                        }}/>
                        <Text
                            style={{
                            fontSize: 16,
                            marginTop: 8
                        }}>{this.props.name}</Text>
                    </View>
                </View>
                <View style={{
                    marginTop: 9
                }}>
                    {['个人信息', '我接的单', '关于APP'].map((value, index) => <Button
                        key={index}
                        default
                        text={value}
                        style={{
                        text: {
                            fontSize: 18,
                            color: 'rgb(148, 148, 148)',
                            fontWeight: 'normal'
                        },
                        container: {
                            height: 44,
                            justifyContent: 'flex-start'
                        }
                    }}/>)
                    }
                    <Button
                        default
                        text={'退出登录'}
                        style={{
                        text: {
                            fontSize: 18,
                            color: '#D50000',
                            fontWeight: 'normal'
                        },
                        container: {
                            height: 44,
                            justifyContent: 'flex-start',
                        }
                        
                    }}
                        onPress={this.props.exit}
                    />
                </View>
            </View>
        );
    render(){
        return (
            <DrawerLayoutAndroid
            accessible={true}
            ref='dzg'
            drawerWidth={280}
            drawerPosition={DrawerLayoutAndroid.positions.Left}
            renderNavigationView={() => this.navigationView}>
                <StatusBar translucent ={true} backgroundColor='rgba(0,0,0,0.2)'/>
                <View
                    style={{
                    backgroundColor: '#2196F3',
                    height: 24
                }}></View>
                <View
                    style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    backgroundColor: '#fff',
                    height: 48,
                    borderBottomColor:'#ddd',
                    borderBottomWidth:0.5
                }}>
                    <View
                        onTouchStart={() => {
                        (this.refs.dzg as any).openDrawer();
                    }}
                        style={{
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}>
                        <Image
                            style={{
                            width: 36,
                            height: 36,
                            borderRadius: 100,
                            marginLeft: 5
                        }}
                            source={{
                            uri: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2641221615,2526718407&fm=23&gp=0.jpg'
                        }}/>
                        <Text
                            style={{
                            marginLeft: 3
                        }}>{this.props.name}</Text>
                    </View>
                    <View
                        style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <Text
                            style={{
                            color: '#108ee9',
                            fontSize: 14
                        }}>华南理工大学</Text>
                        <Icon type='right' color='#108ee9' size='xxs'></Icon>
                    </View>
                </View>
                <ScrollView style={{backgroundColor:'#f5f5f9'}}>
                {this.props.children}
                </ScrollView>
            </DrawerLayoutAndroid>
        )
    }
}

export {Drawer}