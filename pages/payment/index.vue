<template>
	<view class="container">
		<!-- 顶部导航栏 -->
		<view class="navbar">
			<view class="nav-content">
				<view class="nav-left" @click="goBack">
					<text class="back-icon">←</text>
				</view>
				<view class="nav-center">
					<text class="nav-title">支付</text>
				</view>
				<view class="nav-right"></view>
			</view>
		</view>

		<!-- 订单信息 -->
		<view class="order-card">
			<view class="order-header">
				<text class="order-title">订单详情</text>
				<text class="order-number">订单号：{{ orderNumber }}</text>
			</view>
			<view class="order-content">
				<view class="order-item">
					<text class="item-label">鱼塘：</text>
					<text class="item-value">{{ orderInfo.pondName }}</text>
				</view>
				<view class="order-item">
					<text class="item-label">钓位：</text>
					<text class="item-value">购票后选择</text>
				</view>
				<view class="order-item">
					<text class="item-label">票价：</text>
					<text class="item-value price">{{ orderInfo.price }}</text>
				</view>
				<view class="order-item">
					<text class="item-label">购票时间：</text>
					<text class="item-value">{{ orderInfo.purchaseTime }}</text>
				</view>
			</view>
		</view>

		<!-- 支付方式选择 -->
		<view class="payment-methods">
			<view class="section-title">选择支付方式</view>
			<view class="method-list">
				<view 
					class="method-item"
					:class="{ 'selected': selectedMethod === 'wechat' }"
					@click="selectPaymentMethod('wechat')"
				>
					<view class="method-icon">
						<text class="icon-text">💚</text>
					</view>
					<view class="method-info">
						<text class="method-name">微信支付</text>
						<text class="method-desc">推荐使用</text>
					</view>
					<view class="method-radio">
						<view class="radio-circle" :class="{ 'checked': selectedMethod === 'wechat' }"></view>
					</view>
				</view>
			</view>
		</view>

		<!-- 支付金额 -->
		<view class="payment-amount">
			<view class="amount-label">支付金额</view>
			<view class="amount-value">¥{{ orderInfo.amount }}</view>
		</view>

		<!-- 固定底部支付按钮 -->
		<view class="fixed-pay-button">
			<view class="pay-button" @click="handlePayment">
				<text class="pay-button-text">立即支付</text>
			</view>
		</view>
	</view>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// 页面数据
const selectedMethod = ref('wechat')
const orderNumber = ref('')
const orderInfo = ref({
	pondName: '一号塘',
	positionId: 1,
	price: '50元/4小时',
	amount: 50,
	purchaseTime: ''
})

// 页面方法
const goBack = () => {
	uni.navigateBack()
}

// 选择支付方式
const selectPaymentMethod = (method) => {
	selectedMethod.value = method
}

// 生成订单号
const generateOrderNumber = () => {
	const now = new Date()
	const timestamp = now.getTime()
	const random = Math.floor(Math.random() * 1000)
	return `TK${timestamp}${random}`
}

// 处理支付
const handlePayment = () => {
	if (!selectedMethod.value) {
		uni.showToast({
			title: '请选择支付方式',
			icon: 'none'
		})
		return
	}

	// 直接开始支付，不显示确认对话框
	// 模拟支付过程
	uni.showLoading({
		title: '支付中...'
	})

	// 模拟支付延迟
	setTimeout(() => {
		uni.hideLoading()
		
		// 支付成功，显示成功提示并跳转到选择钓位选项卡
		uni.showToast({
			title: '支付成功',
			icon: 'success',
			duration: 2000
		})
		
		// 2秒后跳转到鱼塘页面的选择钓位选项卡
		setTimeout(() => {
			// 获取当前页面参数
			const pages = getCurrentPages()
			const currentPage = pages[pages.length - 1]
			const options = currentPage.options
			
			// 跳转到鱼塘页面，并传递参数指定要显示的选项卡
			uni.navigateTo({
				url: `/pages/pond/detail?pondId=${options.pondId || 1}&pondName=${options.pondName || '一号塘'}&activeTab=position`
			})
		}, 2000)
	}, 2000)
}

// 获取当前时间
const getCurrentTime = () => {
	const now = new Date()
	const year = now.getFullYear()
	const month = String(now.getMonth() + 1).padStart(2, '0')
	const day = String(now.getDate()).padStart(2, '0')
	const hours = String(now.getHours()).padStart(2, '0')
	const minutes = String(now.getMinutes()).padStart(2, '0')
	
	return `${year}-${month}-${day} ${hours}:${minutes}`
}

