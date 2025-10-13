<template>
	<view class="container">
		<!-- 导航栏 -->
		<view class="navbar">
			<!-- 第一排 -->
			<view class="navbar-row">
				<!-- 左上角卫星定位 -->
				<view class="location-btn" @click="handleLocation">
					<text class="location-icon">📍</text>
					<text class="location-text">{{ currentCity || '定位中...' }}</text>
				</view>
				
				<!-- 中间悬浮胶囊搜索框 -->
				<view class="search-capsule" @click="handleSearch">
					<text class="search-icon">🔍</text>
					<text class="search-placeholder">搜索鱼塘、地点...</text>
				</view>
				
				<!-- 右上角关注按钮 -->
				<view class="follow-btn" @click="handleFollow">
					<text class="follow-icon" :class="{ 'followed': isFollowed }">
						{{ isFollowed ? '✓' : '+' }}
					</text>
					<text class="follow-text">{{ isFollowed ? '已关注' : '关注' }}</text>
				</view>
			</view>
		</view>

		<!-- 信息显示区域 -->
		<view class="content-area">
			<view class="pond-list">
				<view 
					class="pond-card" 
					v-for="(pond, index) in pondList" 
					:key="pond.id"
					@click="goToPondDetail(pond)"
				>
					<!-- 卡片头部 -->
					<view class="card-header">
						<view class="pond-info">
							<text class="pond-name">{{ pond.name }}</text>
							<view class="pond-location">
								<text class="location-icon">📍</text>
								<text class="location-text">{{ pond.location }}</text>
							</view>
						</view>
						<view class="pond-status" :class="pond.status">
							<text class="status-text">{{ pond.statusText }}</text>
						</view>
					</view>
					
					<!-- 卡片主体 -->
					<view class="card-body">
						<view class="pond-rules">
							<text class="rules-content">{{ pond.rules }}</text>
						</view>
						
						<view class="pond-meta">
							<view class="distance-info">
								<text class="distance-label">距离</text>
								<text class="distance-value">{{ pond.distance }}</text>
							</view>
							<view class="price-info">
								<text class="price-label">价格</text>
								<text class="price-value">¥{{ pond.price }}/天</text>
							</view>
						</view>
					</view>
					
					<!-- 卡片底部 -->
					<view class="card-footer">
						<view class="pond-tags">
							<text class="tag" v-for="tag in pond.tags" :key="tag">{{ tag }}</text>
						</view>
					</view>
				</view>
			</view>
		</view>

		<!-- 底部安全区域 -->
		<view class="safe-area-bottom"></view>
	</view>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// 用户状态
const userInfo = ref(null)
const isFollowed = ref(false)
const currentCity = ref('')

// 鱼塘数据
const pondList = ref([
	{
		id: 1,
		name: '朝阳湖钓场',
		location: '北京市朝阳区朝阳公园',
		distance: '2.5km',
		price: 80,
		status: 'active',
		statusText: '营业中',
		rules: '限竿4.5米，禁止打窝，一人一竿',
		tags: ['鲫鱼', '鲤鱼', '草鱼']
	},
	{
		id: 2,
		name: '海淀水库',
		location: '北京市海淀区上庄水库',
		distance: '5.8km',
		price: 120,
		status: 'active',
		statusText: '推荐',
		rules: '可夜钓，需提前预约，提供钓具租赁',
		tags: ['大鱼', '夜钓', '预约']
	},
	{
		id: 3,
		name: '丰台鱼塘',
		location: '北京市丰台区南苑',
		distance: '8.2km',
		price: 60,
		status: 'busy',
		statusText: '爆满',
		rules: '限时6小时，禁止使用活饵',
		tags: ['便宜', '限时', '新手友好']
	},
	{
		id: 4,
		name: '通州野钓点',
		location: '北京市通州区运河公园',
		distance: '12.5km',
		price: 0,
		status: 'active',
		statusText: '免费',
		rules: '野钓点，自备钓具，注意安全',
		tags: ['免费', '野钓', '自然']
	}
])

