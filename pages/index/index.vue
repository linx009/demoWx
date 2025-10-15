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
					<view class="search-icon"></view>
					<text class="search-placeholder">搜索</text>
				</view>
				
				<!-- 右上角关注下拉菜单 -->
				<view class="follow-dropdown" @click="toggleFollowDropdown">
					<text class="follow-text">关注</text>
					<text class="dropdown-icon" :class="{ 'open': showFollowDropdown }">▼</text>
					<!-- 下拉菜单 -->
					<view class="dropdown-menu" :class="{ 'show': showFollowDropdown }" @click.stop>
						<view class="dropdown-item" @click="selectFollowOption('frequent')">
							<text>经常浏览</text>
						</view>
						<view class="dropdown-item" @click="selectFollowOption('recent')">
							<text>最近更新</text>
						</view>
					</view>
				</view>
			</view>
		</view>


		<!-- 信息显示区域 -->
		<view class="content-area">
			<view class="pond-list">
				<view 
					class="card" 
					v-for="(pond, index) in pondList" 
					:key="pond.id"
					@click="goToPondDetail(pond)"
				>
					<!-- 卡片头部 -->
					<view class="card-header">
						<view class="pond-info">
							<text class="card-title">{{ pond.name }}</text>
							<view class="pond-location">
								<text class="location-icon">📍</text>
								<text class="card-subtitle">{{ pond.location }}</text>
							</view>
						</view>
						<view class="card-status" :class="pond.status">
							<text class="status-text">{{ pond.statusText }}</text>
						</view>
					</view>
					
					<!-- 卡片主体 -->
					<view class="card-body">
						<view class="pond-rules">
							<text class="card-content">{{ pond.rules }}</text>
						</view>
						
						<view class="card-meta">
							<view class="meta-item">
								<text class="meta-label">距离</text>
								<text class="meta-value">{{ pond.distance }}</text>
							</view>
							<view class="meta-item">
								<text class="meta-label">价格</text>
								<text class="meta-value">¥{{ pond.price }}/天</text>
							</view>
						</view>
					</view>
					
					<!-- 卡片底部 -->
					<view class="card-footer">
						<view class="card-tags">
							<text class="card-tag" v-for="tag in pond.tags" :key="tag">{{ tag }}</text>
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
import { ref, onMounted, onUnmounted } from 'vue'

// 用户状态
const userInfo = ref(null)
const isFollowed = ref(false)
const currentCity = ref('')

// 下拉菜单状态
const showFollowDropdown = ref(false)
let dropdownTimer = null

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


// 下拉菜单功能
const toggleFollowDropdown = () => {
	showFollowDropdown.value = !showFollowDropdown.value
	
	// 清除之前的定时器
	if (dropdownTimer) {
		clearTimeout(dropdownTimer)
		dropdownTimer = null
	}
	
	// 如果菜单打开，设置5秒后自动关闭
	if (showFollowDropdown.value) {
		dropdownTimer = setTimeout(() => {
			showFollowDropdown.value = false
			dropdownTimer = null
		}, 5000)
	}
}

