<template>
  <view class="container">
    <!-- 顶部导航栏 -->
    <view class="navbar">
      <view class="nav-content">
        <view class="nav-left" @click="goBack">
          <text class="back-icon">←</text>
        </view>
        <view class="nav-center">
          <text class="nav-title">优惠券</text>
        </view>
        <view class="nav-right"></view>
      </view>
    </view>

    <!-- 优惠券卡片 -->
    <view class="coupon-card">
      <!-- 优惠券头部 -->
      <view class="coupon-header">
        <view class="coupon-logo">
          <text class="logo-text">鱼讯</text>
        </view>
        <view class="coupon-type-badge">
          <text class="type-text">{{ couponInfo.type }}</text>
        </view>
      </view>
      
      <!-- 优惠券内容 -->
      <view class="coupon-content">
        <view class="field-info">
          <text class="field-name">{{ couponInfo.issuerName }}</text>
          <text class="pond-name">{{ couponInfo.pondName }}</text>
        </view>
        
        <view class="coupon-details">
          <view class="detail-row">
            <text class="detail-label">优惠额度</text>
            <view class="amount-info">
              <text class="detail-value amount">{{ couponInfo.amount }}</text>
              <text class="original-price">原价¥{{ couponInfo.originalPrice }}</text>
            </view>
          </view>
          <view class="detail-row">
            <text class="detail-label">获得时间</text>
            <text class="detail-value">{{ couponInfo.getTime }}</text>
          </view>
          <view class="detail-row">
            <text class="detail-label">优惠券编号</text>
            <text class="detail-value">{{ couponInfo.couponNo }}</text>
          </view>
          <view class="detail-row">
            <text class="detail-label">发券人</text>
            <text class="detail-value">{{ couponInfo.issuerName }}</text>
          </view>
          <view class="detail-row">
            <text class="detail-label">使用限制</text>
            <text class="detail-value">{{ couponInfo.userLimit }}</text>
          </view>
        </view>
        
      </view>
      
    </view>
    
    <!-- 使用说明 -->
    <view class="usage-section">
      <view class="section-title">
        <text class="title-text">使用说明</text>
      </view>
      <view class="usage-list">
        <view class="usage-item">
          <text class="usage-icon">1</text>
          <text class="usage-text">本券仅限指定钓场和鱼塘使用</text>
        </view>
        <view class="usage-item">
          <text class="usage-icon">2</text>
          <text class="usage-text">请在有效期内使用，过期作废</text>
        </view>
        <view class="usage-item">
          <text class="usage-icon">3</text>
          <text class="usage-text">使用时请出示二维码供工作人员验证</text>
        </view>
        <view class="usage-item">
          <text class="usage-icon">4</text>
          <text class="usage-text">本券不可转让，不可退换</text>
        </view>
      </view>
    </view>
    
    <!-- 固定底部操作按钮 -->
    <view class="fixed-action-buttons">
      <button class="action-btn primary" @click="useCoupon">立即使用</button>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// 优惠券信息
const couponInfo = ref({
  type: '打折券',
  issuerName: '阳光钓场',
  pondName: '1号鱼塘',
  amount: '8折',
  originalPrice: 100,
  validDate: '2024-12-31',
  useTime: '08:00-18:00',
  issuerName: '阳光钓场',
  getTime: '2024-12-01 14:30',
  phone: '138-0000-0000',
  couponNo: 'YXYG202412011234',
  issueDate: '2024-12-01',
  userLimit: '持券人'
})

// 生成优惠券编号
const generateCouponNo = (date) => {
  const dateStr = date.replace(/-/g, '')
  const randomNum = Math.floor(Math.random() * 9000) + 1000
  return `YXYG${dateStr}${randomNum}`
}

// 返回上一页
const goBack = () => {
  uni.navigateBack()
}

// 使用优惠券
const useCoupon = () => {
  uni.showModal({
    title: '确认使用',
    content: '确定要使用这张优惠券吗？',
    success: (res) => {
      if (res.confirm) {
        uni.showToast({
          title: '优惠券使用成功',
          icon: 'success'
        })
      }
    }
  })
}

// 页面加载
onMounted(() => {
  // 获取页面参数
  const pages = getCurrentPages()
  const currentPage = pages[pages.length - 1]
  const options = currentPage.options
  
  console.log('优惠券详情页面加载，接收参数:', options)
  
  // 根据传入参数更新优惠券信息
  if (options.issuerName) {
    couponInfo.value.issuerName = decodeURIComponent(options.issuerName)
  }
  if (options.pondName) {
    couponInfo.value.pondName = decodeURIComponent(options.pondName)
  }
  if (options.amount) {
    couponInfo.value.amount = decodeURIComponent(options.amount)
  }
  if (options.type) {
    couponInfo.value.type = decodeURIComponent(options.type)
  }
  
  // 生成优惠券编号
  const today = new Date()
  const dateStr = today.getFullYear() + 
    String(today.getMonth() + 1).padStart(2, '0') + 
    String(today.getDate()).padStart(2, '0')
  
  couponInfo.value.couponNo = generateCouponNo(dateStr)
  couponInfo.value.getTime = today.getFullYear() + '-' + 
    String(today.getMonth() + 1).padStart(2, '0') + '-' + 
    String(today.getDate()).padStart(2, '0') + ' ' + 
    String(today.getHours()).padStart(2, '0') + ':' + 
    String(today.getMinutes()).padStart(2, '0')
})
</script>

