import {observable,computed} from 'mobx'
export default class AppState {
    @observable id:string='';
    @observable tel:string='';
    @observable password:string='';
    @observable name:string='';
    
}