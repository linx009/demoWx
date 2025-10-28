<template>
  <view class="container">
    <!-- 顶部导航栏 -->
    <view class="navbar">
      <view class="nav-content">
        <view class="nav-left" @click="goBack">
          <text class="back-icon">←</text>
        </view>
        <view class="nav-center">
          <text class="nav-title">钓鱼成绩</text>
        </view>
        <view class="nav-right"></view>
      </view>
    </view>

    <!-- 成绩概览卡片 -->
    <view class="achievement-card">
      <view class="achievement-header">
        <view class="badge-list">
          <view class="badge-item" v-for="(badge, index) in badges" :key="index">
            <view class="badge-icon">{{ badge.icon }}</view>
            <text class="badge-name">{{ badge.name }}</text>
          </view>
        </view>
      </view>
      
      <view class="achievement-content">
        <view class="user-info">
          <text class="user-name">钓友小王</text>
          <text class="user-desc">钓鱼达人</text>
        </view>
        
        <view class="achievement-stats">
          <view class="stat-row">
            <text class="stat-label">坑冠次数</text>
            <text class="stat-value">10次</text>
          </view>
          <view class="stat-row">
            <text class="stat-label">单场最重（公斤）</text>
            <text class="stat-value">18.2kg</text>
          </view>
          <view class="stat-row">
            <text class="stat-label">单场最多（尾）</text>
            <text class="stat-value">12尾</text>
          </view>
          <view class="stat-row">
            <text class="stat-label">单尾最重（公斤）</text>
            <text class="stat-value">3.2kg</text>
          </view>
          <view class="stat-row">
            <text class="stat-label">总鱼数</text>
            <text class="stat-value">156条</text>
          </view>
          <view class="stat-row">
            <text class="stat-label">鱼获总量</text>
            <text class="stat-value">350斤</text>
          </view>
        </view>
      </view>
    </view>
    
    <!-- 最近成绩 -->
    <view class="recent-section">
      <view class="section-title">
        <text class="title-text">最近成绩</text>
      </view>
      <view class="recent-list">
        <view class="recent-item" v-for="(record, index) in recentRecords" :key="index">
          <view class="record-info">
            <text class="record-date">{{ record.date }}</text>
            <text class="record-pond">{{ record.pond }}</text>
          </view>
          <view class="record-stats">
            <text class="record-fish">{{ record.fish }}条</text>
            <text class="record-weight">{{ record.weight }}斤</text>
          </view>
        </view>
      </view>
    </view>
    
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// 最近成绩数据
const recentRecords = ref([
  {
    date: '2024-12-01',
    pond: '阳光钓场·1号鱼塘',
    fish: 8,
    weight: 12.5
  },
  {
    date: '2024-11-28',
    pond: '绿野钓场·2号鱼塘',
    fish: 6,
    weight: 9.8
  },
  {
    date: '2024-11-25',
    pond: '竞技钓场·比赛池',
    fish: 12,
    weight: 18.2
  }
])

// 成就徽章数据
const badges = ref([
  {
    icon: '🏆',
    name: '坑冠王'
  },
  {
    icon: '🎣',
    name: '钓鱼达人'
  },
  {
    icon: '🐟',
    name: '大鱼猎手'
  },
  {
    icon: '⭐',
    name: '新手导师'
  }
])

// 返回上一页
const goBack = () => {
  uni.navigateBack()
}

// 页面加载
onMounted(() => {
  console.log('钓鱼成绩详情页面加载')
})
</script>

<style>
.container {
  min-height: 100vh;
  background: #f5f7fa;
  padding: 20rpx 20rpx 40rpx 20rpx;
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

/* 成绩卡片 */
.achievement-card {
  background: #ffffff;
  border-radius: 24rpx;
  margin-bottom: 40rpx;
  box-shadow: 0 8rpx 32rpx rgba(0, 0, 0, 0.15);
  overflow: hidden;
  position: relative;
}

.achievement-header {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 30rpx 40rpx 20rpx;
  border-bottom: 2rpx dashed #e0e0e0;
  position: relative;
  z-index: 1;
}

.badge-list {
  display: flex;
  gap: 20rpx;
  flex-wrap: wrap;
  justify-content: center;
}

.badge-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10rpx 15rpx;
  background: #f8f9fa;
  border-radius: 8rpx;
  min-width: 80rpx;
}

.badge-icon {
  font-size: 24rpx;
  margin-bottom: 6rpx;
}

.badge-name {
  font-size: 18rpx;
  color: #333333;
  font-weight: 500;
  text-align: center;
}


.achievement-content {
  padding: 40rpx;
  position: relative;
  z-index: 1;
}

.user-info {
  text-align: center;
  margin-bottom: 40rpx;
}

.user-name {
  font-size: 48rpx;
  font-weight: 700;
  color: #333333;
  display: block;
  margin-bottom: 12rpx;
}

.user-desc {
  font-size: 28rpx;
  color: #666666;
  font-weight: 500;
}

.achievement-stats {
  background: #f8f9fa;
  border-radius: 16rpx;
  padding: 30rpx;
}

.stat-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16rpx 0;
  border-bottom: 1rpx solid #e9ecef;
}

.stat-row:last-child {
  border-bottom: none;
}

.stat-label {
  font-size: 26rpx;
  color: #666666;
  font-weight: 500;
}

.stat-value {
  font-size: 26rpx;
  color: #333333;
  font-weight: 600;
}

/* 最近成绩 */
.recent-section {
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

.recent-list {
  display: flex;
  flex-direction: column;
  gap: 20rpx;
}

.recent-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20rpx;
  background: #f8f9fa;
  border-radius: 12rpx;
}

.record-info {
  display: flex;
  flex-direction: column;
  gap: 8rpx;
}

.record-date {
  font-size: 24rpx;
  color: #666666;
  font-weight: 500;
}

.record-pond {
  font-size: 28rpx;
  color: #333333;
  font-weight: 600;
}

.record-stats {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 8rpx;
}

.record-fish {
  font-size: 24rpx;
  color: #07c160;
  font-weight: 600;
}

.record-weight {
  font-size: 24rpx;
  color: #e74c3c;
  font-weight: 600;
}


/* 响应式设计 */
@media (max-width: 750rpx) {
  .container {
    padding: 15rpx;
  }
  
  .achievement-content {
    padding: 30rpx;
  }
  
  .user-name {
    font-size: 40rpx;
  }
}
</style>
