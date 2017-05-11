import React, {Component} from "react";
import {Text,View,Image,Keyboard,AsyncStorage,StatusBar} from 'react-native'
import {InputItem,List,Toast} from 'antd-mobile'
import { Button } from 'react-native-material-ui';
import AppState from './AppState'
import {inject} from 'mobx-react'
import {ip} from './'
import { NavigationActions } from 'react-navigation'
import {post,get} from './index'
@inject('appState')
class Login extends Component<{appState:AppState,[index:string]:any},{tel:string}>{
    static navigationOptions = {
        title: 'Login',
        header :null
    };
    constructor(props){
        super(props);
        this.state={
            tel:''
        }
    }
    componentWillMount(){
        this.props.appState.navigation=this.props.navigation;
        const autoLogin=async ()=>{
            const data=await AsyncStorage.multiGet(['phone','pw','id','name']);
            if (data[0][1] && data[1][1] && data[2][1] && data[3][1]){
                Toast.loading('自动登录中...',0);
                const login=await post(ip+'/user/login.php',{phone:data[0][1],pw:data[1][1]});
                if (login.response===0){
                    console.log(login);
                    this.props.appState.id=data[2][1];
                    this.props.appState.name=data[3][1];
                    this.props.appState.password=data[1][1];
                    this.props.appState.tel=data[0][1];
                    const resetAction = NavigationActions.reset({
                        index: 0,
                        actions: [
                            NavigationActions.navigate({ routeName: 'Home'})
                        ]
                    })
                    this.props.navigation.dispatch(resetAction)
                }else{
                    Toast.hide();
                    Toast.fail(login.info,1);
                }

            }
        }
        autoLogin();
    }
    componentWillUnmount(){
        Toast.hide();
    }
    submit=()=>{
        const send=async()=>{
            try{
                const loginData={
                    phone:(this.state.tel as string).replace(/\s/g,''),
                    pw:(this.refs.password as any).refs.input._lastNativeText || ''
                }
                const login=await post(ip+'/user/login.php',loginData);
                if(login.response===0){
                    
                    const uid=await get(ip+'/user/getUid.php');
                    if (uid.response===0){
                        this.props.appState.id=uid.info;
                        this.props.appState.name=login.info;
                        this.props.appState.password=loginData.pw;
                        this.props.appState.tel=loginData.phone;
                        await AsyncStorage.multiSet([['phone',loginData.phone],['pw',loginData.pw],['id',uid.info],['name',login.info]]);
                        const resetAction = NavigationActions.reset({
                            index: 0,
                            actions: [
                                NavigationActions.navigate({ routeName: 'Home'})
                            ]
                        })
                        this.props.navigation.dispatch(resetAction)
                    }else{
                        Toast.hide();
                        Toast.fail(uid.info,1);
                    }
                }else{
                    Toast.hide();
                    Toast.fail(login.info,1);
                }        
            }catch(err){
                Toast.fail('登录失败',1);
            }
        }
        Keyboard.dismiss();
        Toast.loading('登录中……',0);
        send.bind(this)();
    }
    render(){
        return(
            <View>
                <View>
                    <StatusBar translucent ={true} backgroundColor='rgba(0,0,0,0.2)'/>
                    <View
                        style={{
                        backgroundColor: '#2196F3',
                        height: 24
                    }}></View>
                    <View style={{alignItems:'center'}}>
                        <Image
                            style={{
                            marginTop:44,
                            width:88,
                            height:88,
                            borderRadius: 100,
                        }}
                            source={{
                            uri: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2641221615,2526718407&fm=23&gp=0.jpg'
                        }}/>
                    </View>
                    <View style={{
                        marginTop:16,
                        width:'100%',
                        backgroundColor:'white',
                        borderBottomColor:'#dedfe0',
                        borderBottomWidth:0.5
                    }}>
                        <InputItem
                            onChange={tel=>this.setState({tel:tel})}
                            value={this.state.tel}
                            type="phone"
                            placeholder="请输入您的手机号"
                        />
                    </View>
                    <View style={{
                        width:'100%',
                        backgroundColor:'white',
                    }}>
                        <InputItem
                            ref='password'
                            type="password"
                            placeholder="请输入您的密码"
                        />
                    </View>
                    <View style={{
                        marginTop:10,
                        marginLeft:16,
                        marginRight:16
                    }}> 
                        <Button primary raised text="登 录" 
                        style={{
                            text:{
                                fontSize:18,
                                fontWeight: 'normal'
                            },
                            container:{
                                height:44
                            }
                        }}
                        onPress={this.submit}/>
                        <View style={{
                            flexDirection:'row',
                            justifyContent:'space-between',
                            marginTop:12,
                        }}>
                            <Text style={{color:'#1e95ef',fontSize:14}} onPress={
                                ()=>{
                                Toast.fail('忘记了就重新注册一个吧', 1);
                                }}>忘记密码?</Text>
                            <Text 
                            style={{color:'#1e95ef',fontSize:14}} 
                            onPress={()=>{
                                this.props.navigation.navigate('Register')
                            }}>新用户注册</Text>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}

export default Login