<style>
.container {
  min-height: 100vh;
  background: #f5f7fa;
  padding: 20rpx 20rpx 120rpx 20rpx;
}

/* 导航栏样式 */
.navbar {
  background: #fbfbfb;
  border-bottom: 1rpx solid #e5e5e5;
  padding: 0;
  position: sticky;
  top: 0;
  z-index: 100;
  height: 200rpx;
  display: flex;
  align-items: flex-end;
  margin: -20rpx -20rpx 20rpx -20rpx;
}

.nav-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20rpx 30rpx;
  width: 100%;
}

.nav-left {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80rpx;
  height: 80rpx;
}

.back-icon {
  font-size: 40rpx;
  color: #333;
}

.nav-center {
  flex: 1;
  text-align: center;
}

.nav-title {
  font-size: 40rpx;
  font-weight: 600;
  color: #e74c3c;
}

.nav-right {
  width: 80rpx;
  height: 80rpx;
}

/* 优惠券卡片 */
.coupon-card {
  background: #ffffff;
  border-radius: 24rpx;
  margin-bottom: 40rpx;
  box-shadow: 0 8rpx 32rpx rgba(0, 0, 0, 0.15);
  overflow: hidden;
  position: relative;
}

/* 优惠券头部 */
.coupon-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 40rpx 40rpx 20rpx;
  border-bottom: 2rpx dashed #e0e0e0;
  position: relative;
  z-index: 1;
}

.coupon-logo {
  display: flex;
  align-items: center;
}

.logo-text {
  font-size: 36rpx;
  font-weight: 700;
  color: #07c160;
  background: linear-gradient(45deg, #07c160, #05a050);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.coupon-type-badge {
  background: transparent;
  padding: 12rpx 0;
}

.type-text {
  font-size: 24rpx;
  color: #07c160;
  font-weight: 600;
}

/* 优惠券内容 */
.coupon-content {
  padding: 40rpx;
  position: relative;
  z-index: 1;
}

.field-info {
  text-align: center;
  margin-bottom: 40rpx;
}

.field-name {
  font-size: 48rpx;
  font-weight: 700;
  color: #333333;
  display: block;
  margin-bottom: 12rpx;
}

.pond-name {
  font-size: 28rpx;
  color: #666666;
  font-weight: 500;
}

.coupon-details {
  background: #f8f9fa;
  border-radius: 16rpx;
  padding: 30rpx;
  margin-bottom: 40rpx;
}

.detail-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16rpx 0;
  border-bottom: 1rpx solid #e9ecef;
}

.detail-row:last-child {
  border-bottom: none;
}

.detail-label {
  font-size: 26rpx;
  color: #666666;
  font-weight: 500;
}

.detail-value {
  font-size: 26rpx;
  color: #333333;
  font-weight: 600;
}

.amount {
  font-size: 32rpx;
  color: #ff4757;
  font-weight: 700;
}

.amount-info {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 4rpx;
}

.original-price {
  font-size: 20rpx;
  color: #07c160;
  font-weight: 500;
}

/* 使用说明 */
.usage-section {
  background: #ffffff;
  border-radius: 16rpx;
  padding: 30rpx;
  margin-bottom: 40rpx;
  box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.08);
}

.section-title {
  margin-bottom: 30rpx;
}

.title-text {
  font-size: 32rpx;
  font-weight: 600;
  color: #333333;
}

.usage-list {
  display: flex;
  flex-direction: column;
  gap: 20rpx;
}

.usage-item {
  display: flex;
  align-items: flex-start;
  gap: 16rpx;
}

.usage-icon {
  width: 40rpx;
  height: 40rpx;
  background: #07c160;
  color: #ffffff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22rpx;
  font-weight: 600;
  flex-shrink: 0;
}

.usage-text {
  font-size: 26rpx;
  color: #666666;
  line-height: 1.5;
  flex: 1;
}

/* 固定底部操作按钮 */
.fixed-action-buttons {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: #ffffff;
  padding: 20rpx 30rpx;
  box-shadow: 0 -2rpx 10rpx rgba(0, 0, 0, 0.1);
  z-index: 1000;
  display: flex;
  justify-content: center;
}

.action-btn {
  width: 300rpx;
  height: 88rpx;
  border-radius: 12rpx;
  font-size: 28rpx;
  font-weight: 600;
  border: none;
  transition: all 0.3s ease;
}

.action-btn.primary {
  background: linear-gradient(135deg, #07c160, #05a050);
  color: #ffffff;
  box-shadow: 0 4rpx 16rpx rgba(7, 193, 96, 0.3);
}

.action-btn.primary:active {
  transform: scale(0.98);
  box-shadow: 0 6rpx 20rpx rgba(7, 193, 96, 0.4);
}

.action-btn.secondary {
  background: #ffffff;
  color: #07c160;
  border: 2rpx solid #07c160;
}

.action-btn.secondary:active {
  background: #f0f9f4;
}

/* 响应式设计 */
@media (max-width: 750rpx) {
  .container {
    padding: 15rpx;
  }
  
  .coupon-content {
    padding: 30rpx;
  }
  
  .field-name {
    font-size: 40rpx;
  }
  
  .qr-code {
    width: 160rpx;
    height: 160rpx;
  }
}
</style>
