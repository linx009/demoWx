<template>
  <view class="container">
    <!-- 用户信息区域 -->
    <view class="user-section">
      <view v-if="!isLoggedIn" class="login-card">
        <view class="login-content">
          <view class="avatar-placeholder">
            <text class="avatar-icon">👤</text>
          </view>
          <view class="login-info">
            <text class="login-title">欢迎使用鱼讯中心</text>
            <text class="login-subtitle">登录后享受更多功能</text>
          </view>
        </view>
        <button class="login-btn" @click="handleWechatLogin">
          <text class="btn-text">微信登录</text>
        </button>
      </view>
      
      <view v-else class="user-card">
        <view class="user-info">
          <view class="user-avatar">
            <image v-if="userInfo.avatarUrl" :src="userInfo.avatarUrl" class="avatar-img"></image>
            <view v-else class="avatar-placeholder">
              <text class="avatar-icon">👤</text>
            </view>
          </view>
          <view class="user-details">
            <text class="user-name">{{ userInfo.nickName || '钓友' }}</text>
            <text class="user-id">ID: {{ userInfo.id || '000000' }}</text>
            <view class="user-status">
              <text class="status-text">已认证</text>
            </view>
          </view>
        </view>
        <view class="user-actions">
          <button class="logout-btn" @click="handleLogout">
            <text class="btn-text">退出登录</text>
          </button>
        </view>
      </view>
    </view>

    <!-- 功能菜单区域 -->
    <view class="menu-section">
      <view class="menu-group">
        <view class="menu-item" @click="navigateTo('/pages/profile/edit')">
          <view class="menu-icon">✏️</view>
          <text class="menu-text">编辑资料</text>
          <text class="menu-arrow">></text>
        </view>
        <view class="menu-item" @click="navigateTo('/pages/profile/settings')">
          <view class="menu-icon">⚙️</view>
          <text class="menu-text">设置</text>
          <text class="menu-arrow">></text>
        </view>
        <view class="menu-item" @click="navigateTo('/pages/profile/security')">
          <view class="menu-icon">🔒</view>
          <text class="menu-text">账号安全</text>
          <text class="menu-arrow">></text>
        </view>
        <view class="menu-item" @click="navigateToAuth">
          <view class="menu-icon">🆔</view>
          <text class="menu-text">身份认证</text>
          <view class="menu-right">
            <text class="auth-status" :class="authStatusClass">{{ authStatusText }}</text>
            <text class="menu-arrow">></text>
          </view>
        </view>
      </view>

      <view class="menu-group">
        <view class="menu-item" @click="navigateTo('/pages/profile/favorites')">
          <view class="menu-icon">❤️</view>
          <text class="menu-text">我的收藏</text>
          <text class="menu-arrow">></text>
        </view>
        <view class="menu-item" @click="navigateTo('/pages/profile/history')">
          <view class="menu-icon">📝</view>
          <text class="menu-text">浏览历史</text>
          <text class="menu-arrow">></text>
        </view>
        <view class="menu-item" @click="navigateTo('/pages/profile/feedback')">
          <view class="menu-icon">💬</view>
          <text class="menu-text">意见反馈</text>
          <text class="menu-arrow">></text>
        </view>
      </view>

      <view class="menu-group">
        <view class="menu-item" @click="navigateTo('/pages/profile/about')">
          <view class="menu-icon">ℹ️</view>
          <text class="menu-text">关于我们</text>
          <text class="menu-arrow">></text>
        </view>
        <view class="menu-item" @click="navigateTo('/pages/profile/help')">
          <view class="menu-icon">❓</view>
          <text class="menu-text">帮助中心</text>
          <text class="menu-arrow">></text>
        </view>
      </view>
    </view>

    <!-- 版本信息 -->
    <view class="version-info">
      <text class="version-text">鱼讯中心 v1.0.0</text>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// 用户状态
const isLoggedIn = ref(false)
const userInfo = ref({
  id: '',
  nickName: '',
  avatarUrl: '',
  openid: ''
})

// 身份认证状态
const authInfo = ref(null)
const isAuthenticated = ref(false)

// 微信登录
const handleWechatLogin = () => {
  uni.showLoading({
    title: '登录中...'
  })
  
  // 模拟微信登录流程
  setTimeout(() => {
    // 模拟获取用户信息
    const mockUserInfo = {
      id: 'wx_' + Date.now(),
      nickName: '钓友小王',
      avatarUrl: 'https://picsum.photos/100/100?random=avatar',
      openid: 'mock_openid_' + Date.now()
    }
    
    // 保存用户信息到本地存储
    uni.setStorageSync('userInfo', mockUserInfo)
    uni.setStorageSync('isLoggedIn', true)
    
    // 更新状态
    userInfo.value = mockUserInfo
    isLoggedIn.value = true
    
    uni.hideLoading()
    uni.showToast({
      title: '登录成功',
      icon: 'success'
    })
  }, 1500)
}

// 退出登录
const handleLogout = () => {
  uni.showModal({
    title: '确认退出',
    content: '确定要退出登录吗？',
    success: (res) => {
      if (res.confirm) {
        // 清除本地存储
        uni.removeStorageSync('userInfo')
        uni.removeStorageSync('isLoggedIn')
        
        // 重置状态
        userInfo.value = {
          id: '',
          nickName: '',
          avatarUrl: '',
          openid: ''
        }
        isLoggedIn.value = false
        
        uni.showToast({
          title: '已退出登录',
          icon: 'success'
        })
      }
    }
  })
}

// 身份认证状态文本
const authStatusText = computed(() => {
  return isAuthenticated.value ? '已认证' : '未认证'
})

