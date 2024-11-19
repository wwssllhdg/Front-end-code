Page({
  data: {
    selectedSet: 'C语言题目集', // 默认选中的题目集
  },

  // 点击题目集选择
  chooseSet(e: { currentTarget: { dataset: { set: any; index: any; }; }; }) {
    const selectedSet = e.currentTarget.dataset.set;

    // 弹出确认框
    wx.showModal({
      title: '确认选择',
      content: `您确定要选择 ${selectedSet} 吗？`,
      success: (res) => {
        if (res.confirm) {
          // 如果用户确认，更新选中项
          this.setData({
            selectedSet,
          });

          // 动态添加样式
          const allItems = this.selectAllComponents('.item');
          allItems.forEach((item) => {
            item.setData({ isSelected: false }); // 先清除所有高亮
          });

          // 为当前选中项添加高亮
          const selectedItem = e.currentTarget.dataset.index;
          this.selectComponent(`#item-${selectedItem}`).setData({ isSelected: true });

          wx.showToast({
            title: `已选择 ${selectedSet}`,
            icon: 'none',
            duration: 2000,
          });
          wx.setStorageSync('subject',selectedSet );

          //设置选定题目集
          console.log("选择题目集为:",selectedSet);
        }
      },
    });
  },
  
  // 返回按钮
  goBack() {

    wx.showToast({
      title: '返回主页',
      icon: 'none',
      duration: 1500,
    });
    wx.navigateTo({ url: '/pages/Main/profile' });
    // 可实现返回主页逻辑，如 wx.navigateBack()
  },
});
