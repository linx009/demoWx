<template>
	<view class="container">
		<!-- 顶部导航栏 -->
		<view class="navbar">
			<view class="nav-content">
				<view class="nav-left" @click="goBack">
					<text class="back-icon">←</text>
				</view>
				<view class="nav-center">
					<text class="nav-title">{{ pondDetail.pondName }}</text>
				</view>
				<view class="nav-right"></view>
			</view>
		</view>

		<!-- 轮播图 -->
		<view class="photos-section">
			<swiper class="photo-swiper" indicator-dots="true" autoplay="true">
				<swiper-item v-for="(photo, index) in pondDetail.photos" :key="index">
					<image :src="photo" class="pond-photo" mode="aspectFill"></image>
				</swiper-item>
			</swiper>
			<!-- 关注按钮悬浮在轮播图左上角 -->
			<view class="follow-btn-overlay" @click="toggleFollow">
				<text class="follow-icon">{{ isFollowed ? '✓' : '+' }}</text>
				<text class="follow-text">{{ isFollowed ? '已关注' : '关注' }}</text>
			</view>
		</view>

		<!-- 钓场公告栏 -->
		<view class="announcement-section">
			<view class="announcement-title">
				<text class="announcement-title-text">公告</text>
			</view>
			<view class="announcement-content">
				<text class="announcement-text">{{ pondDetail.bossMessage }}</text>
			</view>
		</view>


		<!-- 钓场信息 -->
		<view class="info-section">
			<view class="info-content">
				<view class="info-item">
					<text class="info-label">地址:</text>
					<text class="info-value">{{ pondDetail.location }}</text>
					<view class="map-icon" @click="openMap">
						<text class="map-icon-text">📍</text>
					</view>
				</view>
				<view class="info-row">
					<view class="info-item-half">
						<text class="info-label">营业时间:</text>
						<text class="info-value">{{ pondDetail.businessHours }}</text>
					</view>
					<view class="info-item-half">
						<text class="info-label">距离您:</text>
						<text class="info-value">{{ pondDetail.distance }}</text>
					</view>
				</view>
				<view class="info-row">
					<view class="info-item-half">
						<text class="info-label">电话:</text>
						<text class="info-value">{{ pondDetail.phone }}</text>
					</view>
					<view class="info-item-half">
						<text class="info-label">微信:</text>
						<text class="info-value">{{ pondDetail.wechat }}</text>
					</view>
				</view>
			</view>
		</view>

		<!-- 分隔线 -->
		<view class="divider"></view>

		<!-- 鱼塘经营 -->
		<view class="business-section">
			<view class="business-content">
				<view class="pond-card" v-for="(pond, index) in pondDetail.ponds" :key="index" @click="goToPond(pond)">
					<view class="card-header">
						<text class="pond-name">{{ pond.name }}</text>
						<text class="pond-price">{{ pond.price }}</text>
					</view>
					<view class="card-content">
						<view class="card-row">
							<text class="card-label">回鱼：</text>
							<text class="card-value">{{ pond.returnPrice }}</text>
						</view>
						<view class="card-row">
							<text class="card-label">底鱼：</text>
							<text class="card-value">{{ pond.baseFish }}</text>
						</view>
						<view class="card-row">
							<text class="card-label">作钓时长：</text>
							<text class="card-value">{{ pond.duration }}</text>
						</view>
						<view class="card-row">
							<text class="card-label">上日坑冠：</text>
							<text class="card-value">{{ pond.champion }}</text>
						</view>
						<view class="card-row">
							<text class="card-label">钓位数：</text>
							<text class="card-value">{{ pond.spots }}个</text>
						</view>
					</view>
				</view>
			</view>
		</view>

		<!-- 分隔线 -->
		<view class="divider"></view>

		<!-- 活动公告 -->
		<view class="activity-section">
			<view class="section-title">活动公告</view>
			<view class="activity-content">
				<view class="activity-item" v-for="(activity, index) in pondDetail.activities" :key="index" @click="goToActivity(activity)">
					<view class="activity-header">
						<text class="activity-title">{{ activity.title }}</text>
						<text class="activity-date">{{ activity.date }}</text>
					</view>
					<text class="activity-content-text">{{ activity.content }}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// 关注状态
const isFollowed = ref(false)

