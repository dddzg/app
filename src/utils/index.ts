import { DatePickerIOSProperties } from '___React';
import {Platform} from 'react-native'
const translateToString=(obj:{}):string=>{
    const arr=Object.keys(obj);
    if (arr.length===0) return ''
    let ans='';
    ans+=`${arr[0]}=${encodeURIComponent(obj[arr[0]])}`;
    for(let i=1;i<arr.length;++i) ans+=`&${arr[i]}=${encodeURIComponent(obj[arr[i]])}`
    return ans;
}

let data={
    dzg:'123213',
    dfvds:'werwer'
}
/**
 * post
 * 默认跨域，保存cookies
 */
const post=(url:string,data:{})=>{
    return new Promise<any>((res,rej)=>{
        try{
            (async()=>{
                let temp:any=await fetch(url,{
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    method: 'POST',
                    mode: "cors",
                    credentials: 'include',
                    body:translateToString(data)
                });
                temp=await temp.text();
                if (Platform.OS === 'android') {
                    temp = temp.replace(/\r?\n/g, '').replace(/[\u0080-\uFFFF]/g, ''); // If android , I've removed unwanted chars. 
                }
                temp=JSON.parse(temp);
                res(temp);
            })();
        }catch(err){
            rej(err);
        }
    })
}

export default post
export {post}