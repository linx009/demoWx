<template>
  <view class="container">
    <view class="card p-3">
      <view class="text-center">
        <text class="text-primary" style="font-size: 48rpx; font-weight: bold;">鱼塘列表</text>
      </view>
      <view class="mt-3">
        <text class="text-secondary">这里是鱼塘列表页面</text>
      </view>
    </view>
  </view>
</template>

<script setup>

</script>

<style>
.container {
  min-height: 100vh;
  background-color: #f7f7f7;
  padding: 20rpx;
}

.card {
  background: #ffffff;
  border-radius: 12rpx;
  box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.1);
  border: 1rpx solid #e5e5e5;
}

.text-center {
  text-align: center;
}

.text-primary {
  color: #07c160;
}

.text-secondary {
  color: #666666;
}

.mt-3 {
  margin-top: 48rpx;
}

.p-3 {
  padding: 48rpx;
}
</style>
