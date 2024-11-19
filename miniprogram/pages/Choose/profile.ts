import { SubmitQuestionAnswer } from "../../api/API"; 
Page({
  data: {
    selectedOption: '',  // 存储当前选中的选项
    questionNo: -1,  // 当前题目的编号（根据需要调整）
    questionName: '',  // 当前题目的内容
    questionChoiceA: '',  // 选项A
    questionChoiceB: '',  // 选项B
    questionChoiceC: '',  // 选项C
    questionChoiceD: '',  // 选项D
    questionProgress: '',  // 题目进度，例如 1/10
    isFirstQuestion: false,  // 是否是第一题
    isLastQuestion: false,  // 是否是最后一题
  },
  onLoad: function (options) {
    // 如果 options.questionNo 存在，则转换为数字，否则使用默认值 -1
    const questionNo = options.questionNo ? parseInt(options.questionNo, 10) : -1;

    // 将 questionNo 存储到页面的 data 中
    this.setData({
      questionNo: questionNo,
    });
    
    console.log('接收到的题目编号:', questionNo);

        // 获取存储的题目数据
    const questions = wx.getStorageSync('questions');
    
    // 检查题目编号有效性，防止越界
    if (questions && questionNo > 0 && questionNo <= questions.length) {
      const question = questions[questionNo - 1];
      
      // 更新页面显示的题目内容和选项
      this.setData({
        questionName: question.questionName,  // 题目内容
        questionChoiceA: question.questionChoiceA,  // 选项A
        questionChoiceB: question.questionChoiceB,  // 选项B
        questionChoiceC: question.questionChoiceC,  // 选项C
        questionChoiceD: question.questionChoiceD,  // 选项D
      });
    }

    // 处理题目进度和按钮状态
    this.setData({
      questionProgress: `${questionNo}/10`,  // 显示题目进度
      isFirstQuestion: questionNo === 1,  // 是否是第一题
      isLastQuestion: questionNo === 10,  // 是否是最后一题
    });
    // //导入数据
    // const questions = wx.getStorageSync('questions');
    // questions[questionNo - 1].questionName
    // questions[questionNo - 1].questionChoiceA
    // questions[questionNo - 1].questionChoiceB
    // questions[questionNo - 1].questionChoiceC
    // questions[questionNo - 1].questionChoiceD
    
    // if(questionNo == 1){
    //   说明是第一题，没有上一题，
    // }else if(questionNo == 10){
    //   说明是最后一题，下一题直接变提交，
      
    // }
    //   questionNo 覆盖1/10 变为 questionNo/10
    
    //变题目

  },
  // 选择某个选项
  selectOption: function(e: { currentTarget: { dataset: { option: any; }; }; }) {
    const selected = e.currentTarget.dataset.option;  // 获取选中的选项（A/B/C/D）

    // 更新当前选中的选项
    this.setData({
      selectedOption: selected,  // 更新选中的选项
    });

    // 更新选项的选中效果
    this.updateSelectedOption();
  },

  // 更新选项选中效果
  updateSelectedOption: function() {
    const selectedOption = this.data.selectedOption;

    // 清除所有选项的选中状态
    const options = ['A', 'B', 'C', 'D'];
    options.forEach(option => {
      this.setData({
        [`${option}Class`]: option === selectedOption ? 'selected' : '',  // 判断当前选项是否被选中
      });
    });
  },

  // 返回按钮的点击事件
  goBack: function() {
    wx.navigateBack();  // 跳转回上一页
  },

  goPrevious: function () {
    const questions = wx.getStorageSync('questions');
    let { questionNo } = this.data;
    if (questionNo > 1) {
      questionNo -= 1;
      if(questions[questionNo+1].everytestType == 0){
        wx.navigateTo({
          url: `/pages/Judge/profile?questionNo=${questions[questionNo+1].everytestNo}`,
        });
      }else{
        wx.navigateTo({
          url: `/pages/Check/profile?questionNo=${questions[questionNo+1].everytestNo}`,
        });
      }
     
    }
  },

  // 处理下一题或提交按钮的点击事件
  goNext: function () {
    const questions = wx.getStorageSync('questions');
    let { questionNo } = this.data;
    if (questionNo < 10) {
      questionNo += 1;
      if(questions[questionNo+1].everytestType == 0){
        wx.navigateTo({
          url: `/pages/Judge/profile?questionNo=${questions[questionNo+1].everytestNo}`,
        });
      }else{
        wx.navigateTo({
          url: `/pages/Check/profile?questionNo=${questions[questionNo+1].everytestNo}`,
        });
      }
  }
},
  // 提交答案逻辑
submitAnswer: function () {
  const  testId = wx.getStorageSync('testId');
  wx.showModal({
    title: '提交确认',
    content: '确定要提交所有答案吗？',
    success: (res) => {
      if (res.confirm) {
        // 处理提交逻辑，例如发送答案到服务器
        SubmitQuestionAnswer({testId,userAnswer})
        .then((response) =>{
          if(response.code == 200){
            console.log('答案提交成功');
          }
        })
      }
    },
  });
},

  onShow: function() {
    // 页面显示时初始化已选择答案的状态
    this.updateSelectedOption();  // 更新选中效果
  },
 
});
