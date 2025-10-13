<template>
    <view class="custom-tabbar">
      <t-tab-bar :value="activeTab" @change="handleTabChange">
        <t-tab-bar-item
          v-for="(item, index) in tabList"
          :key="index"
          :value="item.value"
          :icon="item.icon"
          :badge-props="item.badgeProps"
        >
          {{ item.text }}
        </t-tab-bar-item>
      </t-tab-bar>
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
            text: '首页',
            icon: 'home',
            badgeProps: { count: 0 }
          },
          {
            value: 'pond',
            text: '鱼塘',
            icon: 'app',
            badgeProps: { dot: true }
          },
          {
            value: 'apps',
            text: '应用',
            icon: 'chat',
            badgeProps: { count: 'New' }
          },
          {
            value: 'profile',
            text: '我的',
            icon: 'user',
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
}
</style>