// 页面加载时接收参数
onMounted(() => {
	const pages = getCurrentPages()
	const currentPage = pages[pages.length - 1]
	const options = currentPage.options
	
	console.log('支付页面加载，接收参数:', options)
	
	// 生成订单号
	orderNumber.value = generateOrderNumber()
	
	// 更新购票时间
	orderInfo.value.purchaseTime = getCurrentTime()
	
	// 根据传入的参数更新订单信息
	if (options.pondId) {
		orderInfo.value.pondName = options.pondName || '一号塘'
	}
	if (options.price) {
		// 从价格字符串中提取数字
		const priceMatch = options.price.match(/(\d+)/)
		if (priceMatch) {
			orderInfo.value.amount = parseInt(priceMatch[1])
		}
	}
})
</script>

<style scoped>
.container {
	min-height: 100vh;
	background-color: #f0f0f0;
	padding-bottom: 120rpx;
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

/* 订单信息卡片 */
.order-card {
	background: #ffffff;
	margin: 20rpx 30rpx;
	padding: 30rpx;
	border-radius: 12rpx;
	box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.1);
}

.order-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 20rpx;
}

.order-title {
	font-size: 32rpx;
	font-weight: 600;
	color: #333;
}

.order-number {
	font-size: 24rpx;
	color: #999;
}

.order-content {
	display: flex;
	flex-direction: column;
	gap: 15rpx;
}

.order-item {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 10rpx 0;
	border-bottom: 1rpx solid #f0f0f0;
}

.order-item:last-child {
	border-bottom: none;
}

.item-label {
	font-size: 28rpx;
	color: #666;
}

.item-value {
	font-size: 28rpx;
	color: #333;
	font-weight: 500;
}

.item-value.price {
	color: #e74c3c;
	font-weight: 600;
}

/* 支付方式选择 */
.payment-methods {
	background: #ffffff;
	margin: 20rpx 30rpx;
	padding: 30rpx;
	border-radius: 12rpx;
	box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.1);
}

.section-title {
	font-size: 32rpx;
	font-weight: 600;
	color: #333;
	margin-bottom: 20rpx;
}

.method-list {
	display: flex;
	flex-direction: column;
	gap: 15rpx;
}

.method-item {
	display: flex;
	align-items: center;
	padding: 20rpx;
	border: 2rpx solid #e5e5e5;
	border-radius: 8rpx;
	transition: all 0.3s ease;
}

.method-item.selected {
	border-color: #07c160;
	background: #f0fff4;
}

.method-icon {
	width: 60rpx;
	height: 60rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	margin-right: 20rpx;
}

.icon-text {
	font-size: 40rpx;
}

.method-info {
	flex: 1;
	display: flex;
	flex-direction: column;
	gap: 5rpx;
}

.method-name {
	font-size: 30rpx;
	color: #333;
	font-weight: 500;
}

.method-desc {
	font-size: 24rpx;
	color: #999;
}

.method-radio {
	width: 40rpx;
	height: 40rpx;
	display: flex;
	align-items: center;
	justify-content: center;
}

.radio-circle {
	width: 30rpx;
	height: 30rpx;
	border: 2rpx solid #e5e5e5;
	border-radius: 50%;
	transition: all 0.3s ease;
}

.radio-circle.checked {
	border-color: #07c160;
	background: #07c160;
	position: relative;
}

.radio-circle.checked::after {
	content: '';
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	width: 12rpx;
	height: 12rpx;
	background: #ffffff;
	border-radius: 50%;
}

/* 支付金额 */
.payment-amount {
	background: #ffffff;
	margin: 20rpx 30rpx;
	padding: 30rpx;
	border-radius: 12rpx;
	box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.1);
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.amount-label {
	font-size: 32rpx;
	color: #333;
	font-weight: 500;
}

.amount-value {
	font-size: 40rpx;
	color: #e74c3c;
	font-weight: 600;
}

/* 固定底部支付按钮 */
.fixed-pay-button {
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

.pay-button {
	background: #07c160;
	border-radius: 25rpx;
	padding: 20rpx 80rpx;
	box-shadow: 0 4rpx 12rpx rgba(7, 193, 96, 0.3);
	transition: all 0.3s ease;
}

.pay-button:active {
	transform: translateY(2rpx);
	box-shadow: 0 2rpx 8rpx rgba(7, 193, 96, 0.4);
}

.pay-button-text {
	font-size: 32rpx;
	color: #ffffff;
	font-weight: 600;
}
</style>