// 关注功能
const handleFollow = () => {
	isFollowed.value = !isFollowed.value
	uni.showToast({
		title: isFollowed.value ? '已关注' : '取消关注',
		icon: 'success'
	})
}

// 搜索功能
const handleSearch = () => {
	uni.showToast({
		title: '搜索功能开发中',
		icon: 'none'
	})
}

// 定位功能
const handleLocation = () => {
	uni.showLoading({
		title: '定位中...'
	})
	
	// 模拟定位
	setTimeout(() => {
		const cities = ['北京市', '上海市', '广州市', '深圳市', '杭州市']
		currentCity.value = cities[Math.floor(Math.random() * cities.length)]
		uni.hideLoading()
		uni.showToast({
			title: `已定位到${currentCity.value}`,
			icon: 'success'
		})
	}, 1500)
}

// 跳转到鱼塘详情页
const goToPondDetail = (pond) => {
	uni.showToast({
		title: `进入${pond.name}详情页`,
		icon: 'none'
	})
	// 这里可以跳转到详情页
	// uni.navigateTo({
	//   url: `/pages/pond/detail?id=${pond.id}`
	// })
}

onMounted(() => {
	// 页面加载时检查登录状态
	const savedUserInfo = uni.getStorageSync('userInfo')
	if (savedUserInfo) {
		userInfo.value = savedUserInfo
	}
	
	// 模拟初始定位
	setTimeout(() => {
		currentCity.value = '北京市'
	}, 1000)
	
	console.log('鱼讯页面加载完成')
})
</script>

<style scoped>
.container {
	padding: 0;
	min-height: 100vh;
	background-color: #e8e8e8;
	position: relative;
}

/* 导航栏 */
.navbar {
	background: #ffffff;
	padding: 20rpx 30rpx;
	box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.1);
	position: sticky;
	top: 0;
	z-index: 100;
}

.navbar-row {
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 20rpx;
}

/* 关注按钮 */
.follow-btn {
	display: flex;
	align-items: center;
	gap: 8rpx;
	padding: 12rpx 20rpx;
	background: #f8f8f8;
	border-radius: 20rpx;
	border: 1rpx solid #e5e5e5;
	transition: all 0.3s ease;
}

.follow-btn:active {
	transform: scale(0.95);
}

.follow-icon {
	font-size: 24rpx;
	font-weight: bold;
	color: #07c160;
}

.follow-icon.followed {
	color: #ff4757;
}

.follow-text {
	font-size: 24rpx;
	color: #333333;
}

/* 搜索胶囊 */
.search-capsule {
	flex: 1;
	display: flex;
	align-items: center;
	gap: 12rpx;
	background: #f8f8f8;
	border-radius: 25rpx;
	padding: 16rpx 24rpx;
	margin: 0 20rpx;
	border: 1rpx solid #e5e5e5;
	transition: all 0.3s ease;
}

.search-capsule:active {
	background: #f0f0f0;
	transform: scale(0.98);
}

.search-icon {
	font-size: 24rpx;
	color: #999999;
}

.search-placeholder {
	font-size: 24rpx;
	color: #999999;
}

/* 定位按钮 */
.location-btn {
	display: flex;
	align-items: center;
	gap: 6rpx;
	padding: 12rpx 16rpx;
	background: #f8f8f8;
	border-radius: 20rpx;
	border: 1rpx solid #e5e5e5;
	transition: all 0.3s ease;
}

.location-btn:active {
	transform: scale(0.95);
}

.location-icon {
	font-size: 20rpx;
	color: #07c160;
}

.location-text {
	font-size: 22rpx;
	color: #333333;
	max-width: 120rpx;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}

/* 内容区域 */
.content-area {
	padding: 30rpx 30rpx;
}

.pond-list {
	display: flex;
	flex-direction: column;
	gap: 30rpx;
}

