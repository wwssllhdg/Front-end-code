// 全局请求封装
const base_url = 'http://106.54.212.158:8888';

//默认导出 js里只有先导出一个模块，才能在别处使用此模块
export default (params) => {
  let url = params.url;
  //从传入的 params 对象中提取 url 属性，并将其赋值给变量 url。这个 url 是你请求的具体路径或API地址
  //{ url: '/api/user' }
  let method = params.method || "GET";//若没有传入method，则默认为GET方法
  let data = params.data || {};//如果 params 中没有提供 data，则默认使用一个空对象 {}
  let header = {};

  if (method == "POST") {
    header = {
      'content-type': 'application/json'
    };
  }

  // 获取本地token
  const token = wx.getStorageSync("token");
  if (token) {
    header['Authorization'] = 'Bearer ' + token;
  }
 //Token 通常是 服务器 在用户登录成功后发放给客户端的
 //Token 可以类比为一个 临时的用户ID
 
 
 //Promise 会接受 wx.request 的结果，并根据请求的结果调用 resolve 或 reject
 //resolve 表示操作成功   reject 表示操作失败
  return new Promise((resolve, reject) => {
    wx.request({
      url: base_url + url,
      method: method,
      header: header,
      
//通过 wx.getStorageSync("token") 获取本地存储中的 token（如果有的话）。如果 token 存在，就将 //Authorization 字段添加到 header 中，并将 token 以 Bearer <token> 的形式放在 Authorization 字段里。Bearer 是一种常用的认证方式，表示这是一个持有者令牌（即 token）。

      data: data,
      success(response) {
        const res = response.data;
        if (res.statusCode == 200) {
          resolve(res);
        } else {
          wx.clearStorageSync();//请求失败时清楚本地存储
          switch (res.statusCode) {
            case 401:  // 401 未授权，通常是token无效或过期
              wx.showModal({
                title: "提示",
                content: "请登录",
                showCancel: false,
                success(res) {
                  setTimeout(() => {
                    wx.navigateTo({
                      url: "/pages/login/index",// 跳转到登录页面
                    });
                  }, 1000);// 延时 1 秒跳转，会给用户一些提示时间
                },
              });
              break;
            case 404:
              wx.showToast({
                title: '请求地址不存在...',
                duration: 2000,
              });
              break;
            default:
              wx.showToast({
                title: '请重试...',
                duration: 2000,
              });
              break;
          }
        }
      },
      fail(err) {
        console.log(err);
        if (err.errMsg.indexOf('request:fail') !== -1) {
          wx.showToast({
            title: '网络异常',
            icon: "error",
            duration: 2000
          });
        } else {
          wx.showToast({
            title: '未知异常',
            duration: 2000
          });
        }
        reject(err);
      },
      complete() {
        wx.hideLoading();
        wx.hideToast();
      }
    });
  }).catch((e) => {});
};