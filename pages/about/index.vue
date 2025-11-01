<template>
	<view class="container">
		<!-- 顶部导航栏 -->
		<view class="navbar">
			<view class="nav-content">
				<view class="nav-left" @click="goBack">
					<text class="back-icon">←</text>
				</view>
				<view class="nav-center">
					<text class="nav-title">关于坑冠大师</text>
				</view>
				<view class="nav-right"></view>
			</view>
		</view>

		<!-- 内容区域 -->
		<view class="content">
			<!-- 软件介绍 -->
			<view class="section">
				<view class="section-title">
					<text class="title-text">软件介绍</text>
				</view>
				<view class="section-content">
					<text class="intro-text">{{ appIntroduction }}</text>
				</view>
			</view>

			<!-- 投诉 -->
			<view class="section">
				<view class="section-title">
					<text class="title-text">投诉</text>
				</view>
				<view class="section-content">
					<view class="complaint-item" @click="handleComplaint">
						<view class="complaint-info">
							<text class="complaint-label">意见反馈</text>
							<text class="complaint-desc">如遇问题或有建议，请点击反馈</text>
						</view>
						<text class="chevron-icon">›</text>
					</view>
					<view class="complaint-item" @click="handleContact">
						<view class="complaint-info">
							<text class="complaint-label">联系我们</text>
							<text class="complaint-desc">客服电话：400-888-8888</text>
						</view>
						<text class="chevron-icon">›</text>
					</view>
				</view>
			</view>

			<!-- 版本信息 -->
			<view class="section">
				<view class="section-title">
					<text class="title-text">版本信息</text>
				</view>
				<view class="section-content">
					<view class="version-item">
						<text class="version-label">当前版本</text>
						<text class="version-value">{{ appVersion }}</text>
					</view>
					<view class="version-item">
						<text class="version-label">更新日期</text>
						<text class="version-value">{{ updateDate }}</text>
					</view>
					<view class="version-item">
						<text class="version-label">开发团队</text>
						<text class="version-value">{{ developer }}</text>
					</view>
					<view class="version-item">
						<text class="version-label">版权所有</text>
						<text class="version-value">{{ copyright }}</text>
					</view>
					<view class="check-update-btn" @click="checkUpdate">
						<text class="update-btn-text">检查更新</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// 软件介绍
const appIntroduction = ref('坑冠大师是一款专业的钓鱼服务平台，致力于为钓友提供全方位的钓鱼服务。我们提供鱼票购买、钓场信息、活动报名、成绩记录等功能，让您的钓鱼之旅更加便捷和精彩。平台汇聚了众多优质钓场资源，为广大钓友打造一个专业、便捷、有趣的钓鱼社区。')

// 版本信息
const appVersion = ref('1.0.0')
const updateDate = ref('2024-01-20')
const developer = ref('坑冠大师开发团队')
const copyright = ref('© 2024 坑冠大师 All Rights Reserved')

// 返回上一页
const goBack = () => {
	uni.navigateBack()
}

// 处理投诉/意见反馈
const handleComplaint = () => {
	uni.showModal({
		title: '意见反馈',
		content: '请选择反馈方式',
		confirmText: '在线反馈',
		cancelText: '取消',
		success: (res) => {
			if (res.confirm) {
				// 这里可以跳转到反馈页面或打开反馈表单
				uni.showToast({
					title: '反馈功能开发中',
					icon: 'none'
				})
			}
		}
	})
}

// 处理联系我们
const handleContact = () => {
	uni.showModal({
		title: '联系我们',
		content: '客服电话：400-888-8888\n工作时间：周一至周日 9:00-18:00',
		confirmText: '拨打',
		cancelText: '取消',
		success: (res) => {
			if (res.confirm) {
				uni.makePhoneCall({
					phoneNumber: '400-888-8888',
					fail: () => {
						uni.showToast({
							title: '拨号失败',
							icon: 'none'
						})
					}
				})
			}
		}
	})
}

// 检查更新
const checkUpdate = () => {
	uni.showLoading({
		title: '检查中...'
	})
	
	// 模拟检查更新
	setTimeout(() => {
		uni.hideLoading()
		uni.showModal({
			title: '版本检查',
			content: '当前已是最新版本',
			showCancel: false,
			confirmText: '确定'
		})
	}, 1500)
}

onMounted(() => {
	console.log('关于坑冠大师页面加载完成')
})
</script>

<style scoped>
.container {
	min-height: 100vh;
	background-color: #f5f5f5;
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

/* 内容区域 */
.content {
	padding: 20rpx;
}

.section {
	background: #ffffff;
	border-radius: 16rpx;
	margin-bottom: 20rpx;
	box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.08);
	overflow: hidden;
}

.section-title {
	padding: 30rpx;
	border-bottom: 1rpx solid #f0f0f0;
	background: #fbfbfb;
}

.title-text {
	font-size: 32rpx;
	font-weight: 600;
	color: #333;
}

.section-content {
	padding: 30rpx;
}

/* 软件介绍 */
.intro-text {
	font-size: 28rpx;
	color: #666;
	line-height: 1.8;
	text-align: justify;
}

/* 投诉 */
.complaint-item {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 30rpx 0;
	border-bottom: 1rpx solid #f0f0f0;
	transition: background-color 0.3s ease;
}

.complaint-item:last-child {
	border-bottom: none;
}

.complaint-item:active {
	background-color: #f8f8f8;
	border-radius: 8rpx;
	margin: 0 -10rpx;
	padding: 30rpx 10rpx;
}

.complaint-info {
	flex: 1;
	display: flex;
	flex-direction: column;
	gap: 8rpx;
}

.complaint-label {
	font-size: 30rpx;
	color: #333;
	font-weight: 500;
}

.complaint-desc {
	font-size: 24rpx;
	color: #999;
}

.chevron-icon {
	font-size: 32rpx;
	color: #999;
	font-weight: bold;
	margin-left: 20rpx;
}

/* 版本信息 */
.version-item {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 24rpx 0;
	border-bottom: 1rpx solid #f0f0f0;
}

.version-item:last-child {
	border-bottom: none;
}

.version-label {
	font-size: 28rpx;
	color: #666;
}

.version-value {
	font-size: 28rpx;
	color: #333;
	font-weight: 500;
}

.check-update-btn {
	margin-top: 30rpx;
	background: #07c160;
	border-radius: 25rpx;
	padding: 24rpx;
	text-align: center;
	box-shadow: 0 4rpx 12rpx rgba(7, 193, 96, 0.3);
	transition: all 0.3s ease;
}

.check-update-btn:active {
	transform: translateY(2rpx);
	box-shadow: 0 2rpx 8rpx rgba(7, 193, 96, 0.4);
}

.update-btn-text {
	font-size: 30rpx;
	color: #ffffff;
	font-weight: 600;
}
</style>
