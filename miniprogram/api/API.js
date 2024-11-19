import request from "../utils/request";


//用户登陆
export const UserLogin = (params) => {
  // 调用封装的 request 方法
  return request({
    url: '/user/login',       // 接口地址
    method: 'POST',           // 请求方法
    data: params,             // 请求参数作为一个对象传入
  });
};


//用户注册
export const UserRegister = (params) => {
    // 调用封装的 request 方法
    return request({
      url: '/user/register',       // 接口地址
      method: 'POST',           // 请求方法
      data: params,             // 请求参数作为一个对象传入
    });
  };
  

//获取用户个人信息
export const GetUserInformation = (params) => {
    // 调用封装的 request 方法
    return request({
      url: '/user/getUserInformation',       // 接口地址
      method: 'POST',           // 请求方法
      data: params,             // 请求参数作为一个对象传入
    });
  };


//更新用户个人信息
export const UpdateUserInformation = (params) => {
    // 调用封装的 request 方法
    return request({
      url: '/user/updateUserInformation',       // 接口地址
      method: 'PUT',           // 请求方法
      data: params,             // 请求参数作为一个对象传入
    });
  };


//首页信息获取
export const GetHomepageInformation = (params) => {
    // 调用封装的 request 方法
    return request({
      url: '/subject/chooseSubject',       // 接口地址
      method: 'Get',           // 请求方法
      data: params,             // 请求参数作为一个对象传入
    });
  };



//测试题目获取
export const GetTestQuestion = (params) => {
    // 调用封装的 request 方法
    return request({
      url: '/test/getQuestion',       // 接口地址
      method: 'Get',           // 请求方法
      data: params,             // 请求参数作为一个对象传入
    });
  };


//测试题目提交
export const SubmitQuestionAnswer = (params) => {
    // 调用封装的 request 方法
    return request({
      url: '/test/submitAnswer',       // 接口地址
      method: 'POST',           // 请求方法
      data: params,             // 请求参数作为一个对象传入
    });
  };


//测试成绩单展示
export const ShowTrainscript = (params) => {
    // 调用封装的 request 方法
    return request({
      url: '/test/showtranscript',       // 接口地址
      method: 'GET',           // 请求方法
      data: params,             // 请求参数作为一个对象传入
    });
  };


//测试单题展示
export const GetSingleQuestion = (params) => {
    // 调用封装的 request 方法
    return request({
      url: '/test/getquestion',       // 接口地址
      method: 'GET',           // 请求方法
      data: params,             // 请求参数作为一个对象传入
    });
  };



// 某一题目集测试记录展示
export const ShowAllTestRecord = (params) => {
    // 调用封装的 request 方法
    return request({
      url: '/test/showAllTest',       // 接口地址
      method: 'GET',           // 请求方法
      data: params,             // 请求参数作为一个对象传入
    });
  };