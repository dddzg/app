import {observable,computed,action} from 'mobx'
import {AsyncStorage} from 'react-native'
import {NavigationActions} from 'react-navigation'
import {get,ip} from './'
import {CardProps} from './Component/Card'
const name = ['','叫早安', '代拿快递', '课程服务', '自定义']
export default class AppState {
    @observable id:string='';
    @observable tel:string='';
    @observable password:string='';
    @observable name:string='';
    navigation:any;  
    exit = async ()=>{
        await AsyncStorage.multiRemove(['phone','pw']);
        const resetAction = NavigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({ routeName: 'Login'})
            ]
        })
        this.navigation.dispatch(resetAction);
    }  
    initData:any[]
    @observable data:CardProps[]=[]
    @action 
    getWorks=async ()=>{
        let data=await get(ip+'/order/retrieve.php',{server_openid:this.id});
        data=data.info;
        console.log(data);
        this.initData=data;
        this.data=(data as any[]).map((value,index)=>{
                return {
                    money:Math.floor(value.total_fee) ,
                    title:name[value.service_type_id],
                    content:value.service_detail,
                    school:value.user_address,
                    img:index%4+1,
                    id:value.id,
                }
            })
    }
}