// 选择关注选项
const selectFollowOption = (option) => {
	// 清除定时器
	if (dropdownTimer) {
		clearTimeout(dropdownTimer)
		dropdownTimer = null
	}
	
	showFollowDropdown.value = false
	uni.showToast({
		title: `选择了：${option === 'frequent' ? '经常浏览' : '最近更新'}`,
		icon: 'none'
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

onUnmounted(() => {
	// 页面卸载时清理定时器
	if (dropdownTimer) {
		clearTimeout(dropdownTimer)
		dropdownTimer = null
	}
})
</script>

<style scoped>
.container {
	padding: 0;
	min-height: 100vh;
	background-color: #fbfbfb;
	position: relative;
}

/* 导航栏 */
.navbar {
	background: #fbfbfb;
	padding: 5rpx 30rpx 16rpx 30rpx;
	box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.1);
	position: sticky;
	top: 0;
	z-index: 100;
}

.navbar-row {
	display: flex;
	align-items: flex-end;
	justify-content: space-between;
	gap: 20rpx;
}

/* 关注下拉菜单 */
.follow-dropdown {
	position: relative;
	display: flex;
	align-items: center;
	gap: 4rpx;
	padding: 12rpx 20rpx;
	background: transparent;
	border-radius: 20rpx;
	border: none;
	cursor: pointer;
}

.follow-dropdown:active {
	transform: scale(0.95);
}

.follow-text {
	font-size: 28rpx;
	color: #333333;
	font-weight: 600;
}

.dropdown-icon {
	font-size: 16rpx;
	color: #333333;
	transition: transform 0.3s ease;
}

.dropdown-icon.open {
	transform: rotate(180deg);
}

/* 下拉菜单 */
.dropdown-menu {
	position: absolute;
	top: 100%;
	right: 0;
	background: #ffffff;
	border-radius: 12rpx;
	box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.15);
	z-index: 1000;
	opacity: 0;
	visibility: hidden;
	transform: translateY(-10rpx);
	transition: all 0.3s ease;
	min-width: 200rpx;
	margin-top: 8rpx;
}

.dropdown-menu.show {
	opacity: 1;
	visibility: visible;
	transform: translateY(0);
}

.dropdown-item {
	padding: 20rpx 32rpx;
	font-size: 28rpx;
	color: #333333;
	border-bottom: 1rpx solid #f0f0f0;
	transition: background-color 0.2s ease;
	height: 80rpx;
	display: flex;
	align-items: center;
}

.dropdown-item:last-child {
	border-bottom: none;
}

.dropdown-item:active {
	background-color: #f8f8f8;
}

/* 搜索胶囊 */
.search-capsule {
	flex: 1;
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 12rpx;
	background: #fbfbfb;
	border-radius: 25rpx;
	padding: 6rpx 24rpx;
	margin: 0 45rpx;
	border: 2rpx solid #e5e5e5;
	transition: all 0.3s ease;
}

.search-capsule:active {
	background: #f5f5f5;
	transform: scale(0.98);
}

.search-icon {
	width: 34rpx;
	height: 34rpx;
	position: relative;
	flex-shrink: 0;
}

.search-icon::before {
	content: '';
	position: absolute;
	top: 5rpx;
	left: -1rpx;
	width: 18rpx;
	height: 18rpx;
	border: 2rpx solid #999999;
	border-radius: 50%;
}

.search-icon::after {
	content: '';
	position: absolute;
	bottom: 10rpx;
	right: 7rpx;
	width: 12rpx;
	height: 2rpx;
	background: #999999;
	transform: rotate(45deg);
	transform-origin: left center;
}

.search-placeholder {
	font-size: 28rpx;
	color: #999999;
}

/* 定位按钮 */
.location-btn {
	display: flex;
	align-items: center;
	gap: 6rpx;
	padding: 12rpx 16rpx;
	background: transparent;
	border-radius: 20rpx;
	border: none;
}

.location-btn:active {
	transform: scale(0.95);
}

.location-icon {
	font-size: 24rpx;
	color: #666666;
}

.location-text {
	font-size: 26rpx;
	color: #333333;
	font-weight: 600;
	max-width: 120rpx;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}

/* 内容区域 */
.content-area {
	padding: 15rpx 15rpx;
}

.pond-list {
	display: flex;
	flex-direction: column;
	gap: 5rpx;
}

/* 鱼塘卡片特定样式 */
.pond-info {
	display: flex;
	justify-content: space-between;
	align-items: flex-start;
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

.pond-rules {
	margin-bottom: 16rpx;
}

.pond-rules .card-content {
	background: #f8f9fa;
	padding: 16rpx;
	border-radius: 8rpx;
	border-left: 4rpx solid #07c160;
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
		padding: 10rpx 10rpx;
	}
	
	.pond-list {
		gap: 0rpx;
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
