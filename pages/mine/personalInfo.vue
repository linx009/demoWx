<template>
  <view class="container">
    <!-- 页面标题 -->
    <view class="page-header">
      <text class="page-title">个人信息</text>
    </view>

    <!-- 头像区域 -->
    <view class="avatar-section">
      <view class="avatar-container">
        <image v-if="userInfo.avatarUrl" :src="userInfo.avatarUrl" class="avatar-large"></image>
        <view v-else class="avatar-placeholder-large">
          <text class="avatar-icon-large">👤</text>
        </view>
        <view class="avatar-edit" @click="changeAvatar">
          <text class="edit-icon">📷</text>
        </view>
      </view>
      <text class="avatar-tip">点击更换头像</text>
    </view>

    <!-- 个人信息表单 -->
    <view class="form-section">
      <view class="form-group">
        <text class="form-label">鱼讯号</text>
        <input class="form-input" v-model="userInfo.fishId" placeholder="请输入鱼讯号" />
      </view>
      
      <view class="form-group">
        <text class="form-label">微信号</text>
        <input class="form-input" v-model="userInfo.wechatId" placeholder="请输入微信号" />
      </view>
      
      <view class="form-group">
        <text class="form-label">名字</text>
        <input class="form-input" v-model="userInfo.nickName" placeholder="请输入名字" />
      </view>
      
      <view class="form-group">
        <text class="form-label">地址</text>
        <input class="form-input" v-model="userInfo.address" placeholder="请输入地址" />
      </view>
    </view>

    <!-- 保存按钮 -->
    <view class="save-section">
      <button class="save-btn" @click="saveUserInfo">
        <text class="btn-text">保存</text>
      </button>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// 用户信息
const userInfo = ref({
  avatarUrl: '',
  fishId: '',
  wechatId: '',
  nickName: '',
  address: ''
})

// 更换头像
const changeAvatar = () => {
  uni.chooseImage({
    count: 1,
    sizeType: ['compressed'],
    sourceType: ['album', 'camera'],
    success: (res) => {
      userInfo.value.avatarUrl = res.tempFilePaths[0]
      uni.showToast({
        title: '头像更新成功',
        icon: 'success'
      })
    },
    fail: () => {
      uni.showToast({
        title: '选择头像失败',
        icon: 'none'
      })
    }
  })
}

// 保存用户信息
const saveUserInfo = () => {
  // 验证必填字段
  if (!userInfo.value.nickName.trim()) {
    uni.showToast({
      title: '请输入名字',
      icon: 'none'
    })
    return
  }
  
  // 保存到本地存储
  uni.setStorageSync('userInfo', userInfo.value)
  
  uni.showToast({
    title: '保存成功',
    icon: 'success'
  })
  
  // 延迟返回上一页
  setTimeout(() => {
    uni.navigateBack()
  }, 1500)
}

// 页面加载时获取用户信息
onMounted(() => {
  const savedUserInfo = uni.getStorageSync('userInfo')
  if (savedUserInfo) {
    userInfo.value = { ...userInfo.value, ...savedUserInfo }
  }
})
</script>

<style>
.container {
  min-height: 100vh;
  background-color: #fbfbfb;
  padding: 20rpx;
}

/* 页面标题 */
.page-header {
  text-align: center;
  padding: 40rpx 0;
}

.page-title {
  font-size: 36rpx;
  font-weight: 600;
  color: #333333;
}

/* 头像区域 */
.avatar-section {
  text-align: center;
  margin-bottom: 60rpx;
}

.avatar-container {
  position: relative;
  display: inline-block;
  margin-bottom: 20rpx;
}

.avatar-large {
  width: 200rpx;
  height: 200rpx;
  border-radius: 50%;
  border: 4rpx solid #07c160;
}

.avatar-placeholder-large {
  width: 200rpx;
  height: 200rpx;
  border-radius: 50%;
  background: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 4rpx solid #07c160;
}

.avatar-icon-large {
  font-size: 100rpx;
  color: #999999;
}

.avatar-edit {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 60rpx;
  height: 60rpx;
  background: #07c160;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 4rpx solid #ffffff;
}

.edit-icon {
  font-size: 24rpx;
  color: white;
}

.avatar-tip {
  font-size: 24rpx;
  color: #666666;
}

/* 表单区域 */
.form-section {
  background: #ffffff;
  border-radius: 16rpx;
  padding: 40rpx;
  margin-bottom: 40rpx;
  box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.08);
  border: 1rpx solid #f0f0f0;
}

.form-group {
  margin-bottom: 40rpx;
}

.form-group:last-child {
  margin-bottom: 0;
}

.form-label {
  font-size: 28rpx;
  color: #333333;
  font-weight: 500;
  display: block;
  margin-bottom: 16rpx;
}

.form-input {
  width: 100%;
  height: 80rpx;
  background: #f8f9fa;
  border: 2rpx solid #e9ecef;
  border-radius: 8rpx;
  padding: 0 20rpx;
  font-size: 28rpx;
  color: #333333;
  box-sizing: border-box;
}

.form-input:focus {
  border-color: #07c160;
  background: #ffffff;
}

/* 保存按钮 */
.save-section {
  padding: 0 8rpx;
}

.save-btn {
  width: 100%;
  background: #07c160;
  color: white;
  border: none;
  border-radius: 8rpx;
  padding: 24rpx;
  font-size: 28rpx;
  font-weight: 600;
  box-shadow: 0 2rpx 8rpx rgba(7, 193, 96, 0.3);
  transition: all 0.3s ease;
}

.save-btn:active {
  transform: scale(0.98);
  box-shadow: 0 6rpx 20rpx rgba(7, 193, 96, 0.4);
}

.btn-text {
  color: inherit;
}

/* 响应式设计 */
@media (max-width: 750rpx) {
  .container {
    padding: 15rpx;
  }
  
  .form-section {
    padding: 30rpx;
  }
  
  .avatar-large, .avatar-placeholder-large {
    width: 160rpx;
    height: 160rpx;
  }
  
  .avatar-icon-large {
    font-size: 80rpx;
  }
}
</style>
