<template>
  <view class="container">
    <!-- 用户信息模块 -->
    <view class="user-info-section">
      <view class="t-cell" @click="navigateToUserDetail">
        <view class="t-cell__left">
          <view class="user-avatar">
            <image v-if="userInfo.avatarUrl" :src="userInfo.avatarUrl" class="avatar-img"></image>
            <view v-else class="avatar-placeholder">
              <text class="avatar-icon">👤</text>
            </view>
          </view>
          <view class="user-details">
            <text class="user-name">{{ isLoggedIn ? (userInfo.nickName || '钓友') : '未登录用户' }}</text>
            <text class="user-id">ID: {{ isLoggedIn ? (userInfo.id || '000000') : '未登录' }}</text>
            <view class="user-status">
              <text class="status-text">{{ isLoggedIn ? '已认证' : '未认证' }}</text>
            </view>
          </view>
        </view>
        <view class="t-cell__right">
          <text class="chevron-icon">›</text>
        </view>
      </view>
    </view>

    <!-- 鱼票折叠面板 -->
    <view class="collapse-section">
      <view class="collapse-item" :class="{ active: ticketCollapseOpen }" @click="handleCollapseClick('ticket')">
        <view class="collapse-header">
          <view class="collapse-title">
            <text class="title-icon">🎫</text>
            <text class="title-text">鱼票</text>
            <text class="ticket-count">{{ isLoggedIn ? ticketCount + '张' : '0张' }}</text>
          </view>
          <text class="collapse-arrow" :class="{ active: ticketCollapseOpen }">›</text>
        </view>
        <view v-if="ticketCollapseOpen" class="collapse-content">
          <view v-if="isLoggedIn" class="ticket-list">
            <view class="ticket-item" v-for="(ticket, index) in ticketList" :key="index" @click="navigateToTicketDetail(ticket)">
              <view class="ticket-info">
                <text class="ticket-type">{{ ticket.type }}</text>
                <view class="ticket-location">
                  <text class="ticket-field">{{ ticket.fieldName }}</text>
                  <text class="ticket-separator">·</text>
                  <text class="ticket-pond">{{ ticket.pondName }}</text>
                </view>
                <text class="ticket-price">¥{{ ticket.price }}</text>
              </view>
              <text class="ticket-arrow">›</text>
            </view>
          </view>
          <view v-else class="no-data-tip">
            <text class="no-data-text">暂无鱼票数据</text>
          </view>
        </view>
      </view>
      
      <view class="collapse-item" :class="{ active: couponCollapseOpen }" @click="handleCollapseClick('coupon')">
        <view class="collapse-header">
          <view class="collapse-title">
            <text class="title-icon">🎁</text>
            <text class="title-text">优惠券</text>
            <text class="coupon-count">{{ isLoggedIn ? couponCount + '张' : '0张' }}</text>
          </view>
          <text class="collapse-arrow" :class="{ active: couponCollapseOpen }">›</text>
        </view>
        <view v-if="couponCollapseOpen" class="collapse-content">
          <view v-if="isLoggedIn" class="coupon-list">
            <view class="coupon-item" v-for="(coupon, index) in couponList" :key="index" @click="goToCouponDetail(coupon)">
              <view class="coupon-info">
                <view class="coupon-type">{{ coupon.type }}</view>
                <view class="coupon-details">
                  <text class="coupon-issuer">{{ coupon.issuerName }}</text>
                  <text class="coupon-separator">·</text>
                  <text class="coupon-pond">{{ coupon.pondName }}</text>
                </view>
                <view class="coupon-amount">{{ coupon.amount }}</view>
              </view>
            </view>
          </view>
          <view v-else class="no-data-tip">
            <text class="no-data-text">暂无优惠券数据</text>
          </view>
        </view>
      </view>
    </view>


    <!-- 购票记录模块 -->
    <view class="purchase-section">
      <view class="unified-cell" @click="goToPurchaseRecord">
        <view class="unified-cell-content">
          <text class="unified-cell-title">购票记录</text>
          <text class="chevron-icon">›</text>
        </view>
      </view>
    </view>

    <!-- 钓鱼成绩模块 -->
    <view class="achievement-section">
      <view class="unified-cell" @click="goToAchievementDetail">
        <view class="unified-cell-content">
          <text class="achievement-title">钓鱼成绩</text>
          <text class="achievement-separator">·</text>
          <text class="achievement-fish">鱼获（350斤）</text>
          <text class="achievement-separator">·</text>
          <text class="achievement-champion">坑冠（10次）</text>
          <text class="chevron-icon">›</text>
        </view>
      </view>
    </view>

    <!-- 关于坑冠大师模块 -->
    <view class="about-section">
      <view class="unified-cell" @click="goToAbout">
        <view class="unified-cell-content">
          <text class="unified-cell-title">关于坑冠大师</text>
          <text class="chevron-icon">›</text>
        </view>
      </view>
    </view>


    <!-- 账号切换弹窗 -->
    <view v-if="showAccountSwitch" class="account-switch-modal" @click="showAccountSwitch = false">
      <view class="modal-content" @click.stop>
        <view class="modal-header">
          <text class="modal-title">账号切换</text>
          <text class="modal-close" @click="showAccountSwitch = false">×</text>
        </view>
        <view class="account-list">
          <view class="account-item" :class="{ active: currentAccountType === 'wechat' }" @click="switchAccount('wechat')">
            <view class="account-icon">💬</view>
            <view class="account-info">
              <text class="account-name">微信账号</text>
              <text class="account-desc">{{ userInfo.openid || '未绑定' }}</text>
            </view>
            <view v-if="currentAccountType === 'wechat'" class="account-check">✓</view>
          </view>
          <view class="account-item" :class="{ active: currentAccountType === 'platform' }" @click="switchAccount('platform')">
            <view class="account-icon">🎣</view>
            <view class="account-info">
              <text class="account-name">平台账号</text>
              <text class="account-desc">{{ userInfo.id || '未绑定' }}</text>
            </view>
            <view v-if="currentAccountType === 'platform'" class="account-check">✓</view>
          </view>
        </view>
      </view>
    </view>

    <!-- 登录/退出登录按钮 -->
    <view class="logout-section">
      <view class="logout-btn" @click="isLoggedIn ? handleLogout() : handleLogin()">
        <text class="logout-btn-text">{{ isLoggedIn ? '退出登录' : '登录' }}</text>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'

