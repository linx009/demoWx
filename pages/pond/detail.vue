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

		<!-- 鱼塘照片 -->
		<view class="photos-section">
			<swiper class="photo-swiper" indicator-dots="true" autoplay="true">
				<swiper-item v-for="(photo, index) in pondDetail.photos" :key="index">
					<image :src="photo" class="pond-photo" mode="aspectFill"></image>
				</swiper-item>
			</swiper>
		</view>

		<!-- 鱼塘基本信息 -->
		<view class="pond-info">
			<view class="pond-location">
				<text class="location-text">{{ pondDetail.location }}</text>
				<text class="distance-text">{{ pondDetail.distance }}</text>
			</view>
			
			<view class="pond-details">
				<view class="detail-item">
					<text class="detail-label">鱼种：</text>
					<text class="detail-value">{{ pondDetail.fishSpecies }}</text>
				</view>
				<view class="detail-item">
					<text class="detail-label">数量：</text>
					<text class="detail-value">{{ pondDetail.fishQuantity }}</text>
				</view>
				<view class="detail-item">
					<text class="detail-label">钓费：</text>
					<text class="detail-value">{{ pondDetail.fee }}</text>
				</view>
				<view class="detail-item">
					<text class="detail-label">回鱼：</text>
					<text class="detail-value">{{ pondDetail.returnPrice }}</text>
				</view>
				<view class="detail-item">
					<text class="detail-label">钓位数：</text>
					<text class="detail-value">{{ pondDetail.spots }}个</text>
				</view>
				<view class="detail-item">
					<text class="detail-label">时间：</text>
					<text class="detail-value">{{ pondDetail.time }}</text>
				</view>
			</view>
		</view>

		<!-- 钓鱼章程 -->
		<view class="rules-section">
			<text class="section-title">钓鱼章程</text>
			<view class="rules-list">
				<view class="rule-item" v-for="(rule, index) in pondDetail.rules" :key="index">
					<text class="rule-number">{{ index + 1 }}.</text>
					<text class="rule-text">{{ rule }}</text>
				</view>
			</view>
		</view>

		<!-- 塘主信息 -->
		<view class="owner-section">
			<text class="section-title">塘主信息</text>
			<view class="owner-info">
				<image :src="pondDetail.owner.avatar" class="owner-avatar"></image>
				<view class="owner-details">
					<text class="owner-name">{{ pondDetail.owner.name }}</text>
					<text class="owner-phone">{{ pondDetail.owner.phone }}</text>
					<text class="owner-experience">经营{{ pondDetail.owner.experience }}年</text>
				</view>
				<view class="owner-actions">
					<button class="contact-btn" @click="contactOwner">联系塘主</button>
					<button class="call-btn" @click="callOwner">拨打电话</button>
				</view>
			</view>
		</view>

		<!-- 用户评价 -->
		<view class="reviews-section">
			<text class="section-title">用户评价</text>
			<view class="reviews-list">
				<view class="review-item" v-for="(review, index) in pondDetail.reviews" :key="index">
					<view class="review-header">
						<image :src="review.avatar" class="reviewer-avatar"></image>
						<text class="reviewer-name">{{ review.name }}</text>
						<text class="review-rating">{{ review.rating }}分</text>
					</view>
					<text class="review-content">{{ review.content }}</text>
					<text class="review-date">{{ review.date }}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// 页面数据
const pondDetail = ref({
	pondName: '朝阳湖钓场',
	infoType: '正钓',
	infoStatus: '报名中',
	location: '北京市朝阳区朝阳公园内',
	distance: '距离2.5km',
	time: '星期六上午8点',
	spots: 50,
	fishSpecies: '鲤鱼',
	fishQuantity: '5000斤',
	fee: '50元/4小时',
	returnPrice: '4元/斤',
	champion: '钓友老李 68斤',
	message: '今天鱼情不错，大家快来！',
	photos: [
		'https://picsum.photos/400/300?random=pond1',
		'https://picsum.photos/400/300?random=pond2',
		'https://picsum.photos/400/300?random=pond3'
	],
	rules: [
		'禁止使用活饵，只能使用商品饵料',
		'禁止打窝，只能使用手竿',
		'每人限用一根鱼竿，禁止多竿垂钓',
		'禁止在钓场内大声喧哗，保持安静',
		'禁止乱扔垃圾，请保持钓场清洁',
		'钓获的鱼必须全部放回，禁止带走',
		'禁止在钓场内吸烟，注意防火安全',
		'请遵守钓场规定，文明垂钓'
	],
	owner: {
		name: '张老板',
		phone: '138****8888',
		avatar: 'https://picsum.photos/100/100?random=owner',
		experience: 8
	},
	reviews: [
		{
			name: '钓友小王',
			avatar: 'https://picsum.photos/50/50?random=user1',
			rating: 5,
			content: '环境很好，鱼情也不错，老板人很热情，推荐！',
			date: '2024-01-15'
		},
		{
			name: '钓鱼达人',
			avatar: 'https://picsum.photos/50/50?random=user2',
			rating: 4,
			content: '钓位比较紧张，需要提前预订，整体体验还可以。',
			date: '2024-01-10'
		}
	]
})

