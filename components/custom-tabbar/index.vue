<template>
    <view class="custom-tabbar">
      <view class="tabbar-item" 
            v-for="(item, index) in tabList" 
            :key="index"
            :class="{ active: activeTab === item.value }"
            @click="handleTabChange(item.value)">
        <view class="tabbar-icon">
          <text class="icon">{{ item.icon }}</text>
        </view>
        <view class="tabbar-text">{{ item.text }}</view>
        <view v-if="item.badgeProps && item.badgeProps.count" class="badge">
          {{ item.badgeProps.count }}
        </view>
        <view v-if="item.badgeProps && item.badgeProps.dot" class="dot"></view>
      </view>
    </view>
  </template>
  
  <script>
  export default {
    data() {
      return {
        activeTab: 'home',
        tabList: [
          {
            value: 'home',
            text: '鱼讯',
            icon: '🏠',
            badgeProps: { count: 0 }
          },
          {
            value: 'pond',
            text: '鱼塘',
            icon: '🐟',
            badgeProps: { dot: true }
          },
          {
            value: 'apps',
            text: '工具',
            icon: '🔧',
            badgeProps: { count: 'New' }
          },
          {
            value: 'profile',
            text: '我的',
            icon: '👤',
            badgeProps: { count: '···' }
          }
        ]
      }
    },
    methods: {
      handleTabChange(value) {
        this.activeTab = value
        const pageMap = {
          home: '/pages/index/index',
          pond: '/pages/pond/list',
          apps: '/pages/apps/index',
          profile: '/pages/profile/index'
        }
        uni.switchTab({
          url: pageMap[value]
        })
      }
    }
  }
  </script>
  
<style scoped>
.custom-tabbar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 999;
  background-color: #ffffff;
  border-top: 1rpx solid #e5e5e5;
  display: flex;
  height: 60px;
  padding-bottom: env(safe-area-inset-bottom);
}

.tabbar-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 8rpx 0;
}

.tabbar-icon {
  margin-bottom: 4rpx;
}

.icon {
  font-size: 40rpx;
  color: #7A7E83;
}

.tabbar-text {
  font-size: 20rpx;
  color: #7A7E83;
}

.tabbar-item.active .icon {
  color: #0052D9;
}

.tabbar-item.active .tabbar-text {
  color: #0052D9;
}

.badge {
  position: absolute;
  top: 8rpx;
  right: 20rpx;
  background-color: #ff4757;
  color: white;
  font-size: 18rpx;
  padding: 2rpx 8rpx;
  border-radius: 20rpx;
  min-width: 32rpx;
  text-align: center;
  line-height: 1.2;
}

.dot {
  position: absolute;
  top: 8rpx;
  right: 20rpx;
  width: 16rpx;
  height: 16rpx;
  background-color: #ff4757;
  border-radius: 50%;
}
</style>