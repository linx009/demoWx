<template>
	<view class="container">
    <!-- 宫格功能（内置实现，保证三列与可点击） -->
    <view class="grid-container">
      <view class="grid-item" v-for="item in gridItems" :key="item.id" @click="handleGridClick(item)">
        <view class="grid-icon">
          <text class="icon">{{ item.icon }}</text>
        </view>
        <text class="grid-title">{{ item.title }}</text>
      </view>
    </view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			gridItems: [
				{ id: 1, title: '钓场小卖部', icon: '🏪', type: 'store' },
				{ id: 2, title: '鱼情查询', icon: '🐟', type: 'fishInfo' },
				{ id: 3, title: '潮汐表', icon: '🌊', type: 'tide' },
				{ id: 4, title: '钓点导航', icon: '📍', type: 'navigation' },
				{ id: 5, title: '饵料推荐', icon: '🪱', type: 'bait' },
				{ id: 6, title: '钓具记录', icon: '🎣', type: 'equipment' },
				{ id: 7, title: '渔获统计', icon: '📊', type: 'statistics' },
				{ id: 8, title: '钓友交流', icon: '💬', type: 'chat' },
				{ id: 9, title: '钓鱼日记', icon: '📝', type: 'diary' },
				{ id: 10, title: 'csprng抽号', icon: '🎲', type: 'csprng' }
			]
		}
	},
	methods: {
		handleGridClick(item) {
			if (item.type === 'store') {
				// 跳转到小卖部页面，传递钓场信息
				uni.navigateTo({
					url: '/pages/magicFishingBox/store?fieldName=' + encodeURIComponent('东湖钓场') + 
						 '&position=' + 'A-15'
				})
			} else {
				if (item.type === 'csprng') {
					uni.navigateTo({ url: '/pages/magicFishingBox/csprng/index' })
				} else {
					uni.showToast({
						title: `打开${item.title}`,
						icon: 'none'
					})
				}
			}
		}
	}
}
</script>

<style scoped>
.container {
	padding: 20rpx;
	background-color: #f5f7fa;
	min-height: 100vh;
}

/* 宫格布局（内置实现，三列） */
.grid-container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20rpx;
}

.grid-item {
    background: #ffffff;
    border-radius: 16rpx;
    padding: 40rpx 20rpx;
    text-align: center;
    box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.08);
    border: 1rpx solid #e8f4fd;
    transition: all 0.3s ease;
}

.grid-item:active {
    transform: scale(0.95);
    box-shadow: 0 6rpx 20rpx rgba(52, 152, 219, 0.2);
}

.grid-icon {
    margin-bottom: 20rpx;
}

.icon {
	font-size: 48rpx;
}

.grid-title {
	display: block;
	font-size: 28rpx;
	font-weight: bold;
	color: #2c3e50;
}
</style>