// 页面数据
const pondDetail = ref({
	pondName: '朝阳湖钓场',
	fullName: '朝阳湖休闲垂钓中心',
	manager: '张主管',
	location: '北京市朝阳区朝阳公园内',
	distance: '距离2.5km',
	businessHours: '06:00-18:00',
	phone: '138****8888',
	wechat: 'chaoyanghu888',
	bossMessage: '欢迎来到朝阳湖钓场！我们提供优质的垂钓环境，专业的服务团队，让您享受钓鱼的乐趣。今天鱼情不错，大家快来！',
	photos: [
		'https://picsum.photos/400/300?random=pond1',
		'https://picsum.photos/400/300?random=pond2',
		'https://picsum.photos/400/300?random=pond3'
	],
	ponds: [
		{
			id: 1,
			name: '一号塘',
			price: '50元/4小时',
			returnPrice: '4元/斤',
			baseFish: '5000斤',
			duration: '4小时',
			champion: '钓友老李 68斤',
			spots: 25
		},
		{
			id: 2,
			name: '二号塘',
			price: '80元/6小时',
			returnPrice: '5元/斤',
			baseFish: '8000斤',
			duration: '6小时',
			champion: '钓友小王 85斤',
			spots: 30
		},
		{
			id: 3,
			name: '三号塘',
			price: '120元/8小时',
			returnPrice: '6元/斤',
			baseFish: '12000斤',
			duration: '8小时',
			champion: '钓友老张 120斤',
			spots: 20
		}
	],
	activities: [
		{
			id: 1,
			title: '周末钓鱼大赛',
			date: '2024-01-20',
			content: '本周末举办钓鱼大赛，冠军可获得现金奖励1000元，欢迎各位钓友踊跃参加！'
		},
		{
			id: 2,
			title: '新鱼投放通知',
			date: '2024-01-18',
			content: '本周三将投放新鲜鲤鱼3000斤，鱼情将会更好，请大家关注！'
		},
		{
			id: 3,
			title: '钓场维护通知',
			date: '2024-01-15',
			content: '本周一钓场进行设备维护，暂停营业一天，周二正常营业。'
		}
	]
})

// 页面方法
const goBack = () => {
	uni.navigateBack()
}

// 切换关注状态
const toggleFollow = () => {
	isFollowed.value = !isFollowed.value
	uni.showToast({
		title: isFollowed.value ? '已关注' : '已取消关注',
		icon: 'none'
	})
}

// 打开地图
const openMap = () => {
	uni.showToast({
		title: '打开地图定位',
		icon: 'none'
	})
	// 这里可以调用地图API
	// uni.openLocation({
	//     latitude: 39.908823,
	//     longitude: 116.397470,
	//     name: pondDetail.value.pondName,
	//     address: pondDetail.value.location
	// })
}

// 进入活动公告页面
const goToActivityPage = () => {
	uni.showToast({
		title: '进入活动公告页面',
		icon: 'none'
	})
	// 这里可以跳转到活动公告页面
	// uni.navigateTo({
	//     url: '/pages/activity/list'
	// })
}

// 跳转到鱼塘页面
const goToPond = (pond) => {
	uni.showToast({
		title: `进入${pond.name}`,
		icon: 'none'
	})
	// 这里可以跳转到具体的鱼塘页面
	// uni.navigateTo({
	//     url: `/pages/pond/pond-detail?pondId=${pond.id}`
	// })
}

// 跳转到活动页面
const goToActivity = (activity) => {
	uni.showToast({
		title: `查看${activity.title}`,
		icon: 'none'
	})
	// 这里可以跳转到活动详情页面
	// uni.navigateTo({
	//     url: `/pages/activity/detail?activityId=${activity.id}`
	// })
}

onMounted(() => {
	const pages = getCurrentPages()
	const currentPage = pages[pages.length - 1]
	const options = currentPage.options
	
	if (options.pondId) {
		console.log('获取鱼塘详情，ID:', options.pondId)
	}
})
</script>

<style scoped>
.container {
	min-height: 100vh;
	background-color: #ffffff;
}

.navbar {
	background: #ffffff;
	border-bottom: 1rpx solid #e5e5e5;
	padding: 0;
	position: sticky;
	top: 0;
	z-index: 100;
	height: 200rpx;
	display: flex;
	align-items: flex-end;
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
	font-size: 36rpx;
	font-weight: 600;
	color: #e74c3c;
}

.nav-right {
	width: 80rpx;
	height: 80rpx;
}

/* 轮播图样式 */
.photos-section {
	padding: 0;
	border-bottom: 1rpx solid #f0f0f0;
	position: relative;
}

.photo-swiper {
	height: 300rpx;
}

.pond-photo {
	width: 100%;
	height: 100%;
}

/* 悬浮关注按钮 */
.follow-btn-overlay {
	position: absolute;
	top: 20rpx;
	left: 20rpx;
	display: flex;
	align-items: center;
	gap: 8rpx;
	padding: 15rpx 25rpx;
	background: rgba(0, 0, 0, 0.7);
	border-radius: 25rpx;
	backdrop-filter: blur(10rpx);
	z-index: 10;
	transition: all 0.3s ease;
}

