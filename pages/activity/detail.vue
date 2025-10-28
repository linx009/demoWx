<template>
	<view class="container">
		<!-- 顶部导航栏 -->
		<view class="navbar">
			<view class="nav-content">
				<view class="nav-left" @click="goBack">
					<text class="back-icon">←</text>
				</view>
				<view class="nav-center">
					<text class="nav-title">活动详情</text>
				</view>
				<view class="nav-right"></view>
			</view>
		</view>

		<!-- 活动内容 -->
		<view class="activity-content">
			<!-- 活动标题 -->
			<view class="activity-header">
				<text class="activity-title">{{ activityData.title }}</text>
				<view class="activity-status" :class="getStatusClass(activityData.status)">
					<text class="activity-status-text">{{ activityData.status }}</text>
				</view>
			</view>

			<!-- 活动时间 -->
			<view class="activity-time">
				<text class="time-label">活动时间：</text>
				<text class="time-value">{{ activityData.date }}</text>
			</view>

			<!-- 发布时间 -->
			<view class="activity-publish-time">
				<text class="publish-label">发布时间：</text>
				<text class="publish-value">{{ activityData.publishTime }}</text>
			</view>

			<!-- 活动钓塘 -->
			<view class="activity-pond">
				<text class="pond-label">活动钓塘：</text>
				<text class="pond-value">{{ activityData.pondName }}</text>
			</view>

			<!-- 已报人数 -->
			<view class="registration-info">
				<text class="registration-label">已报人数：</text>
				<text class="registration-count">{{ activityData.registeredCount }}</text>
				<text class="registration-total">/ {{ activityData.maxCount }}人</text>
			</view>


			<!-- 垂钓章程 -->
			<view class="activity-rules">
				<text class="rules-title">垂钓章程</text>
				<view class="rules-content">
					<view class="rule-item">
						<text class="rule-text">1. 鱼塘名称：{{ activityData.pondName }}</text>
					</view>
					<view class="rule-item">
						<text class="rule-text">2. 鱼种：鲤鱼、鲫鱼、草鱼</text>
					</view>
					<view class="rule-item">
						<text class="rule-text">3. 回鱼：4元/斤</text>
					</view>
					<view class="rule-item">
						<text class="rule-text">4. 作钓时长：4小时</text>
					</view>
					<view class="rule-item">
						<text class="rule-text">5. 限竿：每人限用一根钓竿</text>
					</view>
					<view class="rule-item">
						<text class="rule-text">6. 限饵：禁止使用活饵，只允许使用商品饵料</text>
					</view>
					<view class="rule-item">
						<text class="rule-text">7. 底鱼数量：5000斤</text>
					</view>
					<view class="rule-item">
						<text class="rule-text">8. 选座方式：先到先得</text>
					</view>
					<view class="rule-item">
						<text class="rule-text">9. 更换钓位：允许更换钓位</text>
					</view>
					<view class="rule-item">
						<text class="rule-text">10. 钓位数量：26个</text>
					</view>
					<view class="rule-item">
						<text class="rule-text">11. 鱼塘描述：标准竞技池，适合新手和高手</text>
					</view>
					<view class="rule-item">
						<text class="rule-text">12. 垂钓时间：早上6:00-晚上18:00</text>
					</view>
					<view class="rule-item">
						<text class="rule-text">13. 禁止使用活饵，只允许使用商品饵料</text>
					</view>
					<view class="rule-item">
						<text class="rule-text">14. 每人限用一根钓竿，禁止多竿垂钓</text>
					</view>
					<view class="rule-item">
						<text class="rule-text">15. 钓获的鱼必须放生，禁止带走</text>
					</view>
					<view class="rule-item">
						<text class="rule-text">16. 保持钓位整洁，垃圾请带走</text>
					</view>
					<view class="rule-item">
						<text class="rule-text">17. 禁止大声喧哗，影响他人垂钓</text>
					</view>
					<view class="rule-item">
						<text class="rule-text">18. 遵守钓场工作人员的管理</text>
					</view>
				</view>
			</view>
		</view>

		<!-- 底部固定报名按钮 -->
		<view class="bottom-button-container">
			<view class="register-button" :class="{ 'disabled': !canRegister }" @click="handleRegister">
				<text class="register-button-text">{{ getButtonText() }}</text>
			</view>
		</view>
	</view>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'

