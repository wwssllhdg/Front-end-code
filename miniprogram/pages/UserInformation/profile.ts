import { GetUserInformation } from '../../api/API.js';
import { UpdateUserInformation } from '../../api/API.js';
Page({
  data: {
    selectedGender: 'male', // 默认选中男
    nickname: '繁华',
    birthdate: '2004-07-09',
    signature: '不论失败还是成功，都是系于自我',
    school: '浙大城市学院',
  },

  // 选择性别
  chooseGender(e: { currentTarget: { dataset: { gender: any; }; }; }) {
    const selectedGender = e.currentTarget.dataset.gender;
    this.setData({
      selectedGender: selectedGender,
    });
  },

  // 更新输入框中的昵称
  onNicknameChange(e: { detail: { value: any; }; }) {
    this.setData({
      nickname: e.detail.value,
    });
  },

  // 更新生日
  onBirthdateChange(e: { detail: { value: any; }; }) {
    this.setData({
      birthdate: e.detail.value,
    });
  },

  // 更新签名
  onSignatureChange(e: { detail: { value: any; }; }) {
    this.setData({
      signature: e.detail.value,
    });
  },

  // 更新学校
  onSchoolChange(e: { detail: { value: any; }; }) {
    this.setData({
      school: e.detail.value,
    });
  },
  return(e: { detail: { value: any; }; }) {
    wx.switchTab({
      url: '/pages/Main/profile',
    });
  },
  // 保存个人资料
  saveProfile() {
    const { nickname, selectedGender, birthdate, signature, school } = this.data;
    

      // 验证昵称：长度 5-10 个字符
  const nicknameRegex = /^[A-Za-z0-9\u4e00-\u9fa5]{5,10}$/;  // 字母、数字、汉字，长度 5-10
  if (!nicknameRegex.test(nickname)) {
    console.log('昵称必须为 5-10 个字符，且只支持字母、数字、汉字');
    return;
  }

  // 验证生日：格式为 YYYY-MM-DD
  const birthdateRegex = /^\d{4}-\d{2}-\d{2}$/;  // 格式为 YYYY-MM-DD
  if (!birthdateRegex.test(birthdate)) {
    console.log('生日格式必须为 YYYY-MM-DD');
    return;
  }

  // 验证签名：长度不超过 50 个字符
  if (signature.length > 50) {
    console.log('签名不能超过 50 个字符');
    return;
  }

  // 验证学校：长度不超过 50 个字符
  if (school.length > 50) {
    console.log('学校名称不能超过 50 个字符');
    return;
  }

  // 如果所有验证都通过，输出数据
  console.log('昵称:', nickname);
  console.log('性别:', selectedGender);
  console.log('生日:', birthdate);
  console.log('签名:', signature);
  console.log('学校:', school);
  UpdateUserInformation({nickname,selectedGender,birthdate,signature,school})
  .then((response) => {
    if (response.code === 200) {    
      wx.showToast({
        title: '更新成功',
        icon: 'success',
        duration: 2000,
      });

      // 跳转到首页
      wx.switchTab({
        url: '/pages/Main/profile',
      });
    } else {
      wx.showToast({
        title: response.msg || '更新失败',
        icon: 'error',
        duration: 2000,
      });
    }
  })
  .catch((error) => {
    console.error('更新失败:', error);
    wx.showToast({
      title: '网络异常，请稍后重试',
      icon: 'error',
      duration: 2000,
    });
  });
},


  // 页面初始化时可以获取用户资料
  onLoad() {
    const userId = wx.getStorageSync('userId'); // 获取存储的 userId
    if (!userId) {
      console.log('用户未登录或没有 userId');
      wx.showToast({
        title: '用户信息未找到',
        icon: 'error',
      });
      return;
    }
    // 假设从后端获取用户资料
   GetUserInformation({userId}) // 参数以对象形式传递
   .then((response) => {
    if (response.statusCode === 200 && response.data.code === 200) {
      const userProfile = response.data.data;  // 获取后端返回的用户资料
      
      // 更新页面数据
      this.setData({
        nickname: userProfile.userNickname,
        selectedGender: userProfile.userSex === 1 ? 'male' : 'female',  // 映射性别
        birthdate: userProfile.userBirthday,
        signature: userProfile.userSignature,
        school: userProfile.userSchool,
      });
      console.log('用户资料:', userProfile);
     } else {
       wx.showToast({
         title: response.msg || '访问失败',
         icon: 'error',
         duration: 2000,
       });
     }
   })
   .catch((error) => {
     console.error('访问失败:', error);
     wx.showToast({
       title: '网络异常，请稍后重试',
       icon: 'error',
       duration: 2000,
     });
   });
  }
});