// 用户状态
const isLoggedIn = ref(false) // 默认未登录
const userInfo = ref({
  id: '',
  nickName: '',
  avatarUrl: '',
  openid: '',
  phone: '',
  address: ''
})


// 账号切换相关
const showAccountSwitch = ref(false)
const currentAccountType = ref('wechat')

// 鱼票夹数据
const ticketCount = ref(5)
const couponCount = ref(3)

// 折叠面板状态
const ticketCollapseOpen = ref(false)
const couponCollapseOpen = ref(false)

// 鱼票列表数据
const ticketList = ref([
  {
    id: 1,
    type: '随到随钓',
    fieldName: '阳光钓场',
    pondName: '1号鱼塘',
    price: 80
  },
  {
    id: 2,
    type: '正钓',
    fieldName: '绿野钓场',
    pondName: '2号鱼塘',
    price: 120
  },
  {
    id: 3,
    type: '比赛',
    fieldName: '竞技钓场',
    pondName: '比赛池',
    price: 200
  }
])

// 优惠券列表数据
const couponList = ref([
  {
    id: 1,
    type: '打折券',
    issuerName: '阳光钓场',
    pondName: '1号鱼塘',
    amount: '8折'
  },
  {
    id: 2,
    type: '现金券',
    issuerName: '绿野钓场',
    pondName: '2号鱼塘',
    amount: '20元'
  },
  {
    id: 3,
    type: '现金券',
    issuerName: '竞技钓场',
    pondName: '比赛池',
    amount: '50元'
  }
])


// 钓鱼成绩数据
const fishingCount = ref(28)
const biggestFish = ref(3.2)
const totalFish = ref(156)
const championCount = ref(5)
const hasSingleFish = ref(true) // 是否有单尾记录

// 自动登录检查
const checkAutoLogin = () => {
  // 检查本地存储中是否有用户信息
  const savedUserInfo = uni.getStorageSync('userInfo')
  const savedLoginStatus = uni.getStorageSync('isLoggedIn')
  
  if (savedUserInfo && savedLoginStatus) {
    // 如果有保存的用户信息，自动登录
    userInfo.value = savedUserInfo
    isLoggedIn.value = true
    console.log('自动登录成功')
  } else {
    // 如果没有保存的用户信息，设置为未登录状态
    isLoggedIn.value = false
    userInfo.value = {
      id: '',
      nickName: '',
      avatarUrl: '',
      openid: '',
      phone: '',
      address: ''
    }
    console.log('用户未登录')
  }
}