/* 鱼塘卡片 - 名片效果 */
.pond-card {
	background: #ffffff;
	border-radius: 20rpx;
	padding: 0;
	box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.12);
	border: 1rpx solid rgba(255, 255, 255, 0.8);
	transition: all 0.3s ease;
	overflow: hidden;
	position: relative;
}

.pond-card:active {
	transform: translateY(-2rpx);
	box-shadow: 0 8rpx 30rpx rgba(0, 0, 0, 0.18);
}

/* 卡片头部 */
.card-header {
	display: flex;
	justify-content: space-between;
	align-items: flex-start;
	padding: 30rpx 30rpx 20rpx;
	background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);
}

.pond-info {
	flex: 1;
}

.pond-name {
	font-size: 36rpx;
	font-weight: 700;
	color: #2c3e50;
	margin-bottom: 8rpx;
	display: block;
}

.pond-location {
	display: flex;
	align-items: center;
	gap: 6rpx;
}

.location-icon {
	font-size: 18rpx;
	color: #07c160;
}

.location-text {
	font-size: 22rpx;
	color: #7f8c8d;
}

.pond-status {
	padding: 8rpx 16rpx;
	border-radius: 25rpx;
	font-size: 20rpx;
	margin-left: 20rpx;
}

.pond-status.active {
	background: linear-gradient(135deg, #e8f5e8 0%, #d4edda 100%);
	color: #07c160;
	border: 1rpx solid #c3e6cb;
}

.pond-status.busy {
	background: linear-gradient(135deg, #ffe8e8 0%, #f8d7da 100%);
	color: #ff4757;
	border: 1rpx solid #f5c6cb;
}

.status-text {
	font-size: 20rpx;
	font-weight: 600;
}

/* 卡片主体 */
.card-body {
	padding: 0 30rpx 20rpx;
}

.pond-rules {
	margin-bottom: 24rpx;
}

.rules-content {
	font-size: 26rpx;
	color: #5a6c7d;
	line-height: 1.6;
	background: #f8f9fa;
	padding: 20rpx;
	border-radius: 12rpx;
	border-left: 4rpx solid #07c160;
}

.pond-meta {
	display: flex;
	justify-content: space-between;
	align-items: center;
	gap: 20rpx;
}

.distance-info, .price-info {
	display: flex;
	flex-direction: column;
	align-items: center;
	flex: 1;
	padding: 16rpx;
	background: #f8f9fa;
	border-radius: 12rpx;
}

.distance-label, .price-label {
	font-size: 20rpx;
	color: #95a5a6;
	margin-bottom: 4rpx;
}

.distance-value {
	font-size: 24rpx;
	font-weight: 600;
	color: #34495e;
}

.price-value {
	font-size: 28rpx;
	font-weight: 700;
	color: #e74c3c;
}

/* 卡片底部 */
.card-footer {
	padding: 20rpx 30rpx 30rpx;
	background: #f8f9fa;
	border-top: 1rpx solid #ecf0f1;
}

.pond-tags {
	display: flex;
	gap: 10rpx;
	flex-wrap: wrap;
	justify-content: center;
}

.tag {
	font-size: 20rpx;
	color: #07c160;
	background: linear-gradient(135deg, #e8f5e8 0%, #d4edda 100%);
	padding: 6rpx 12rpx;
	border-radius: 15rpx;
	border: 1rpx solid #c3e6cb;
	font-weight: 500;
}

/* 底部安全区域 */
.safe-area-bottom {
	height: 120rpx;
}

/* 响应式设计 */
@media (max-width: 750rpx) {
	.navbar {
		padding: 15rpx 20rpx;
	}
	
	.content-area {
		padding: 20rpx 20rpx;
	}
	
	.pond-list {
		gap: 25rpx;
	}
	
	.search-capsule {
		margin: 0 15rpx;
	}
	
	.location-text {
		max-width: 100rpx;
	}
	
	.card-header {
		padding: 25rpx 25rpx 15rpx;
	}
	
	.card-body {
		padding: 0 25rpx 15rpx;
	}
	
	.card-footer {
		padding: 15rpx 25rpx 25rpx;
	}
}
</style>
