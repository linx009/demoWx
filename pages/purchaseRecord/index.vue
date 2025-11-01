<template>
	<view class="container">
		<!-- 顶部导航栏 -->
		<view class="navbar">
			<view class="nav-content">
				<view class="nav-left" @click="goBack">
					<text class="back-icon">←</text>
				</view>
				<view class="nav-center">
					<text class="nav-title">购票记录</text>
				</view>
				<view class="nav-right"></view>
			</view>
		</view>

		<!-- 购票记录列表 -->
		<view class="record-list">
			<view v-if="purchaseRecords.length === 0" class="empty-state">
				<text class="empty-icon">🎫</text>
				<text class="empty-text">暂无购票记录</text>
				<text class="empty-desc">快去购买鱼票吧</text>
			</view>
			
			<view v-else class="record-items">
				<view 
					v-for="(record, index) in sortedRecords" 
					:key="record.id" 
					class="record-item"
					:class="{ 'used': record.status === 'used' }"
					@click="goToTicketDetail(record)"
				>
					<view class="record-content">
						<text class="record-date">{{ formatDate(record.purchaseTime, record.status) }}</text>
						<text class="record-location">{{ record.location }}</text>
						<text class="record-amount">¥{{ record.amount }}</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

// 购票记录数据
const purchaseRecords = ref([
	{
		id: 1,
		ticketName: '周末正钓票',
		ticketType: '正钓',
		location: '阳光钓场·1号鱼塘',
		amount: 120,
		purchaseTime: '2024-01-20 14:30:00',
		useTime: '2024-01-21 08:00:00',
		status: 'used' // used: 已使用, available: 可用
	},
	{
		id: 2,
		ticketName: '随到随钓票',
		ticketType: '随到随钓',
		location: '绿野钓场·2号鱼塘',
		amount: 80,
		purchaseTime: '2024-01-19 09:15:00',
		useTime: null,
		status: 'available'
	},
	{
		id: 3,
		ticketName: '比赛专用票',
		ticketType: '比赛',
		location: '竞技钓场·比赛池',
		amount: 200,
		purchaseTime: '2024-01-18 16:45:00',
		useTime: '2024-01-19 09:30:00',
		status: 'used'
	},
	{
		id: 4,
		ticketName: '夜钓票',
		ticketType: '夜钓',
		location: '月光钓场·夜钓区',
		amount: 100,
		purchaseTime: '2024-01-17 20:20:00',
		useTime: null,
		status: 'available'
	},
	{
		id: 5,
		ticketName: '新手体验票',
		ticketType: '体验',
		location: '新手钓场·练习池',
		amount: 50,
		purchaseTime: '2024-01-16 11:30:00',
		useTime: '2024-01-17 14:20:00',
		status: 'used'
	},
	{
		id: 6,
		ticketName: 'VIP专享票',
		ticketType: 'VIP',
		location: '豪华钓场·VIP区',
		amount: 300,
		purchaseTime: '2024-01-15 13:10:00',
		useTime: null,
		status: 'available'
	}
])

// 按时间排序，时间后的在前
const sortedRecords = computed(() => {
	return [...purchaseRecords.value].sort((a, b) => {
		return new Date(b.purchaseTime) - new Date(a.purchaseTime)
	})
})

// 格式化日期显示（购票日期或使用日期）
const formatDate = (purchaseTime, status) => {
	const timeStr = status === 'used' ? purchaseTime : purchaseTime
	const date = new Date(timeStr)
	const month = String(date.getMonth() + 1).padStart(2, '0')
	const day = String(date.getDate()).padStart(2, '0')
	return `${month}-${day}`
}

// 跳转到鱼票详情页面
const goToTicketDetail = (record) => {
	uni.navigateTo({
		url: `/pages/ticket/detail?id=${record.id}&type=${record.ticketType}&fieldName=${record.location.split('·')[0]}&pondName=${record.location.split('·')[1]}&price=${record.amount}`
	})
}

// 返回上一页
const goBack = () => {
	uni.navigateBack()
}

// 页面加载时获取购票记录数据
onMounted(() => {
	// 这里可以从服务器获取真实的购票记录数据
	console.log('购票记录页面加载完成')
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

/* 购票记录列表 */
.record-list {
	padding: 20rpx;
}

.empty-state {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding: 120rpx 40rpx;
	text-align: center;
}

.empty-icon {
	font-size: 120rpx;
	margin-bottom: 30rpx;
	opacity: 0.6;
}

.empty-text {
	font-size: 32rpx;
	color: #666;
	margin-bottom: 16rpx;
	font-weight: 500;
}

.empty-desc {
	font-size: 26rpx;
	color: #999;
}

.record-items {
	background: #ffffff;
	border-radius: 16rpx;
	overflow: hidden;
	box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.08);
}

.record-item {
	padding: 30rpx;
	border-bottom: 1rpx solid #f0f0f0;
	transition: background-color 0.3s ease;
}

.record-item:last-child {
	border-bottom: none;
}

.record-item:active {
	background-color: #f8f8f8;
}

.record-item.used {
	opacity: 0.6;
}

.record-content {
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 20rpx;
}

.record-date {
	font-size: 28rpx;
	color: #666;
	font-weight: 500;
	min-width: 80rpx;
}

.record-location {
	font-size: 30rpx;
	color: #333;
	font-weight: 500;
	flex: 1;
	text-align: center;
}

.record-amount {
	font-size: 30rpx;
	color: #e74c3c;
	font-weight: 600;
	min-width: 100rpx;
	text-align: right;
}

/* 已使用状态样式 */
.record-item.used .record-date {
	color: #999;
}

.record-item.used .record-location {
	color: #999;
}

.record-item.used .record-amount {
	color: #999;
}
</style>
