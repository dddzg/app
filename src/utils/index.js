var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Platform } from 'react-native';
const translateToString = (obj) => {
    const arr = Object.keys(obj);
    if (arr.length === 0)
        return '';
    let ans = '';
    ans += `${arr[0]}=${encodeURIComponent(obj[arr[0]])}`;
    for (let i = 1; i < arr.length; ++i)
        ans += `&${arr[i]}=${encodeURIComponent(obj[arr[i]])}`;
    return ans;
};
let data = {
    dzg: '123213',
    dfvds: 'werwer'
};
/**
 * post
 * 默认跨域，保存cookies
 */
const post = (url, data) => {
    return new Promise((res, rej) => {
        try {
            (() => __awaiter(this, void 0, void 0, function* () {
                let temp = yield fetch(url, {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    method: 'POST',
                    mode: "cors",
                    credentials: 'include',
                    body: translateToString(data)
                });
                temp = yield temp.text();
                if (Platform.OS === 'android') {
                    temp = temp.replace(/\r?\n/g, '').replace(/[\u0080-\uFFFF]/g, ''); // If android , I've removed unwanted chars. 
                }
                temp = JSON.parse(temp);
                res(temp);
            }))();
        }
        catch (err) {
            rej(err);
        }
    });
};
export default post;
export { post };
