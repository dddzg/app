import React, {Component} from "react";
import {AppRegistry, StyleSheet, Text, View, Image,TouchableOpacity,Slider,ScrollView,Picker,Switch,DatePickerAndroid,StatusBar,Keyboard} from "react-native";
import { Icon,List,InputItem,TextareaItem,Toast  } from 'antd-mobile';
import DatePicker from 'react-native-datepicker'
import {inject,observer} from 'mobx-react'
import {post,ip} from './'
const _min=new Date();
const temp=new Date();
const _max=new Date(temp.setDate(temp.getDate()+1));
const translateTime=(time:Date)=>{
    let two=(str:number)=>str<10?'0'+str:str;
    return `${time.getFullYear()}-${two(time.getMonth()+1)}-${two(time.getDate())} ${two(time.getHours())}:${two(time.getMinutes())}`
}
const minTimeString=translateTime(_min);
const maxTimeString=translateTime(_max);
import { AppState } from './'
import { Button } from 'react-native-material-ui';
@inject('appState')
class Express extends Component < {appState:AppState,[index:string]:any}, {
        type:string,
        weight:string,
        upstairs:boolean,
        care:boolean,
        date:string,
        content:string,
        price:string
    } > {
    static navigationOptions = {
        title: '代拿快递',
        headerStyle:{
            marginTop:24
        }
    };
    constructor(props){
        super(props);
        this.state={
            type:'京东',
            weight:'2公斤以下',
            upstairs:false,
            care:false,
            date:minTimeString,
            content:'',
            price:'4'
        }
    }
    submit=()=>{
        Keyboard.dismiss();
        const data={
            openid:this.props.appState.id,
            service_type_id:'2',
            service_expire_time:this.state.date,
            service_detail:this.state.content,
            total_fee:this.state.price,
            username:this.props.appState.name,
            user_address:'华南理工大学',
            user_phone:this.props.appState.tel,
            extra:`${this.state.type}。${this.state.weight}。${this.state.care?'保管。':''}${this.state.upstairs?'上楼。':''}`
        }
        const go=async ()=>{
            const res=await post(ip+'/order/insert.php',data);
            if (res.response===0){
                Toast.success('提交成功',1);
                console.log(res);
                // console.log(this.props.appState.navigation);
                this.props.navigation.goBack();
            }else{
                Toast.info(res.info,1);
            }
        }
        go();
        console.log(data);
    }
    public name=[
        '京东',
        '顺丰',
        '中通',
        '圆通',
        '申通',
        '韵达',
        '汇通',
        '天天',
        '中国邮政',
        'EMS',
        '宅急送',
        '其他']
    public weight=['2公斤以下','2-5公斤','5公斤以上']
    render(){
        
        return (
            <ScrollView>
                <StatusBar translucent ={true} backgroundColor='#1878c2'/>
                <List renderHeader={() => '您的服务需求'}>
                    {/*<InputItem
                        clear
                        placeholder="请输入账号"
                    >帐号</InputItem>*/}
                    <List.Item >
                        <TextareaItem
                        value={this.state.content}
                        onChange={(value)=>{this.setState({content:value})}}
                        style={{marginLeft:0}}
                        rows={3}
                        placeholder='请把快递领取信息完整复制此处。'
                        platform='android'
                        />
                     </List.Item >
                    <List.Item >
                        <View style={{
                            flexDirection:'row'
                        }}>
                            <Picker 
                            style={{width:'50%'}}
                            mode='dropdown'
                            selectedValue={this.state.type} 
                            onValueChange={
                                value=>this.setState({
                                    type:value
                                })
                            } 
                            >
                                {
                                    this.name.map((value,index)=>
                                        <Picker.Item key={index} label={value} value={value}/>
                                    )
                                }
                            </Picker>
                            <Picker 
                            mode='dropdown'
                            selectedValue={this.state.weight} 
                            onValueChange={
                                value=>this.setState({
                                    weight:value
                                })
                            } 
                            style={{width:'50%'}}>
                                {
                                    this.weight.map((value,index)=>
                                        <Picker.Item key={index} label={value} value={value}/>
                                    )
                                }
                            </Picker>
                        </View>
                    </List.Item>
                        {/*<List.Item style={{
                            width:'50%',
                            borderBottomWidth:0
                        }}
                        extra={<Switch value={this.state.upstairs} 
                        onValueChange={(value)=>this.setState({upstairs:value})}  />}
                        >
                            <Text>送上楼</Text>
                        </List.Item>*/}
                    <List.Item >
                        <View style={{
                            flexDirection:'row'
                        }}>
                            <View style={{
                                width:'50%',
                                justifyContent:'space-between',
                                alignItems:'center',
                                flexDirection:'row',
                                height:40
                            }}>
                                <Text style={{fontSize:16,paddingLeft:6}}>送上楼</Text>
                                <Switch value={this.state.upstairs} 
                                onValueChange={(value)=>this.setState({upstairs:value})}  />
                            </View>
                            <View style={{
                                width:'50%',
                                justifyContent:'space-between',
                                alignItems:'center',
                                flexDirection:'row',
                                height:40
                            }}>
                                <Text style={{fontSize:16,paddingLeft:6}}>代保管</Text>
                                <Switch value={this.state.care} 
                                onValueChange={(value)=>this.setState({care:value})}  />
                            </View>
                        </View>
                    </List.Item>
                    <List.Item
                        extra={
                            <DatePicker
                                date={this.state.date}
                                mode="datetime"
                                is24Hour={true}
                                minDate={minTimeString}
                                maxDate={maxTimeString}
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                customStyles={{
                                    dateIcon: {
                                        width:0,
                                        height:0
                                    },
                                    dateInput: {
                                        marginLeft: 0,
                                        borderTopWidth:0,
                                        borderLeftWidth:0,
                                        borderRightWidth:0,
                                        borderBottomWidth:0
                                    }
                                // ... You can check the source to find the other keys.
                                }}
                                onDateChange={(date) => {this.setState({date: date})}}
                            />
                        }
                    >
                    <Text style={{fontSize:16,paddingLeft:6}}>最晚完成日期</Text>
                    </List.Item>
                    <List.Item>
                        <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                            <Text style={{fontSize:16,paddingLeft:6}}>小费</Text>
                            <View style={{width:"60%",flexDirection:'row',alignItems:'center',justifyContent:'flex-end'}}>
                                <Text style={{fontSize:16}}>¥</Text>
                                <InputItem
                                    style={{flex:1}}
                                    onChange={price=>this.setState({price:price})}
                                    value={this.state.price}
                                    type="number"
                                />
                                
                            </View>
                        </View>
                    </List.Item>
                </List>
                <View style={{marginTop:10,marginLeft:18,marginRight:18,marginBottom:18}}>
                    <Button primary text={`发 布 ( ${this.state.price} 元 )`} raised onPress={this.submit}/>
                </View>
            </ScrollView>
        )
    }
}

export default Express;