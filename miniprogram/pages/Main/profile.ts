import { GetHomepageInformation } from "../../api/API"; 
import { GetTestQuestion } from "../../api/API"; 
// Page({
//   data: {
//     subjectName: "", // 题目集名称
//     subjectLogo: "", // 题目集 logo 地址
//     testScore: "", // 测试成绩
//     userRank: 0, // 用户等级
//     stars: [false, false, false, false], // 四个五角星的状态
//     subjectId: 0, // 题目集 ID
//   },

//   onLoad() {
//     const userId = wx.getStorageSync('userId'); // 获取存储的 userId
//     // if (!userId) {
//     //   console.log('用户未登录或没有 userId');
//     //   wx.showToast({
//     //     title: '用户信息未找到',
//     //     icon: 'error',
//     //     duration: 2000,
//     //   });
//     //   wx.redirectTo({
//     //     url: '/pages/login/login', // 重定向到登录页面
//     //   });
//     //   return;
//     // }

//     this.fetchHomepageInformation(userId); // 调用数据加载方法
//   },

//   fetchHomepageInformation(userId: any) {
//     GetHomepageInformation({ userId }) // 参数以对象形式传递
//       .then((response) => {
//         if (response.code === 200) {
//           const { subjectId, subjectName, subjectLogo, testScore, userRank } = response.data;

//           // 更新数据到页面
//           this.setData({
//             subjectId,
//             subjectName,
//             subjectLogo,
//             testScore,
//             userRank,
//             stars: this.generateStars(userRank), // 动态生成五角星状态
//           });

//           wx.showToast({
//             title: '加载成功',
//             icon: 'success',
//             duration: 2000,
//           });
//         } else {
//           wx.showToast({
//             title: response.msg || '加载失败',
//             icon: 'error',
//             duration: 2000,
//           });
//         }
//       })
//       .catch((error) => {
//         console.error('数据加载失败:', error);
//         wx.showToast({
//           title: '网络异常，请稍后重试',
//           icon: 'error',
//           duration: 2000,
//         });
//       });
//   },

//   generateStars(rank: number) {
//     // 动态生成四个五角星状态
//     return [1, 2, 3, 4].map((num) => num <= rank);
//   },
// });
Page({
    data: {
      // 需要的页面数据
    },
  
    // 点击题目集选择
    navigateToSubject() {
      wx.navigateTo({
        url: '/pages/Subject/profile', // 跳转到题目集选择页面
      });
    },
  
    // 点击题目集详情
    navigateToUserInformation() {
      wx.navigateTo({
        url: '/pages/UserInformation/profile', // 跳转到题目集详情页面
      });
    },
  
    // 点击开始测试
    navigateToTest() {
              // 获取用户 ID
        const userId = wx.getStorageSync('userId');
        if (userId) {
          console.log('用户 ID:', userId);
        } else {
          console.log('没有找到用户 ID');
        }

        // 获取选中的题目集合（selectedSet）
        const selectedSet = wx.getStorageSync('subject');
        if (selectedSet) {
          console.log('选中的题目集合:', selectedSet);
        } else {
          console.log('没有找到选中的题目集合');
        }
        
        GetTestQuestion({ userId, selectedSet }) // 传用户ID以及选择题目集请求题目
        .then((response) => {
          if (response.code === 200) {
            // 获取返回的题目数据
            const data = response.data;
      
            // 存储 testId 和 questions 到本地
            wx.setStorageSync('testId', data.testId); // 存储测试ID
            wx.setStorageSync('questions', data.questions); // 存储题目列表
      
            
            console.log('题目数据已存储', data.questions);
          } else {
            console.log('请求失败:', response.msg);
          }
        })
        .catch((error) => {
          console.log('请求错误:', error);
        });
        const questions = wx.getStorageSync('questions');
        if (questions[0].everytestType === 1) {
          // 跳转到选择题页面，传递题目ID
          wx.navigateTo({
            url: `/pages/choose/choose?questionNo=${questions[0].everytestNo}`
          });
        } else if (questions[0].everytestType === 0) {
          // 跳转到判断题页面，传递题目ID
          wx.navigateTo({
            url: `/pages/judge/judge?questionNo=${questions[0].everytestNo}`
          });
        }
        

    },
  
    // 点击测试记录
    navigateToTestRecord() {
      wx.navigateTo({
        url: '/pages/Record/profile', // 跳转到测试记录页面
      });
    },
  });
  