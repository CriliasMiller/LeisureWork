import axios from "axios"

var instance = axios.create({
    baseURL:"/api",
    timeout:2500
})
instance.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    //如果我们的使用的接口需要配置headers请求头或者body请求，可以再改部分添加
    //headers请求头:config.headers["字段名"]="字段值" + token值
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});
instance.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    //对数据进行处理,如：脱壳
    let {data} = response
    return data
    或
    return response.data;
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  });

  const get = (url,params)=>{
    return new Promise((resolve,reject)=>{
       //这里的instance与实例化axios的变量名一致
      instance.get(url,{params:data}).then(res=>{
        resolve(res)
      }).catch(err=>{
        reject(err)
      })
    })
   }