<template>
	<view class="container">
		<!-- 顶部欢迎区域 -->
		<view class="welcome-section fade-in">
			<view class="welcome-content">
				<view class="greeting">
					<text class="greeting-text">{{ getGreeting() }}</text>
					<text class="user-name" v-if="userInfo">{{ userInfo.nickName || '钓友' }}</text>
					<text class="user-name" v-else>欢迎来到鱼讯中心</text>
				</view>
				<view class="weather-info">
					<text class="weather-text">🐟 最新鱼讯信息</text>
				</view>
			</view>
			<view class="user-avatar" @click="handleUserClick">
				<image v-if="userInfo && userInfo.avatarUrl" :src="userInfo.avatarUrl" class="avatar-img"></image>
				<view v-else class="avatar-placeholder">
					<text class="avatar-text">👤</text>
				</view>
			</view>
		</view>

		<!-- 快捷功能卡片 -->
		<view class="quick-actions fade-in">
			<view class="section-header">
				<text class="section-title">鱼讯功能</text>
				<text class="section-subtitle">获取最新钓鱼资讯</text>
			</view>
			
			<view class="actions-grid">
				<view class="action-card" @click="navigateTo('fish-news')">
					<view class="action-icon pond-icon">
						<text class="icon-emoji">🐟</text>
					</view>
					<view class="action-content">
						<text class="action-title">最新鱼讯</text>
						<text class="action-desc">查看最新钓鱼资讯</text>
					</view>
					<view class="action-arrow">→</view>
				</view>
				
				<view class="action-card" @click="navigateTo('weather-info')">
					<view class="action-icon follow-icon">
						<text class="icon-emoji">🌤️</text>
					</view>
					<view class="action-content">
						<text class="action-title">钓鱼天气</text>
						<text class="action-desc">查看钓鱼适宜天气</text>
					</view>
					<view class="action-arrow">→</view>
				</view>
				
				<view class="action-card" @click="navigateTo('fishing-tips')">
					<view class="action-icon message-icon">
						<text class="icon-emoji">💡</text>
					</view>
					<view class="action-content">
						<text class="action-title">钓鱼技巧</text>
						<text class="action-desc">学习钓鱼经验技巧</text>
					</view>
					<view class="action-arrow">→</view>
				</view>
				
				<view class="action-card" @click="navigateTo('equipment-news')">
					<view class="action-icon payment-icon">
						<text class="icon-emoji">🎣</text>
					</view>
					<view class="action-content">
						<text class="action-title">装备资讯</text>
						<text class="action-desc">了解最新钓鱼装备</text>
					</view>
					<view class="action-arrow">→</view>
				</view>
			</view>
		</view>

		<!-- 最新鱼讯信息 -->
		<view class="pond-section fade-in">
			<view class="section-header">
				<text class="section-title">最新鱼讯</text>
				<view class="header-action" @click="navigateTo('fish-news-list')">
					<text class="action-text">查看全部</text>
					<text class="action-arrow">→</text>
				</view>
			</view>
			
			<view class="pond-list">
				<view class="pond-card" v-for="(pond, index) in mockPondData" :key="index">
					<view class="pond-image">
						<image :src="pond.image" class="pond-img" mode="aspectFill"></image>
						<view class="pond-status" :class="pond.status">
							<text class="status-text">{{ pond.statusText }}</text>
						</view>
					</view>
					<view class="pond-info">
						<text class="pond-name">{{ pond.name }}</text>
						<text class="pond-location">📍 {{ pond.location }}</text>
						<view class="pond-meta">
							<view class="meta-item">
								<text class="meta-label">价格</text>
								<text class="meta-value">¥{{ pond.price }}/天</text>
							</view>
							<view class="meta-item">
								<text class="meta-label">评分</text>
								<view class="rating">
									<text class="rating-text">⭐ {{ pond.rating }}</text>
								</view>
							</view>
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

const userInfo = ref(null)