// 活动数据
const activityData = ref({
	id: 1,
	title: '周末钓鱼大赛',
	date: '2024年1月20日 08:00-18:00',
	pondName: '一号塘',
	publishTime: '2024年1月15日 10:00',
	content: '本周末举办钓鱼大赛，冠军可获得现金奖励1000元，亚军500元，季军300元。比赛采用积分制，根据鱼的重量和数量计算得分。欢迎各位钓友踊跃参加！比赛期间提供免费茶水和小食，还有专业摄影师为每位参赛者拍照留念。',
	status: '报名中',
	registeredCount: 15,
	maxCount: 50
})

// 计算是否可以报名
const canRegister = computed(() => {
	return activityData.value.status === '报名中' && 
		   activityData.value.registeredCount < activityData.value.maxCount
})

// 获取按钮文字
const getButtonText = () => {
	if (activityData.value.status === '报满') {
		return '已报满'
	} else if (activityData.value.status === '未开始') {
		return '未开始报名'
	} else if (activityData.value.status === '已结束') {
		return '活动已结束'
	} else {
		return '立即报名'
	}
}

// 获取状态样式类
const getStatusClass = (status) => {
	switch (status) {
		case '未开始':
			return 'status-not-started'
		case '报名中':
			return 'status-registering'
		case '报满':
			return 'status-full'
		case '已结束':
			return 'status-ended'
		default:
			return 'status-default'
	}
}

// 返回上一页
const goBack = () => {
	uni.navigateBack()
}

// 处理报名
const handleRegister = () => {
	if (!canRegister.value) {
		uni.showToast({
			title: '当前无法报名',
			icon: 'none'
		})
		return
	}

	uni.showModal({
		title: '确认报名',
		content: `确定要报名参加"${activityData.value.title}"吗？`,
		success: (res) => {
			if (res.confirm) {
				// 模拟报名成功
				activityData.value.registeredCount++
				if (activityData.value.registeredCount >= activityData.value.maxCount) {
					activityData.value.status = '报满'
				}
				
				uni.showToast({
					title: '报名成功！',
					icon: 'success'
				})
			}
		}
	})
}

// 页面加载时接收参数
onMounted(() => {
	const pages = getCurrentPages()
	const currentPage = pages[pages.length - 1]
	const options = currentPage.options
	
	console.log('活动详情页加载，接收参数:', options)
	if (options.activityId) {
		console.log('获取活动详情，ID:', options.activityId)
		// 根据activityId获取具体的活动数据
		loadActivityData(options.activityId)
	}
	if (options.activityTitle) {
		// 解码URL编码的活动标题
		const decodedTitle = decodeURIComponent(options.activityTitle)
		activityData.value.title = decodedTitle
	}
})

// 根据活动ID加载活动数据
const loadActivityData = (activityId) => {
	// 这里可以根据activityId从服务器获取具体的活动数据
	// 目前使用模拟数据
	const activities = {
		1: {
			id: 1,
			title: '周末钓鱼大赛',
			date: '2024年1月20日 08:00-18:00',
			pondName: '一号塘',
			publishTime: '2024年1月15日 10:00',
			content: '本周末举办钓鱼大赛，冠军可获得现金奖励1000元，亚军500元，季军300元。比赛采用积分制，根据鱼的重量和数量计算得分。欢迎各位钓友踊跃参加！比赛期间提供免费茶水和小食，还有专业摄影师为每位参赛者拍照留念。',
			status: '报名中',
			registeredCount: 15,
			maxCount: 50
		},
		2: {
			id: 2,
			title: '新鱼投放通知',
			date: '2024年1月18日 全天',
			pondName: '二号塘',
			publishTime: '2024年1月16日 14:30',
			content: '本周三将投放新鲜鲤鱼3000斤，鱼情将会更好，请大家关注！投放时间为上午9点，届时会有专业工作人员进行投放，欢迎钓友们前来观看。',
			status: '未开始',
			registeredCount: 0,
			maxCount: 100
		},
		3: {
			id: 3,
			title: '钓场维护通知',
			date: '2024年1月15日 全天',
			pondName: '全场',
			publishTime: '2024年1月14日 16:00',
			content: '本周一钓场进行设备维护，暂停营业一天，周二正常营业。维护内容包括：钓位设施检查、水质检测、设备更新等。',
			status: '已结束',
			registeredCount: 0,
			maxCount: 0
		}
	}
	
	const activity = activities[activityId]
	if (activity) {
		activityData.value = { ...activity }
	}
}
</script>

<style scoped>
.container {
	min-height: 100vh;
	background-color: #f5f5f5;
	padding-bottom: 120rpx; /* 为底部按钮留出空间 */
}

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

/* 活动内容样式 */
.activity-content {
	background: #ffffff;
	margin: 20rpx;
	border-radius: 16rpx;
	padding: 30rpx;
	box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.08);
}

