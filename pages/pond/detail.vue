<template>
	<view class="container">
		<!-- 顶部导航栏 -->
		<view class="navbar">
			<view class="nav-content">
				<view class="nav-left" @click="goBack">
					<text class="back-icon">←</text>
				</view>
				<view class="nav-center">
					<text class="nav-title">{{ pondName }}</text>
				</view>
				<view class="nav-right"></view>
			</view>
		</view>

		<!-- 一号塘组件 -->
		<PondDetail :pondData="pondData" />
	</view>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import PondDetail from '@/components/PondDetail.vue'

// 页面数据
const pondName = ref('一号塘')
const pondData = ref({
	id: 1,
	name: '一号塘',
	description: '标准竞技池，适合新手和高手',
	// 新增字段
	fishSpecies: '鲤鱼、鲫鱼、草鱼',
	returnPrice: '4元/斤',
	duration: '4小时',
	rodLimit: '每人限用一根钓竿',
	baitLimit: '禁止使用活饵，只允许使用商品饵料',
	baseFish: '5000斤',
	selectionMethod: '先到先得',
	positionChange: '允许更换钓位',
	// 钓位信息 - 24个钓位分布在上下两边
	positions: [
		// 上边钓位 (1-12)
		{ id: 1, x: 5, y: 5, showNumber: true },   // 左上角
		{ id: 2, x: 12, y: 5, showNumber: false },
		{ id: 3, x: 19, y: 5, showNumber: false },
		{ id: 4, x: 26, y: 5, showNumber: false },
		{ id: 5, x: 33, y: 5, showNumber: false },
		{ id: 6, x: 40, y: 5, showNumber: false },
		{ id: 7, x: 50, y: 5, showNumber: true },  // 上边中间
		{ id: 8, x: 60, y: 5, showNumber: false },
		{ id: 9, x: 67, y: 5, showNumber: false },
		{ id: 10, x: 74, y: 5, showNumber: false },
		{ id: 11, x: 81, y: 5, showNumber: false },
		{ id: 12, x: 88, y: 5, showNumber: false },
		{ id: 13, x: 95, y: 5, showNumber: true }, // 右上角
		
		// 下边钓位 (14-24)
		{ id: 14, x: 95, y: 95, showNumber: true }, // 右下角
		{ id: 15, x: 88, y: 95, showNumber: false },
		{ id: 16, x: 81, y: 95, showNumber: false },
		{ id: 17, x: 74, y: 95, showNumber: false },
		{ id: 18, x: 67, y: 95, showNumber: false },
		{ id: 19, x: 60, y: 95, showNumber: false },
		{ id: 20, x: 50, y: 95, showNumber: true }, // 下边中间
		{ id: 21, x: 40, y: 95, showNumber: false },
		{ id: 22, x: 33, y: 95, showNumber: false },
		{ id: 23, x: 26, y: 95, showNumber: false },
		{ id: 24, x: 19, y: 95, showNumber: false },
		{ id: 25, x: 12, y: 95, showNumber: false },
		{ id: 26, x: 5, y: 95, showNumber: true }   // 左下角
	],
	// 章程内容
	rules: [
		'12. 垂钓时间：早上6:00-晚上18:00',
		'13. 禁止使用活饵，只允许使用商品饵料',
		'14. 每人限用一根钓竿，禁止多竿垂钓',
		'15. 钓获的鱼必须放生，禁止带走',
		'16. 保持钓位整洁，垃圾请带走',
		'17. 禁止大声喧哗，影响他人垂钓',
		'18. 遵守钓场工作人员的管理'
	],
})

// 返回上一页
const goBack = () => {
	uni.navigateBack()
}

// 页面加载时接收参数
onMounted(() => {
	const pages = getCurrentPages()
	const currentPage = pages[pages.length - 1]
	const options = currentPage.options
	
	console.log('鱼塘页面加载，接收参数:', options)
	if (options.pondId) {
		console.log('获取鱼塘详情，ID:', options.pondId)
		console.log('鱼塘名称:', options.pondName)
		// 解码URL编码的鱼塘名称
		const decodedPondName = options.pondName ? decodeURIComponent(options.pondName) : '一号塘'
		pondName.value = decodedPondName
	}
	
	// 检查是否需要自动切换到指定选项卡
	if (options.activeTab) {
		console.log('自动切换到选项卡:', options.activeTab)
		// 通过事件总线或直接调用组件方法切换到指定选项卡
		// 这里我们使用一个简单的方法，通过修改pondData来传递activeTab信息
		pondData.value.activeTab = options.activeTab
	}
})
</script>

<style scoped>
.container {
	min-height: 100vh;
	background-color: #f0f0f0;
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
</style>
