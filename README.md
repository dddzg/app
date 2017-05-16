# app
app 代拿快递  react-native

# 截图
![](1.gif)
# 坑位
大概是关于安卓的fetch，后台编码不对的话，会出现一些问题JSON.parse，比较谜的是远程debug模式下这个bug会消失？？可能有版本不同，处理的代码也不同。

    temp=await temp.text();//temp.json()会出bug
    if (Platform.OS === 'android') {
        temp = temp.replace(/\r?\n/g, '').replace(/[\u0080-\uFFFF]/g, ''); // If android , I've removed unwanted chars. 
    }

- [https://github.com/facebook/react-native/issues/10377](https://github.com/facebook/react-native/issues/10377)
- [https://gist.github.com/pranavrajs/66bccee3f8ba100742a1273db6f587af](https://gist.github.com/pranavrajs/66bccee3f8ba100742a1273db6f587af)
- [http://bbs.reactnative.cn/topic/183/android-%E4%B8%ADresponse-json-%E8%A7%A3%E6%9E%90%E5%BC%82%E5%B8%B8/2](http://bbs.reactnative.cn/topic/183/android-%E4%B8%ADresponse-json-%E8%A7%A3%E6%9E%90%E5%BC%82%E5%B8%B8/2)