const authStatusClass = computed(() => {
  return isAuthenticated.value ? 'auth-verified' : 'auth-unverified'
})

// 页面导航
const navigateTo = (url) => {
  uni.showToast({
    title: '功能开发中',
    icon: 'none'
  })
}

// 跳转到身份认证页面
const navigateToAuth = () => {
  if (!isLoggedIn.value) {
    uni.showToast({
      title: '请先登录',
      icon: 'none'
    })
    return
  }
  
  uni.navigateTo({
    url: '/pages/profile/auth'
  })
}

// 页面加载时检查登录状态
onMounted(() => {
  const savedUserInfo = uni.getStorageSync('userInfo')
  const savedLoginStatus = uni.getStorageSync('isLoggedIn')
  const savedAuthInfo = uni.getStorageSync('authInfo')
  
  if (savedLoginStatus && savedUserInfo) {
    isLoggedIn.value = true
    userInfo.value = savedUserInfo
  }
  
  if (savedAuthInfo && savedAuthInfo.isAuthenticated) {
    authInfo.value = savedAuthInfo
    isAuthenticated.value = true
  }
})
</script>

<style>
.container {
  min-height: 100vh;
  background-color: #fbfbfb;
  padding: 20rpx;
}

/* 用户信息区域 */
.user-section {
  margin-bottom: 30rpx;
}

.login-card, .user-card {
  background: #ffffff;
  border-radius: 16rpx;
  padding: 24rpx;
  box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.08);
  border: 1rpx solid #f0f0f0;
  margin: 8rpx;
  transition: all 0.3s ease;
}

.login-card:active, .user-card:active {
  transform: scale(0.95);
  box-shadow: 0 6rpx 20rpx rgba(0, 0, 0, 0.12);
}

.login-content {
  display: flex;
  align-items: center;
  margin-bottom: 30rpx;
}

.avatar-placeholder {
  width: 120rpx;
  height: 120rpx;
  border-radius: 50%;
  background: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 30rpx;
}

.avatar-icon {
  font-size: 60rpx;
  color: #999999;
}

.login-info {
  flex: 1;
}

.login-title {
  font-size: 32rpx;
  font-weight: 600;
  color: #333333;
  display: block;
  margin-bottom: 8rpx;
}

.login-subtitle {
  font-size: 24rpx;
  color: #666666;
}

.login-btn {
  width: 100%;
  background: #07c160;
  color: white;
  border: none;
  border-radius: 8rpx;
  padding: 24rpx;
  font-size: 28rpx;
  font-weight: 600;
}

.user-info {
  display: flex;
  align-items: center;
  margin-bottom: 30rpx;
}

.user-avatar {
  width: 120rpx;
  height: 120rpx;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 30rpx;
  border: 3rpx solid #07c160;
}

.avatar-img {
  width: 100%;
  height: 100%;
}

.user-details {
  flex: 1;
}

.user-name {
  font-size: 32rpx;
  font-weight: 600;
  color: #333333;
  display: block;
  margin-bottom: 8rpx;
}

.user-id {
  font-size: 24rpx;
  color: #666666;
  display: block;
  margin-bottom: 12rpx;
}

.user-status {
  display: inline-block;
  background: #e8f5e8;
  padding: 6rpx 12rpx;
  border-radius: 20rpx;
}

.status-text {
  font-size: 20rpx;
  color: #07c160;
  font-weight: 600;
}

.user-actions {
  display: flex;
  justify-content: center;
}

.logout-btn {
  background: #ff4757;
  color: white;
  border: none;
  border-radius: 8rpx;
  padding: 20rpx 40rpx;
  font-size: 24rpx;
}

.btn-text {
  color: inherit;
}

/* 功能菜单区域 */
.menu-section {
  margin-bottom: 30rpx;
}

.menu-group {
  background: #ffffff;
  border-radius: 16rpx;
  margin: 8rpx 0 20rpx 0;
  box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.08);
  border: 1rpx solid #f0f0f0;
  overflow: hidden;
  transition: all 0.3s ease;
}

.menu-group:active {
  transform: scale(0.98);
  box-shadow: 0 6rpx 20rpx rgba(0, 0, 0, 0.12);
}

.menu-item {
  display: flex;
  align-items: center;
  padding: 30rpx 40rpx;
  border-bottom: 1rpx solid #f0f0f0;
  transition: background-color 0.3s ease;
}

.menu-item:last-child {
  border-bottom: none;
}

.menu-item:active {
  background-color: #f8f8f8;
}

.menu-icon {
  font-size: 32rpx;
  margin-right: 24rpx;
  width: 40rpx;
  text-align: center;
}

.menu-text {
  flex: 1;
  font-size: 28rpx;
  color: #333333;
}

.menu-arrow {
  font-size: 24rpx;
  color: #999999;
  font-weight: bold;
}

.menu-right {
  display: flex;
  align-items: center;
  gap: 12rpx;
}

.auth-status {
  font-size: 22rpx;
  padding: 4rpx 8rpx;
  border-radius: 12rpx;
  font-weight: 600;
}

.auth-verified {
  background: #e8f5e8;
  color: #07c160;
}

.auth-unverified {
  background: #fff3cd;
  color: #856404;
}

/* 版本信息 */
.version-info {
  text-align: center;
  padding: 40rpx 0;
}

.version-text {
  font-size: 24rpx;
  color: #999999;
}

/* 响应式设计 */
@media (max-width: 750rpx) {
  .container {
    padding: 15rpx;
  }
  
  .login-card, .user-card {
    padding: 30rpx;
  }
  
  .menu-item {
    padding: 24rpx 30rpx;
  }
}
</style>