// 模拟鱼讯数据
const mockPondData = ref([
	{
		id: 1,
		name: '今日鱼情：鲫鱼活跃',
		location: '北京市朝阳区各大钓场',
		price: '适宜',
		rating: 4.8,
		image: 'https://picsum.photos/300/200?random=1',
		status: 'active',
		statusText: '推荐'
	},
	{
		id: 2,
		name: '鲤鱼开口时间：早6-8点',
		location: '北京市海淀区钓场',
		price: '良好',
		rating: 4.6,
		image: 'https://picsum.photos/300/200?random=2',
		status: 'active',
		statusText: '热门'
	},
	{
		id: 3,
		name: '草鱼上钩率提升',
		location: '北京市丰台区钓场',
		price: '优秀',
		rating: 4.9,
		image: 'https://picsum.photos/300/200?random=3',
		status: 'busy',
		statusText: '爆满'
	}
])

// 获取问候语
const getGreeting = () => {
	const hour = new Date().getHours()
	if (hour < 6) return '夜深了'
	if (hour < 12) return '早上好'
	if (hour < 14) return '中午好'
	if (hour < 18) return '下午好'
	if (hour < 22) return '晚上好'
	return '夜深了'
}

const handleUserClick = () => {
	if (!userInfo.value) {
		uni.showModal({
			title: '欢迎登录',
			content: '登录后享受更多功能',
			confirmText: '立即登录',
			cancelText: '稍后再说',
			success: (res) => {
				if (res.confirm) {
					// 模拟登录成功
					userInfo.value = {
						nickName: '钓友小王',
						avatarUrl: 'https://picsum.photos/100/100?random=avatar'
					}
					uni.showToast({
						title: '登录成功',
						icon: 'success'
					})
				}
			}
		})
	} else {
		uni.navigateTo({
			url: '/pages/profile/index'
		})
	}
}

const navigateTo = (page) => {
	const pages = {
		'fish-news': '/pages/fish/news',
		'weather-info': '/pages/weather/info',
		'fishing-tips': '/pages/tips/index',
		'equipment-news': '/pages/equipment/news',
		'fish-news-list': '/pages/fish/list'
	}
	
	const targetPage = pages[page]
	if (targetPage) {
		uni.navigateTo({
			url: targetPage
		})
	} else {
		uni.showToast({
			title: '功能开发中',
			icon: 'none'
		})
	}
}

onMounted(() => {
	// 页面加载时的初始化逻辑
	console.log('首页加载完成')
})
</script>

<style scoped>
.container {
	padding: 0;
	min-height: 100vh;
	background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
	position: relative;
}

/* 欢迎区域 */
.welcome-section {
	background: rgba(255, 255, 255, 0.1);
	backdrop-filter: blur(20rpx);
	padding: 60rpx 40rpx 40rpx;
	display: flex;
	justify-content: space-between;
	align-items: center;
	border-radius: 0 0 40rpx 40rpx;
	margin-bottom: 30rpx;
}

.welcome-content {
	flex: 1;
}

.greeting {
	margin-bottom: 16rpx;
}

.greeting-text {
	font-size: 28rpx;
	color: rgba(255, 255, 255, 0.8);
	display: block;
	margin-bottom: 8rpx;
}

.user-name {
	font-size: 36rpx;
	font-weight: 600;
	color: white;
	display: block;
}

.weather-info {
	margin-top: 16rpx;
}

.weather-text {
	font-size: 24rpx;
	color: rgba(255, 255, 255, 0.7);
}

.user-avatar {
	width: 100rpx;
	height: 100rpx;
	border-radius: 50%;
	overflow: hidden;
	background: rgba(255, 255, 255, 0.2);
	display: flex;
	align-items: center;
	justify-content: center;
	border: 3rpx solid rgba(255, 255, 255, 0.3);
}

.avatar-img {
	width: 100%;
	height: 100%;
	border-radius: 50%;
}

.avatar-placeholder {
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
}

.avatar-text {
	font-size: 40rpx;
	color: white;
}

/* 快捷功能区域 */
.quick-actions {
	background: rgba(255, 255, 255, 0.95);
	margin: 0 20rpx 30rpx;
	border-radius: 24rpx;
	padding: 40rpx 30rpx;
	backdrop-filter: blur(20rpx);
	box-shadow: 0 8rpx 32rpx rgba(0, 0, 0, 0.1);
}

.section-header {
	margin-bottom: 30rpx;
}

