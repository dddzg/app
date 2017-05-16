import React, {Component} from "react";
import {View,Image,Keyboard,AsyncStorage,StatusBar} from 'react-native'
import {InputItem,Toast} from 'antd-mobile'
import { Button } from 'react-native-material-ui';
import {ip} from './'
import { NavigationActions } from 'react-navigation'
import {post,get} from './index'
import {inject} from 'mobx-react'
import AppState from './AppState'
@inject('appState')
class Register extends Component<{appState:AppState,navigation:any},{tel?:string,name?:string,password?:string}>{
    static navigationOptions = {
        title: '注册',
        headerStyle:{
            marginTop:24
        }
    };
    constructor(props){
        super(props);
        this.state={
            tel:'',
            name:'',
            password:''
        }
    }
    componentWillUnmount(){
        Toast.hide();
    }
    submit=()=>{
        Keyboard.dismiss();
        const [tel,name,password]=[(this.state.tel as string).replace(/\s/g,''),
        String(this.state.name),(this.refs.dzg as any).refs.input._lastNativeText];
        if (tel.length!==11) {Toast.fail('手机号码错误',1); return;}
        if (name.length===0) {Toast.fail('昵称不能为空',1); return;}
        if (password==='undefined' || password.length===0) {Toast.fail('密码不能为空',1); return;}
        const send=async ()=>{
            try{
                let data={username:name,phone:tel,pw:password};
                const ans=await post(ip+'/user/register.php',data);
                if (ans.response===0) {
                    const logindata={
                        phone:data.phone,
                        pw:data.pw
                    }
                    const [loginAns,id]=await Promise.all([post(ip+'/user/login.php',logindata),
                    get(ip+'/user/getUid.php')]); //并行！虽然感觉叫并行也不是很对？但也感觉不叫并发。
                    console.log(loginAns);
                    console.log(id);
                    if (loginAns.response===0 && id.response===0){
                        this.props.appState.name=data.username;
                        this.props.appState.password=data.pw;
                        this.props.appState.tel=data.phone;
                        this.props.appState.id=id.info;
                        await AsyncStorage.multiSet([['phone',data.phone],['pw',data.pw],['id',id.info],['name',data.username]]);
                        // console.log(this.props.appState);
                        const resetAction = NavigationActions.reset({
                            index: 0,
                            actions: [
                                NavigationActions.navigate({ routeName: 'Home'})
                            ]
                        })
                        this.props.navigation.dispatch(resetAction)
                    }
                    else{
                        Toast.hide();
                        Toast.fail(ans.info,1);
                    }
                }
                else{
                    Toast.hide();
                    Toast.fail(ans.info,1);
                }
            }catch(err){
                Toast.fail('注册失败',1);
            }
        }
        Toast.loading('注册中……',0);
        send.bind(this)();
    }
    render(){
        return(
            <View>
                <View>
                    <StatusBar translucent ={true} backgroundColor='#1878c2'/>
                    <View style={{alignItems:'center'}}>
                        <Image
                            style={{
                            marginTop:20,
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
                        borderBottomColor:'#dedfe0',
                        borderBottomWidth:0.5
                    }}>
                        <InputItem
                            onChange={name=>this.setState({name:name})}
                            value={this.state.name}
                            placeholder="请输入您的昵称"
                        />
                    </View>
                    <View style={{
                        width:'100%',
                        backgroundColor:'white',
                    }}>
                        <InputItem
                            ref='dzg'
                            type="password"
                            placeholder="请输入您的密码"
                        />
                    </View>
                    <View style={{
                        marginTop:10,
                        marginLeft:16,
                        marginRight:16
                    }}> 
                        <Button primary raised text="注 册" 
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
                    </View>
                </View>
            </View>
        )
    }
}

export default Register