.follow-btn-overlay:active {
	transform: scale(0.95);
	background: rgba(0, 0, 0, 0.8);
}

.follow-icon {
	font-size: 32rpx;
	color: #07c160;
	font-weight: 700;
}

.follow-text {
	font-size: 28rpx;
	color: #ffffff;
	font-weight: 600;
}

/* 钓场公告栏样式 */
.announcement-section {
	height: 200rpx;
	background: #07c160;
	display: flex;
	position: relative;
}

.announcement-title {
	background: #ffd700;
	width: 100rpx;
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	position: relative;
}

.announcement-title::after {
	content: '';
	position: absolute;
	right: -1rpx;
	top: 0;
	bottom: 0;
	width: 1rpx;
	background: #ffd700;
}

.announcement-title-text {
	color: #ffffff;
	font-size: 36rpx;
	font-weight: 600;
	writing-mode: vertical-rl;
	text-orientation: mixed;
	letter-spacing: 8rpx;
}

.announcement-content {
	flex: 1;
	padding: 30rpx;
	display: flex;
	align-items: center;
}

.announcement-text {
	color: #ffffff;
	font-size: 32rpx;
	line-height: 1.6;
	display: block;
}


/* 分隔线样式 */
.divider {
	height: 20rpx;
	background: #f8f9fa;
	border-top: 1rpx solid #e5e5e5;
	border-bottom: 1rpx solid #e5e5e5;
}

/* 区域标题样式 */
.section-title {
	font-size: 32rpx;
	font-weight: 600;
	color: #333;
	padding: 30rpx 30rpx 20rpx 30rpx;
	background: #ffffff;
}

/* 钓场信息样式 */
.info-section {
	background: #ffffff;
	padding: 0 30rpx 20rpx 30rpx;
}

.info-content {
	display: flex;
	flex-direction: column;
	gap: 15rpx;
}

.info-item {
	display: flex;
	align-items: center;
	padding: 12rpx 0;
}

.info-row {
	display: flex;
	gap: 20rpx;
}

.info-item-half {
	flex: 1;
	display: flex;
	align-items: center;
	padding: 12rpx 0;
}

.info-label {
	font-size: 28rpx;
	color: #666;
	width: 140rpx;
}

.info-value {
	font-size: 28rpx;
	color: #333;
	font-weight: 500;
	flex: 1;
}

.map-icon {
	padding: 8rpx;
	background: #f0f0f0;
	border-radius: 50%;
	margin-left: 10rpx;
	transition: all 0.3s ease;
}

.map-icon:active {
	background: #e0e0e0;
}

.map-icon-text {
	font-size: 24rpx;
}

/* 鱼塘经营样式 */
.business-section {
	background: #ffffff;
}

.business-content {
	display: flex;
	flex-direction: column;
	gap: 20rpx;
	padding: 30rpx;
}

.pond-card {
	background: #ffffff;
	border: 1rpx solid #e5e5e5;
	border-radius: 12rpx;
	padding: 25rpx;
	box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.1);
	transition: all 0.3s ease;
}

.pond-card:active {
	transform: scale(0.98);
	box-shadow: 0 1rpx 4rpx rgba(0, 0, 0, 0.1);
}

.card-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 20rpx;
	padding-bottom: 15rpx;
	border-bottom: 1rpx solid #f0f0f0;
}

.pond-name {
	font-size: 32rpx;
	font-weight: 600;
	color: #333;
}

.pond-price {
	font-size: 28rpx;
	color: #e74c3c;
	font-weight: 600;
}

.card-content {
	display: flex;
	flex-direction: column;
	gap: 12rpx;
}

.card-row {
	display: flex;
	align-items: center;
}

.card-label {
	font-size: 26rpx;
	color: #666;
	width: 140rpx;
}

.card-value {
	font-size: 26rpx;
	color: #333;
	font-weight: 500;
	flex: 1;
}

/* 活动公告样式 */
.activity-section {
	background: #ffffff;
}

.activity-content {
	display: flex;
	flex-direction: column;
	gap: 20rpx;
	padding: 0 30rpx 30rpx 30rpx;
}

.activity-item {
	background: #ffffff;
	border: 1rpx solid #e5e5e5;
	border-radius: 12rpx;
	padding: 25rpx;
	transition: all 0.3s ease;
}

.activity-item:active {
	transform: scale(0.98);
	background: #f8f9fa;
}

.activity-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 15rpx;
}

.activity-title {
	font-size: 30rpx;
	font-weight: 600;
	color: #333;
	flex: 1;
}

.activity-date {
	font-size: 24rpx;
	color: #999;
}

.activity-content-text {
	font-size: 26rpx;
	color: #666;
	line-height: 1.5;
}

</style>
