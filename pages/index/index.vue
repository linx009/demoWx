<template>
	<view class="container">
		<!-- 导航栏 -->
		<view class="navbar">
			<!-- 第一排 -->
			<view class="navbar-row">
				<!-- 左上角关注下拉菜单 -->
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
				
				<!-- 中间悬浮胶囊搜索框 -->
				<view class="search-capsule" @click="handleSearch">
					<view class="search-icon"></view>
					<text class="search-placeholder">搜索</text>
				</view>
				
				<!-- 右上角卫星定位 -->
				<view class="location-btn" @click="handleLocation">
					<text class="location-icon">📍</text>
					<text class="location-text">{{ currentCity || '定位中...' }}</text>
				</view>
			</view>
		</view>


		<!-- 信息显示区域 -->
		<view class="content-area">
			<view class="pond-list">
				<FishingFieldCard 
					v-for="(pond, index) in pondList" 
					:key="pond.id"
					:pond="pond"
					@click="goToPondDetail(pond)"
				/>
			</view>
		</view>

		<!-- 底部安全区域 -->
		<view class="safe-area-bottom"></view>
	</view>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import FishingFieldCard from '@/components/FishingFieldCard.vue'

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
		pondName: '朝阳湖钓场',
		location: '北京市朝阳区朝阳公园南路123号456栋',
		distance: '2.5km',
		fishSpecies: '鲤鱼',
		fee: '50',
		pondCount: '3',
		champion: '钓友老李 68斤',
		message: '今天鱼情不错，大家快来！',
		announcement: {
			topic: '正钓',
			status: '报名中'
		}
	},
	{
		id: 2,
		pondName: '海滨水库',
		location: '北京市海淀区上庄水库东侧停车场附近',
		distance: '5.8km',
		fishSpecies: '草鱼',
		fee: '80',
		pondCount: '5',
		champion: '钓友小王 45斤',
		message: '夜钓环境很好，鱼情稳定！',
		announcement: {
			topic: '夜钓',
			status: '进行中'
		}
	},
	{
		id: 3,
		pondName: '丰台鱼塘',
		location: '北京市丰台区南苑',
		distance: '8.2km',
		fishSpecies: '鲫鱼',
		fee: '60',
		pondCount: '2',
		champion: '钓友老张 32斤',
		message: '新手友好，环境干净！',
		announcement: {
			topic: '新手场',
			status: '已满员'
		}
	},
	{
		id: 4,
		pondName: '通下野钓点',
		location: '北京市通州区运河公园',
		distance: '12.5km',
		fishSpecies: '鲤鱼',
		fee: '0',
		pondCount: '1',
		champion: '钓友老刘 28斤',
		message: '环境清幽，适合休闲垂钓'
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

// 跳转到鱼塘详情
const goToPondDetail = (pond) => {
	console.log('goToPondDetail被调用:', pond)
	if (pond.pondName) {
		// 跳转到钓场主页，传递鱼塘ID
		console.log('准备跳转到钓场详情页:', pond.id, pond.pondName)
		uni.navigateTo({
			url: `/pages/fishingField/detail?pondId=${pond.id}&pondName=${encodeURIComponent(pond.pondName)}`
		})
	} else {
		console.log('钓场数据格式不正确:', pond)
		uni.showToast({
			title: '钓场信息不完整',
			icon: 'none'
		})
	}
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

<style scoped lang="scss">
.container {
	padding: 0;
	min-height: 100vh;
	background-color: $uni-bg-color-tabbar;
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
	color: $uni-text-color-primary;
	font-weight: 600;
}

.dropdown-icon {
	font-size: 16rpx;
	color: $uni-text-color-primary;
	transition: transform 0.3s ease;
}

.dropdown-icon.open {
	transform: rotate(180deg);
}

/* 下拉菜单 */
.dropdown-menu {
	position: absolute;
	top: 100%;
	left: 0;
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
	color: $uni-text-color-primary;
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
	background-color: $uni-bg-color-section;
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
	color: $uni-text-color-tertiary;
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
	color: $uni-text-color-secondary;
}

.location-text {
	font-size: 26rpx;
	color: $uni-text-color-primary;
	font-weight: 600;
	max-width: 120rpx;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}

/* 内容区域 */
.content-area {
	padding: 20rpx 15rpx 15rpx 15rpx;
	background-color: #f0f0f0;
}

/* 钓场列表样式 */
.pond-list {
	display: flex;
	flex-direction: column;
	gap: 8rpx; /* 减少间距，因为卡片本身已有margin */
	overflow: visible; /* 确保投影不被切割 */
}

.card-header-new {
	display: flex;
	justify-content: space-between;
	align-items: flex-start;
	padding: 0rpx 24rpx 12rpx;
}

.pond-info-new {
	flex: 1;
}

.pond-name-new {
	font-size: 36rpx;
	font-weight: 600;
	color: #e74c3c;
	display: block;
	margin-bottom: 12rpx;
}

.location-new {
	font-size: 30rpx;
	color: #666;
	font-weight: 500;
	margin-bottom: 0rpx;
}

.info-type-new {
	display: flex;
	align-items: flex-start;
	margin-left: 20rpx;
}

.type-container-new {
	display: flex;
	flex-direction: column;
	align-items: flex-end;
	position: relative;
}

/* 报名中放在正钓后面 */
.status-badge-new {
	background: transparent;
	color: #07c160;
	padding: 0;
	border-radius: 0;
	margin-top: 8rpx;
	box-shadow: none;
	transform: none;
}

.badge-text-new {
	font-size: 26rpx;
	font-weight: 800;
	color: #07c160;
	text-shadow: 
		0rpx 0rpx 8rpx rgba(7, 193, 96, 0.4),
		2rpx 2rpx 4rpx rgba(0, 0, 0, 0.1),
		0rpx 0rpx 2rpx rgba(7, 193, 96, 0.6);
	letter-spacing: 2rpx;
	font-family: 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', 'STHeiti', sans-serif;
	transform: skew(-3deg) scale(1.05);
	background: linear-gradient(135deg, #07c160, #4cd964);
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
	background-clip: text;
	position: relative;
	display: inline-block;
}

.type-title-new {
	font-size: 36rpx;
	font-weight: 700;
	color: #e74c3c;
}

/* 卡片主体 */
.card-body-new {
	padding: 0 24rpx 4rpx;
}

/* 信息区域 */
.info-area-new {
	display: flex;
	flex-direction: column;
	gap: 12rpx;
	margin-bottom: 16rpx;
}

.info-row-new {
	display: flex;
	justify-content: space-between;
	gap: 16rpx;
}

.info-item-new {
	font-size: 30rpx;
	color: #666;
	font-weight: 500;
	flex: 1;
}

/* 时间紧凑显示 */
.time-compact {
	letter-spacing: -0.5rpx;
}

/* 底部区域：图片 + 坑冠和留言 */
.bottom-section-new {
	display: flex;
	align-items: flex-end;
	gap: 12rpx;
}

/* 钓场图片 - 左下角，高度自适应坑冠+留言 */
.pond-image-new {
	width: 150rpx;
	height: auto;
	min-height: 80rpx;
	border-radius: 8rpx;
	overflow: hidden;
	box-shadow: 0 2rpx 6rpx rgba(0, 0, 0, 0.1);
	flex-shrink: 0;
	align-self: stretch;
}

.image-new {
	width: 100%;
	height: 100%;
}

/* 坑冠和留言区域 - 宽度为单行减去图片宽度 */
.champion-message-new {
	flex: 1;
	display: flex;
	flex-direction: column;
	gap: 8rpx;
	/* 宽度自动计算：单行宽度 - 图片宽度 - 间距 */
	width: calc(100% - 150rpx - 12rpx);
	/* 设置最小高度，确保图片有足够高度 */
	min-height: 80rpx;
}

/* 坑冠信息 - 占用单行减去图片宽度 */
.champion-new {
	padding: 4rpx 8rpx;
	background: #fff8e1;
	border-radius: 4rpx;
	border-left: 2rpx solid #ffa726;
	width: 100%;
}

.champion-text-new {
	font-size: 24rpx;
	color: #e65100;
	font-weight: 500;
	line-height: 1.2;
}

/* 我有话讲 - 占用单行减去图片宽度 */
.message-new {
	padding: 4rpx 8rpx;
	background: #f3f4f6;
	border-radius: 4rpx;
	border-left: 2rpx solid #07c160;
	width: 100%;
}

.message-text-new {
	font-size: 24rpx;
	color: #333;
	line-height: 1.2;
	font-style: italic;
}

/* 原有鱼塘卡片特定样式 */
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
		background-color: #f0f0f0;
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
	
	/* 新模板响应式设计 */
	.card-header-new {
		padding: 0rpx 20rpx 0rpx;
	}
	
	.card-body-new {
		padding: 0 20rpx 0rpx;
	}
	
	.pond-name-new {
		font-size: 32rpx;
		color: #e74c3c;
	}
	
	/* 保持字体大小不变，遵循内容截断策略 */
	
	.type-title-new {
		font-size: 32rpx;
		color: #e74c3c;
	}
	
	.badge-text-new {
		font-size: 18rpx;
	}
	
	/* 保持字体大小不变，遵循内容截断策略 */
	
	.champion-text-new,
	.message-text-new {
		font-size: 22rpx;
	}
	
	.pond-image-new {
		width: 120rpx;
		height: auto;
		min-height: 60rpx;
	}
	
	.champion-message-new {
		/* 响应式宽度计算：单行宽度 - 图片宽度 - 间距 */
		width: calc(100% - 120rpx - 10rpx);
		gap: 6rpx;
		min-height: 60rpx;
	}
	
	.bottom-section-new {
		gap: 10rpx;
	}
}

</style>
