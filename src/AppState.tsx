import {observable,computed} from 'mobx'
import {AsyncStorage} from 'react-native'
import {NavigationActions} from 'react-navigation'
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
}