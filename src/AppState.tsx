import {observable,computed} from 'mobx'
export default class AppState {
    @observable dzg = '123';
    @observable tel:number;
    @observable password:string;
    @observable name:string;
    
}