// 页面方法
const goBack = () => {
	uni.navigateBack()
}

const contactOwner = () => {
	uni.showModal({
		title: '联系塘主',
		content: `是否拨打塘主电话：${pondDetail.value.owner.phone}？`,
		success: (res) => {
			if (res.confirm) {
				uni.makePhoneCall({
					phoneNumber: pondDetail.value.owner.phone
				})
			}
		}
	})
}

const callOwner = () => {
	uni.makePhoneCall({
		phoneNumber: pondDetail.value.owner.phone
	})
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

.pond-info {
	padding: 30rpx;
	border-bottom: 1rpx solid #f0f0f0;
}


.pond-location {
	margin-bottom: 20rpx;
}

.location-text {
	font-size: 30rpx;
	color: #666;
	display: block;
	margin-bottom: 8rpx;
}

.distance-text {
	font-size: 26rpx;
	color: #1976d2;
	font-weight: 600;
}

.pond-details {
	display: flex;
	flex-direction: column;
	gap: 12rpx;
}

.detail-item {
	display: flex;
	align-items: center;
}

.detail-label {
	font-size: 28rpx;
	color: #666;
	width: 120rpx;
}

.detail-value {
	font-size: 28rpx;
	color: #333;
	font-weight: 600;
}

.photos-section {
	padding: 0;
	border-bottom: 1rpx solid #f0f0f0;
}

.rules-section, .owner-section, .reviews-section {
	padding: 30rpx;
	border-bottom: 1rpx solid #f0f0f0;
}

.section-title {
	font-size: 32rpx;
	font-weight: 600;
	color: #333;
	display: block;
	margin-bottom: 20rpx;
}

.photo-swiper {
	height: 300rpx;
}

.pond-photo {
	width: 100%;
	height: 100%;
}

.rules-list {
	display: flex;
	flex-direction: column;
	gap: 15rpx;
}

.rule-item {
	display: flex;
	align-items: flex-start;
	gap: 15rpx;
	padding: 15rpx;
	background: #f8f9fa;
	border-radius: 8rpx;
}

.rule-number {
	font-size: 28rpx;
	color: #07c160;
	font-weight: 600;
	width: 40rpx;
}

.rule-text {
	font-size: 28rpx;
	color: #333;
	line-height: 1.5;
	flex: 1;
}

.owner-info {
	display: flex;
	align-items: center;
	gap: 20rpx;
}

.owner-avatar {
	width: 100rpx;
	height: 100rpx;
	border-radius: 50%;
}

.owner-details {
	flex: 1;
	display: flex;
	flex-direction: column;
	gap: 8rpx;
}

.owner-name {
	font-size: 32rpx;
	font-weight: 600;
	color: #333;
}

.owner-phone {
	font-size: 28rpx;
	color: #666;
}

.owner-experience {
	font-size: 24rpx;
	color: #999;
}

.owner-actions {
	display: flex;
	flex-direction: column;
	gap: 10rpx;
}

.contact-btn, .call-btn {
	padding: 12rpx 24rpx;
	border-radius: 20rpx;
	font-size: 24rpx;
	border: none;
}

.contact-btn {
	background: #e3f2fd;
	color: #1976d2;
}

.call-btn {
	background: #07c160;
	color: #ffffff;
}

.reviews-list {
	display: flex;
	flex-direction: column;
	gap: 20rpx;
}

.review-item {
	padding: 20rpx;
	background: #f8f9fa;
	border-radius: 12rpx;
}

.review-header {
	display: flex;
	align-items: center;
	gap: 15rpx;
	margin-bottom: 15rpx;
}

.reviewer-avatar {
	width: 60rpx;
	height: 60rpx;
	border-radius: 50%;
}

.reviewer-name {
	font-size: 28rpx;
	color: #333;
	font-weight: 600;
	flex: 1;
}

.review-rating {
	font-size: 24rpx;
	color: #ffa726;
	font-weight: 600;
}

.review-content {
	font-size: 28rpx;
	color: #333;
	line-height: 1.5;
	margin-bottom: 10rpx;
}

.review-date {
	font-size: 24rpx;
	color: #999;
}

</style>
