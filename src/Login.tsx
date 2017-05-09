import React, {Component} from "react";
import {Text,View,Image} from 'react-native'
import {InputItem,List,Toast} from 'antd-mobile'
import { Button } from 'react-native-material-ui';
class Login extends Component<any,any>{
    static navigationOptions = {
        title: 'Login',
        header :null
    };
    render(){
        return(
            <View>
                <View>
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
                            type="phone"
                            placeholder="请输入您的手机号"
                        />
                    </View>
                    <View style={{
                        width:'100%',
                        backgroundColor:'white',
                    }}>
                        <InputItem
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
                        }}/>
                        <View style={{
                            flexDirection:'row',
                            justifyContent:'space-between',
                            marginTop:12,
                        }}>
                            <Text style={{color:'#1e95ef',fontSize:14}} onPress={
                                ()=>{
                                Toast.offline('忘记了就重新注册一个吧', 1);
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