.section-title {
	font-size: 32rpx;
	font-weight: 600;
	color: #333;
	display: block;
	margin-bottom: 8rpx;
}

.section-subtitle {
	font-size: 24rpx;
	color: #666;
}

.actions-grid {
	display: flex;
	flex-direction: column;
	gap: 20rpx;
}

.action-card {
	display: flex;
	align-items: center;
	padding: 24rpx;
	background: rgba(102, 126, 234, 0.05);
	border-radius: 16rpx;
	border: 1rpx solid rgba(102, 126, 234, 0.1);
	transition: all 0.3s ease;
}

.action-card:active {
	transform: scale(0.98);
	background: rgba(102, 126, 234, 0.1);
}

.action-icon {
	width: 80rpx;
	height: 80rpx;
	border-radius: 20rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	margin-right: 24rpx;
}

.pond-icon {
	background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
}

.follow-icon {
	background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
}

.message-icon {
	background: linear-gradient(135deg, #fa709a 0%, #fee140 100%);
}

.payment-icon {
	background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%);
}

.icon-emoji {
	font-size: 36rpx;
}

.action-content {
	flex: 1;
}

.action-title {
	font-size: 28rpx;
	font-weight: 600;
	color: #333;
	display: block;
	margin-bottom: 4rpx;
}

.action-desc {
	font-size: 24rpx;
	color: #666;
}

.action-arrow {
	font-size: 24rpx;
	color: #667eea;
	font-weight: 600;
}

/* 钓场信息区域 */
.pond-section {
	background: rgba(255, 255, 255, 0.95);
	margin: 0 20rpx 30rpx;
	border-radius: 24rpx;
	padding: 40rpx 30rpx;
	backdrop-filter: blur(20rpx);
	box-shadow: 0 8rpx 32rpx rgba(0, 0, 0, 0.1);
}

.header-action {
	display: flex;
	align-items: center;
	gap: 8rpx;
}

.action-text {
	font-size: 24rpx;
	color: #667eea;
}

.pond-list {
	display: flex;
	flex-direction: column;
	gap: 20rpx;
}

.pond-card {
	display: flex;
	background: white;
	border-radius: 16rpx;
	overflow: hidden;
	box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.08);
	transition: all 0.3s ease;
}

.pond-card:active {
	transform: scale(0.98);
}

.pond-image {
	position: relative;
	width: 200rpx;
	height: 150rpx;
}

.pond-img {
	width: 100%;
	height: 100%;
}

.pond-status {
	position: absolute;
	top: 12rpx;
	right: 12rpx;
	padding: 6rpx 12rpx;
	border-radius: 20rpx;
	font-size: 20rpx;
}

.pond-status.active {
	background: rgba(40, 167, 69, 0.9);
	color: white;
}

.pond-status.busy {
	background: rgba(220, 53, 69, 0.9);
	color: white;
}

.status-text {
	font-size: 20rpx;
}

.pond-info {
	flex: 1;
	padding: 20rpx;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
}

.pond-name {
	font-size: 28rpx;
	font-weight: 600;
	color: #333;
	margin-bottom: 8rpx;
}

.pond-location {
	font-size: 24rpx;
	color: #666;
	margin-bottom: 16rpx;
}

.pond-meta {
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.meta-item {
	display: flex;
	flex-direction: column;
	align-items: center;
}

.meta-label {
	font-size: 20rpx;
	color: #999;
	margin-bottom: 4rpx;
}

.meta-value {
	font-size: 24rpx;
	font-weight: 600;
	color: #667eea;
}

.rating {
	display: flex;
	align-items: center;
}

.rating-text {
	font-size: 24rpx;
	color: #ffc107;
}

/* 底部安全区域 */
.safe-area-bottom {
	height: 120rpx;
}

/* 响应式设计 */
@media (max-width: 750rpx) {
	.welcome-section {
		padding: 40rpx 30rpx 30rpx;
	}
	
	.user-avatar {
		width: 80rpx;
		height: 80rpx;
	}
	
	.quick-actions, .pond-section {
		margin: 0 15rpx 20rpx;
		padding: 30rpx 20rpx;
	}
}
</style>
