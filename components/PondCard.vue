<template>
	<view class="pond-card" @click="handleClick">
		<view class="card-header">
			<text class="pond-name">{{ pond.name }}</text>
			<text class="pond-price">{{ formatPrice(pond.price) }}</text>
		</view>
		<view class="card-content">
			<!-- 第一行：回鱼与底鱼 -->
			<view class="card-row">
				<view class="card-item">
					<text class="card-label">回鱼：</text>
					<text class="card-value">{{ pond.returnPrice }}</text>
				</view>
				<view class="card-item">
					<text class="card-label">底鱼：</text>
					<text class="card-value">{{ pond.baseFish }}</text>
				</view>
			</view>
			<!-- 第二行：钓位数与选位方式 -->
			<view class="card-row">
				<view class="card-item">
					<text class="card-label">钓位数：</text>
					<text class="card-value">{{ pond.spots }}个</text>
				</view>
				<view class="card-item">
					<text class="card-label">选位方式：</text>
					<text class="card-value">{{ pond.selectionMethod || '先到先得' }}</text>
				</view>
			</view>
			<!-- 第三行：作钓时长与上日坑冠 -->
			<view class="card-row">
				<view class="card-item">
					<text class="card-label">作钓时长：</text>
					<text class="card-value">{{ pond.duration }}</text>
				</view>
				<view class="card-item">
					<text class="card-label">上日坑冠：</text>
					<text class="card-value">{{ pond.champion }}</text>
				</view>
			</view>
		</view>
		<!-- 我要购票按钮 -->
		<view class="fishing-button-container">
			<view class="fishing-button">
				<text class="fishing-button-text">我要购票</text>
			</view>
		</view>
	</view>
</template>

<script setup>
// 定义组件属性
const props = defineProps({
	pond: {
		type: Object,
		required: true,
		default: () => ({
			name: '一号塘',
			price: '50元/4小时',
			returnPrice: '3元/斤',
			baseFish: '2000斤',
			spots: '20',
			selectionMethod: '先到先得',
			duration: '4小时',
			champion: '钓友老李 68斤'
		})
	}
})

// 定义事件
const emit = defineEmits(['click'])

// 格式化价格显示：从"50元/4小时"简化为"50元"
const formatPrice = (price) => {
	if (!price) return ''
	// 提取价格部分，去掉时间部分
	const priceMatch = price.match(/(\d+)元/)
	return priceMatch ? `${priceMatch[1]}元` : price
}

// 处理点击事件
const handleClick = () => {
	console.log('PondCard点击事件触发:', props.pond)
	emit('click', props.pond)
}
</script>

<style scoped>
/* 鱼塘卡片样式 */
.pond-card {
	background: #ffffff;
	border-radius: 12rpx;
	padding: 25rpx;
	box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.15);
	transition: all 0.3s ease;
	position: relative;
}

.pond-card:active {
	transform: scale(0.98);
	box-shadow: 0 1rpx 4rpx rgba(0, 0, 0, 0.1);
}

/* 卡片头部 */
.card-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding-right: 20rpx;
	border-bottom: none;
	text-decoration: none;
}

.pond-name {
	font-size: 36rpx;
	font-weight: 600;
	color: #333;
	text-decoration: none;
}

.pond-price {
	font-size: 32rpx;
	color: #e74c3c;
	font-weight: 600;
	text-decoration: none;
}

/* 卡片内容 */
.card-content {
	display: flex;
	flex-direction: column;
	gap: 20rpx;
	margin-top: 15rpx;
}

.card-row {
	display: flex;
	justify-content: space-between;
	gap: 20rpx;
}

.card-item {
	display: flex;
	align-items: center;
	flex: 1;
}

.card-label {
	font-size: 28rpx;
	color: #666;
	margin-right: 8rpx;
}

.card-value {
	font-size: 28rpx;
	color: #333;
	font-weight: 500;
}

/* 购票按钮容器 */
.fishing-button-container {
	display: flex;
	justify-content: center;
	margin-top: 20rpx;
}

/* 购票按钮 */
.fishing-button {
	background: transparent;
	border: 2rpx solid #07c160;
	border-radius: 20rpx;
	padding: 10rpx 80rpx;
	box-shadow: 0 4rpx 12rpx rgba(7, 193, 96, 0.2);
	transition: all 0.3s ease;
	position: relative;
	overflow: hidden;
}

.fishing-button::before {
	content: '';
	position: absolute;
	top: 0;
	left: -100%;
	width: 100%;
	height: 100%;
	background: linear-gradient(90deg, transparent, rgba(7, 193, 96, 0.1), transparent);
	transition: left 0.5s ease;
}

.fishing-button:active {
	transform: translateY(2rpx);
	box-shadow: 0 2rpx 8rpx rgba(7, 193, 96, 0.3);
}

.fishing-button:active::before {
	left: 100%;
}

.fishing-button-text {
	font-size: 28rpx;
	color: #07c160;
	font-weight: 600;
	position: relative;
	z-index: 1;
}
</style>
