import React, {Component} from "react";
import {AppRegistry, StyleSheet, Text, View, Image,TouchableOpacity,ScrollView,Picker,Switch,DatePickerAndroid,StatusBar} from "react-native";
import { Icon,List,InputItem,TextareaItem } from 'antd-mobile';
import DatePicker from 'react-native-datepicker'
import {inject,observer} from 'mobx-react'
const _min=new Date();
const temp=new Date();
const _max=new Date(temp.setDate(temp.getDate()+1));
const translateTime=(time:Date)=>{
    let two=(str:number)=>str<10?'0'+str:str;
    return `${time.getFullYear()}-${two(time.getMonth()+1)}-${two(time.getDate())} ${two(time.getHours())}:${two(time.getMinutes())}`
}
const minTimeString=translateTime(_min);
const maxTimeString=translateTime(_max);
import { Button } from 'react-native-material-ui';
@inject('appState')
class Express extends Component < any, {type:string,weight:string,upstairs:boolean,care:boolean,date:string} > {
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
            date:minTimeString
        }
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
            <View>
                <List renderHeader={() => '您的服务需求'}>
                    {/*<InputItem
                        clear
                        placeholder="请输入账号"
                    >帐号</InputItem>*/}
                    <List.Item >
                        <TextareaItem
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
                </List>
                <View style={{marginTop:10,marginLeft:18,marginRight:18}}>
                    <Button primary text="发送请求" raised />
                </View>
            </View>
        )
    }
}

export default Express;