// 登录函数
const handleLogin = () => {
  uni.showLoading({
    title: '登录中...'
  })
  
  // 模拟登录流程
  setTimeout(() => {
    // 模拟获取用户信息
    const mockUserInfo = {
      id: 'wx_' + Date.now(),
      nickName: '钓友小王',
      avatarUrl: 'https://picsum.photos/100/100?random=avatar',
      openid: 'mock_openid_' + Date.now(),
      phone: '',
      address: ''
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


// 跳转到用户详情页面
const navigateToUserDetail = () => {
  if (!isLoggedIn.value) {
    uni.showToast({
      title: '请先登录',
      icon: 'none'
    })
    return
  }
  
  // 关闭所有折叠面板
  closeAllCollapsePanels()
  uni.navigateTo({
    url: '/pages/mine/personalInfo'
  })
}

// 页面导航
const navigateTo = (url) => {
  uni.showToast({
    title: '功能开发中',
    icon: 'none'
  })
}


// 账号切换
const switchAccount = (accountType) => {
  currentAccountType.value = accountType
  showAccountSwitch.value = false
  
  uni.showToast({
    title: `已切换到${accountType === 'wechat' ? '微信' : '平台'}账号`,
    icon: 'success'
  })
}

// 折叠面板控制
const toggleTicketCollapse = () => {
  ticketCollapseOpen.value = !ticketCollapseOpen.value
}

const toggleCouponCollapse = () => {
  couponCollapseOpen.value = !couponCollapseOpen.value
}

// 处理折叠面板点击
const handleCollapseClick = (type) => {
  if (!isLoggedIn.value) {
    uni.showToast({
      title: '请先登录',
      icon: 'none'
    })
    return
  }
  
  if (type === 'ticket') {
    // 如果鱼票面板已打开，则关闭；否则打开并关闭优惠券面板
    if (ticketCollapseOpen.value) {
      ticketCollapseOpen.value = false
    } else {
      ticketCollapseOpen.value = true
      couponCollapseOpen.value = false
    }
  } else if (type === 'coupon') {
    // 如果优惠券面板已打开，则关闭；否则打开并关闭鱼票面板
    if (couponCollapseOpen.value) {
      couponCollapseOpen.value = false
    } else {
      couponCollapseOpen.value = true
      ticketCollapseOpen.value = false
    }
  }
}

// 关闭所有折叠面板
const closeAllCollapsePanels = () => {
  ticketCollapseOpen.value = false
  couponCollapseOpen.value = false
}

// 处理钓鱼成绩点击
const handleAchievementClick = () => {
  if (!isLoggedIn.value) {
    uni.showToast({
      title: '请先登录',
      icon: 'none'
    })
    return
  }
  
  navigateToAchievements()
}

// 鱼票详情导航
const navigateToTicketDetail = (ticket) => {
  uni.navigateTo({
    url: `/pages/ticket/detail?id=${ticket.id}&type=${ticket.type}&fieldName=${ticket.fieldName}&pondName=${ticket.pondName}&price=${ticket.price}`
  })
}

// 优惠券详情导航
const goToCouponDetail = (coupon) => {
  uni.navigateTo({
    url: `/pages/coupon/detail?issuerName=${encodeURIComponent(coupon.issuerName)}&pondName=${encodeURIComponent(coupon.pondName)}&amount=${encodeURIComponent(coupon.amount)}&type=${encodeURIComponent(coupon.type)}`
  })
}

// 钓鱼成绩详情导航
const goToAchievementDetail = () => {
  // 关闭所有折叠面板
  closeAllCollapsePanels()
  uni.navigateTo({
    url: '/pages/achievement/detail'
  })
}

// 购票记录导航
const goToPurchaseRecord = () => {
  // 关闭所有折叠面板
  closeAllCollapsePanels()
  uni.navigateTo({
    url: '/pages/purchaseRecord/index'
  })
}

// 关于坑冠大师导航
const goToAbout = () => {
  // 关闭所有折叠面板
  closeAllCollapsePanels()
  uni.navigateTo({
    url: '/pages/about/index'
  })
}


// 钓鱼成绩相关导航
const navigateToAchievements = () => {
  uni.showToast({
    title: '钓鱼成绩功能开发中',
    icon: 'none'
  })
}

// 页面加载时检查登录状态
onMounted(() => {
  checkAutoLogin()
})
</script>

<style>
.container {
  min-height: 100vh;
  background-color: #fbfbfb;
  padding: 20rpx;
  width: 100%;
  box-sizing: border-box;
  overflow-x: hidden;
}

/* 用户信息区域 */
.user-info-section {
  margin-bottom: 30rpx;
  width: 100%;
  box-sizing: border-box;
}

.user-card {
  background: #ffffff;
  border-radius: 16rpx;
  padding: 24rpx;
  border: 1rpx solid #f0f0f0;
  margin: 8rpx;
  transition: all 0.3s ease;
}

.user-card:active {
  background-color: #f8f8f8;
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

/* TDesign Cell 组件样式 */
.t-cell {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 40rpx;
  background: #ffffff;
  border-radius: 16rpx;
  border: 1rpx solid #f0f0f0;
  transition: all 0.3s ease;
  min-height: 280rpx;
}

.t-cell:active {
  background-color: #f8f8f8;
}

.t-cell__left {
  display: flex;
  align-items: center;
  flex: 1;
}

.t-cell__right {
  display: flex;
  align-items: center;
  margin-left: 20rpx;
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
  margin-left: 20rpx;
}

.user-name {
  font-size: 32rpx;
  font-weight: 600;
  color: #333333;
  display: block;
  margin-bottom: 12rpx;
}

.user-id {
  font-size: 24rpx;
  color: #666666;
  display: block;
  margin-bottom: 16rpx;
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



/* 退出登录区域 */
.logout-section {
  margin-bottom: 30rpx;
  display: flex;
  justify-content: center;
  width: 100%;
  box-sizing: border-box;
}

.logout-btn {
  background: #07c160;
  border-radius: 20rpx;
  padding: 18rpx 60rpx;
  box-shadow: 0 4rpx 12rpx rgba(7, 193, 96, 0.3);
  transition: all 0.3s ease;
}

.logout-btn:active {
  transform: translateY(2rpx);
  box-shadow: 0 2rpx 8rpx rgba(7, 193, 96, 0.4);
}

.logout-btn-text {
  font-size: 28rpx;
  color: #ffffff;
  font-weight: 600;
}


/* 统一单元格样式 */
.unified-cell {
  background: #ffffff;
  border-radius: 16rpx;
  border: 1rpx solid #f0f0f0;
  overflow: hidden;
  transition: all 0.3s ease;
  margin-bottom: 5rpx;
  width: 100%;
}

.unified-cell:active {
  background-color: #f8f8f8;
}

.unified-cell-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 30rpx;
  gap: 8rpx;
  min-height: 80rpx;
}

.unified-cell-title {
  font-size: 30rpx;
  color: #333333;
  font-weight: 500;
  white-space: nowrap;
}

/* 模块间距 */
.purchase-section, .achievement-section, .about-section {
  margin-bottom: 5rpx;
  width: 100%;
  box-sizing: border-box;
}

/* 鱼票夹模块 */
.collapse-section {
  margin-bottom: 5rpx;
  width: 100%;
  box-sizing: border-box;
}

.collapse-item {
  background: #ffffff;
  border-radius: 16rpx;
  margin-bottom: 5rpx;
  border: 1rpx solid #f0f0f0;
  overflow: hidden;
  transition: all 0.3s ease;
  width: 100%;
}

.collapse-item:active {
  background-color: #f8f8f8;
}

.collapse-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 30rpx;
  border-bottom: 1rpx solid #f0f0f0;
  min-height: 80rpx;
}

.collapse-title {
  display: flex;
  align-items: center;
  flex: 1;
}

.title-icon {
  font-size: 32rpx;
  margin-right: 16rpx;
}

.title-text {
  font-size: 30rpx;
  color: #333333;
  font-weight: 500;
  margin-right: 16rpx;
}

.ticket-count, .coupon-count {
  font-size: 24rpx;
  color: #07c160;
  font-weight: 600;
  padding: 4rpx 12rpx;
  border-radius: 12rpx;
}

.collapse-arrow {
  font-size: 32rpx;
  color: #999999;
  font-weight: bold;
  transition: transform 0.3s ease;
}

.collapse-arrow.active {
  transform: rotate(90deg);
}

.collapse-content {
  padding: 0 30rpx 30rpx;
}

.ticket-list, .coupon-list {
  padding-top: 20rpx;
}

.ticket-item, .coupon-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 30rpx;
  border-bottom: 1rpx solid #d9d9d9;
  transition: background-color 0.3s ease;
  min-height: 80rpx;
}

.ticket-item:last-child, .coupon-item:last-child {
  border-bottom: none;
}

.ticket-item:active {
  background-color: #f8f8f8;
  border-radius: 8rpx;
  margin: 0 -10rpx;
  padding: 30rpx 20rpx;
}

.ticket-info, .coupon-info {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16rpx;
}

.ticket-type {
  font-size: 24rpx;
  color: #07c160;
  font-weight: 500;
  white-space: nowrap;
}

.ticket-field {
  font-size: 32rpx;
  color: #333333;
  font-weight: 600;
  white-space: nowrap;
}

.ticket-location {
  display: flex;
  align-items: center;
  flex: 1;
  gap: 8rpx;
}

.ticket-separator {
  font-size: 24rpx;
  color: #999999;
  font-weight: bold;
  margin: 0 8rpx;
}

.ticket-pond {
  font-size: 24rpx;
  color: #666666;
}

/* 优惠券样式 */
.coupon-type {
  font-size: 24rpx;
  color: #07c160;
  font-weight: 500;
  white-space: nowrap;
}

.coupon-details {
  display: flex;
  align-items: center;
  flex: 1;
  gap: 8rpx;
  margin-left: 16rpx;
}

.coupon-issuer {
  font-size: 32rpx;
  color: #333333;
  font-weight: 600;
  white-space: nowrap;
}

.coupon-separator {
  font-size: 24rpx;
  color: #999999;
  font-weight: bold;
  margin: 0 8rpx;
}

.coupon-pond {
  font-size: 24rpx;
  color: #666666;
  white-space: nowrap;
}

.coupon-amount {
  font-size: 32rpx;
  color: #e74c3c;
  font-weight: 700;
  white-space: nowrap;
}

.ticket-price {
  font-size: 28rpx;
  color: #ff4757;
  font-weight: 600;
  white-space: nowrap;
}

.ticket-arrow {
  font-size: 36rpx;
  color: #999999;
  margin-left: 16rpx;
  font-weight: bold;
}

.coupon-name {
  font-size: 26rpx;
  color: #333333;
  font-weight: 500;
  display: block;
  margin-bottom: 8rpx;
}

.coupon-desc {
  font-size: 22rpx;
  color: #666666;
  display: block;
  margin-bottom: 8rpx;
}

.coupon-expire {
  font-size: 20rpx;
  color: #999999;
}

/* 空数据提示样式 */
.no-data-tip {
  padding: 40rpx 20rpx;
  text-align: center;
}

.no-data-text {
  font-size: 26rpx;
  color: #999999;
}



.achievement-list {
  background: #ffffff;
  border-radius: 16rpx;
  border: 1rpx solid #f0f0f0;
  overflow: hidden;
}


.achievement-title {
  font-size: 30rpx;
  color: #333333;
  font-weight: 500;
  white-space: nowrap;
}

.achievement-fish {
  font-size: 28rpx;
  color: #07c160;
  font-weight: 600;
  white-space: nowrap;
}

.achievement-separator {
  font-size: 24rpx;
  color: #999999;
  font-weight: bold;
  margin: 0 4rpx;
}

.achievement-champion {
  font-size: 28rpx;
  color: #07c160;
  font-weight: 600;
  white-space: nowrap;
}

.chevron-icon {
  font-size: 32rpx;
  color: #999999;
  font-weight: bold;
  margin-left: auto;
}

/* 账号切换弹窗 */
.account-switch-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: #ffffff;
  border-radius: 16rpx;
  width: 600rpx;
  max-height: 80vh;
  overflow: hidden;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30rpx;
  border-bottom: 1rpx solid #f0f0f0;
}

.modal-title {
  font-size: 32rpx;
  font-weight: 600;
  color: #333333;
}

.modal-close {
  font-size: 40rpx;
  color: #999999;
  padding: 10rpx;
}

.account-list {
  padding: 20rpx 0;
}

.account-item {
  display: flex;
  align-items: center;
  padding: 30rpx;
  transition: background-color 0.3s ease;
}

.account-item:active {
  background-color: #f8f8f8;
}

.account-item.active {
  background-color: #e8f5e8;
}

.account-icon {
  font-size: 32rpx;
  margin-right: 20rpx;
  width: 40rpx;
  text-align: center;
}

.account-info {
  flex: 1;
}

.account-name {
  font-size: 28rpx;
  color: #333333;
  font-weight: 500;
  display: block;
  margin-bottom: 4rpx;
}

.account-desc {
  font-size: 22rpx;
  color: #666666;
}

.account-check {
  font-size: 24rpx;
  color: #07c160;
  font-weight: bold;
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
  
  .ticket-cards {
    flex-direction: column;
  }
  
}
</style>