/* 活动标题 */
.activity-header {
	display: flex;
	justify-content: space-between;
	align-items: flex-start;
	margin-bottom: 20rpx;
}

.activity-title {
	font-size: 36rpx;
	font-weight: 600;
	color: #333;
	flex: 1;
	line-height: 1.4;
}

.activity-status {
	padding: 8rpx 16rpx;
	border-radius: 20rpx;
	margin-left: 20rpx;
	flex-shrink: 0;
}

.activity-status-text {
	font-size: 28rpx;
	font-weight: 600;
}

/* 状态样式 - 去掉底色，只保留字体颜色 */
.status-not-started .activity-status-text {
	color: #0369a1;
}

.status-registering .activity-status-text {
	color: #16a34a;
}

.status-full .activity-status-text {
	color: #dc2626;
}

.status-ended .activity-status-text {
	color: #6b7280;
}

/* 活动时间 */
.activity-time {
	display: flex;
	align-items: center;
	margin-bottom: 20rpx;
	padding: 15rpx 20rpx;
	background: #f8fafc;
	border-radius: 12rpx;
	border-left: 4rpx solid #07c160;
}

.time-label {
	font-size: 28rpx;
	color: #666;
	margin-right: 10rpx;
}

.time-value {
	font-size: 28rpx;
	color: #333;
	font-weight: 500;
}

/* 比赛钓塘 */
.activity-pond {
	display: flex;
	align-items: center;
	margin-bottom: 20rpx;
	padding: 15rpx 20rpx;
	background: #f8fafc;
	border-radius: 12rpx;
	border-left: 4rpx solid #07c160;
}

.pond-label {
	font-size: 28rpx;
	color: #666;
	margin-right: 10rpx;
}

.pond-value {
	font-size: 28rpx;
	color: #333;
	font-weight: 500;
}

/* 发布时间 */
.activity-publish-time {
	display: flex;
	align-items: center;
	margin-bottom: 20rpx;
	padding: 15rpx 20rpx;
	background: #f8fafc;
	border-radius: 12rpx;
	border-left: 4rpx solid #07c160;
}

.publish-label {
	font-size: 28rpx;
	color: #666;
	margin-right: 10rpx;
}

.publish-value {
	font-size: 28rpx;
	color: #333;
	font-weight: 500;
}


/* 报名信息 */
.registration-info {
	display: flex;
	align-items: center;
	margin-bottom: 30rpx;
	padding: 15rpx 20rpx;
	background: #fff8e1;
	border-radius: 12rpx;
	border-left: 4rpx solid #ffa726;
}

.registration-label {
	font-size: 28rpx;
	color: #666;
	margin-right: 10rpx;
}

.registration-count {
	font-size: 32rpx;
	color: #e65100;
	font-weight: 600;
	margin-right: 5rpx;
}

.registration-total {
	font-size: 28rpx;
	color: #999;
}

/* 垂钓章程 */
.activity-rules {
	margin-bottom: 20rpx;
}

.rules-title {
	font-size: 32rpx;
	font-weight: 600;
	color: #666;
	margin-bottom: 20rpx;
	text-align: center;
	display: block;
}

.rules-content {
	background: transparent;
	padding: 20rpx;
	border-radius: 8rpx;
}

.rule-item {
	padding: 8rpx 0;
	border-bottom: 1rpx solid #e5e5e5;
}

.rule-item:last-child {
	border-bottom: none;
}

.rule-text {
	font-size: 26rpx;
	color: #666;
	line-height: 1.6;
}

/* 底部按钮 - 与立即购票按钮样式保持一致 */
.bottom-button-container {
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	background: #ffffff;
	padding: 20rpx 30rpx;
	box-shadow: 0 -2rpx 10rpx rgba(0, 0, 0, 0.1);
	z-index: 1000;
	display: flex;
	justify-content: center;
}

.register-button {
	background: #07c160;
	border-radius: 25rpx;
	padding: 20rpx 80rpx;
	box-shadow: 0 4rpx 12rpx rgba(7, 193, 96, 0.3);
	transition: all 0.3s ease;
}

.register-button:active {
	transform: translateY(2rpx);
	box-shadow: 0 2rpx 8rpx rgba(7, 193, 96, 0.4);
}

.register-button.disabled {
	background: #d1d5db;
	box-shadow: none;
}

.register-button.disabled:active {
	transform: none;
}

.register-button-text {
	font-size: 32rpx;
	color: #ffffff;
	font-weight: 600;
}

.register-button.disabled .register-button-text {
	color: #9ca3af;
}
</style>
