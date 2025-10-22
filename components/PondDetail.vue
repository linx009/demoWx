<template>
	<view class="pond-detail">
		<!-- 钓位平面图 -->
		<view class="pond-layout-section">
			<view class="pond-layout">
				<view class="pond-container">
					<!-- 鱼塘主体 -->
					<view class="pond-body">
						<!-- 钓位点 -->
						<view 
							v-for="position in pondData.positions" 
							:key="position.id"
							class="fishing-position"
							:class="{ 'show-number': position.showNumber }"
							:style="getPositionStyle(position)"
						>
							<text class="position-number" v-if="position.showNumber">{{ position.id }}</text>
						</view>
						<!-- 标题放在平面图中央 -->
						<view class="pond-title-overlay">
							<text class="pond-title-text">钓位平面图</text>
						</view>
					</view>
				</view>
			</view>
		</view>

		<!-- 操作选项卡 -->
		<view class="tabs-section">
			<view class="tabs-content">
				<view class="tab-buttons">
					<view class="tab-button" :class="{ 'active': activeTab === 'ticket' }" @click="switchTab('ticket')">
						<text class="tab-text">购鱼票</text>
					</view>
					<view class="tab-button" :class="{ 'active': activeTab === 'history' }" @click="switchTab('history')">
						<text class="tab-text">坑冠历史</text>
					</view>
				</view>
				
				<!-- 购鱼票内容 -->
				<view class="tab-content" v-if="activeTab === 'ticket'">
					<!-- 章程部分 -->
					<view class="rules-section">
						<view class="rules-title">章程</view>
						<!-- 章程内容 - 可滚动容器 -->
						<scroll-view class="rules-scroll" scroll-y="true">
							<view class="rules-list">
								<view class="rule-item">
									<text class="rule-text">1. 鱼塘名称：{{ pondData.name }}</text>
								</view>
								<view class="rule-item">
									<text class="rule-text">2. 鱼种：{{ pondData.fishSpecies || '鲤鱼、鲫鱼、草鱼' }}</text>
								</view>
								<view class="rule-item">
									<text class="rule-text">3. 回鱼：{{ pondData.returnPrice || '4元/斤' }}</text>
								</view>
								<view class="rule-item">
									<text class="rule-text">4. 作钓时长：{{ pondData.duration || '4小时' }}</text>
								</view>
								<view class="rule-item">
									<text class="rule-text">5. 限竿：{{ pondData.rodLimit || '每人限用一根钓竿' }}</text>
								</view>
								<view class="rule-item">
									<text class="rule-text">6. 限饵：{{ pondData.baitLimit || '禁止使用活饵，只允许使用商品饵料' }}</text>
								</view>
								<view class="rule-item">
									<text class="rule-text">7. 底鱼数量：{{ pondData.baseFish || '5000斤' }}</text>
								</view>
								<view class="rule-item">
									<text class="rule-text">8. 选座方式：{{ pondData.selectionMethod || '先到先得' }}</text>
								</view>
								<view class="rule-item">
									<text class="rule-text">9. 更换钓位：{{ pondData.positionChange || '允许更换钓位' }}</text>
								</view>
								<view class="rule-item">
									<text class="rule-text">10. 钓位数量：{{ pondData.positions.length }}个</text>
								</view>
								<view class="rule-item">
									<text class="rule-text">11. 鱼塘描述：{{ pondData.description }}</text>
								</view>
								<view class="rule-item" v-for="(rule, index) in pondData.rules" :key="index">
									<text class="rule-text">{{ rule }}</text>
								</view>
							</view>
						</scroll-view>
					</view>
					
				</view>
				
				<!-- 坑冠历史内容 -->
				<view class="tab-content" v-if="activeTab === 'history'">
					<view class="history-list">
						<view class="history-item" v-for="(record, index) in championHistory" :key="index">
							<view class="history-info">
								<text class="champion-name">{{ record.name }}</text>
								<text class="champion-weight">{{ record.weight }}斤</text>
							</view>
							<view class="history-date">{{ record.date }}</view>
						</view>
					</view>
				</view>
			</view>
		</view>

		<!-- 固定底部购票按钮 -->
		<view class="fixed-buy-button" v-if="activeTab === 'ticket'">
			<view class="buy-button" @click="handleBuyTicket">
				<text class="buy-button-text">立即购票</text>
			</view>
		</view>

	</view>
</template>

<script>
export default {
	name: 'PondDetail',
	props: {
		pondData: {
			type: Object,
			required: true,
			default: () => ({
				id: 1,
				name: '一号塘',
				positions: [],
				rules: [],
				price: {}
			})
		}
	},
	data() {
		return {
			activeTab: 'ticket', // 默认显示购鱼票
			championHistory: [
				{ date: '2024-01-20', name: '老李', weight: 68 },
				{ date: '2024-01-19', name: '小王', weight: 52 },
				{ date: '2024-01-18', name: '老张', weight: 45 },
				{ date: '2024-01-17', name: '小刘', weight: 38 },
				{ date: '2024-01-16', name: '老陈', weight: 42 }
			]
		}
	},
	methods: {
		// 获取钓位样式
		getPositionStyle(position) {
			return {
				left: position.x + '%',
				top: position.y + '%'
			}
		},
		
		// 切换选项卡
		switchTab(tab) {
			this.activeTab = tab
		},
		
		// 处理购票
		handleBuyTicket() {
			console.log('购票功能')
			uni.showToast({
				title: '购票功能开发中',
				icon: 'none'
			})
		}
	}
}
</script>

<style scoped lang="scss">
/* 鱼塘详情组件样式 */

.pond-detail {
	display: flex;
	flex-direction: column;
	padding-bottom: 120rpx; /* 为固定底部按钮留出空间 */
}


/* 钓位平面图样式 */
.pond-layout-section {
	background: #ffffff;
}

.pond-layout {
	padding: 0 60rpx 90rpx 60rpx;
}

.pond-container {
	position: relative;
	width: 100%;
	height: 270rpx;
	background: transparent;
	border-radius: 12rpx;
	overflow: hidden;
}

.pond-body {
	position: relative;
	width: 100%;
	height: 100%;
	background: transparent;
	border: 2rpx solid #333;
	border-radius: 12rpx;
	box-sizing: border-box;
}

.fishing-position {
	position: absolute;
	width: 12rpx;
	height: 12rpx;
	background: #07c160;
	border-radius: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
	transform: translate(-50%, -50%);
}

.fishing-position.show-number {
	width: 40rpx;
	height: 40rpx;
	background: #ffffff;
	border: 2rpx solid #07c160;
	border-radius: 50%;
	box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.2);
}

.position-number {
	font-size: 20rpx;
	font-weight: 600;
	color: #07c160;
}

/* 平面图标题样式 */
.pond-title-overlay {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	z-index: 10;
}

.pond-title-text {
	font-size: 28rpx;
	color: #07c160;
	font-weight: 500;
}


/* 选项卡样式 */
.tabs-section {
	background: #ffffff;
}

.tabs-content {
	padding: 0 30rpx 30rpx 30rpx;
}

.tab-buttons {
	display: flex;
	background: #f5f5f5;
	border-radius: 8rpx;
	padding: 4rpx;
	margin-bottom: 20rpx;
}

.tab-button {
	flex: 1;
	text-align: center;
	padding: 15rpx 0;
	border-radius: 6rpx;
	transition: all 0.3s ease;
}

.tab-button.active {
	background: #07c160;
}

.tab-text {
	font-size: 28rpx;
	color: #666;
	font-weight: 500;
}

.tab-button.active .tab-text {
	color: #ffffff;
	font-weight: 600;
}

.tab-content {
	min-height: 200rpx;
}

/* 购鱼票样式 */
.rules-section {
	margin-bottom: 30rpx;
}

.rules-title {
	font-size: 32rpx;
	font-weight: 600;
	color: #666;
	margin-bottom: 20rpx;
	text-align: center;
}

/* 章程可滚动容器样式 */
.rules-scroll {
	height: calc(100vh - 300rpx);
	width: 100%;
}



/* 钓场规则样式 */
.rules-list {
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

/* 固定底部购票按钮样式 */
.fixed-buy-button {
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

.buy-button {
	background: #07c160;
	border-radius: 25rpx;
	padding: 20rpx 80rpx;
	box-shadow: 0 4rpx 12rpx rgba(7, 193, 96, 0.3);
	transition: all 0.3s ease;
}

.buy-button:active {
	transform: translateY(2rpx);
	box-shadow: 0 2rpx 8rpx rgba(7, 193, 96, 0.4);
}

.buy-button-text {
	font-size: 32rpx;
	color: #ffffff;
	font-weight: 600;
}

/* 坑冠历史样式 */
.history-list {
	display: flex;
	flex-direction: column;
	gap: 15rpx;
}

.history-item {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 20rpx 0;
	border-bottom: 1rpx solid #f0f0f0;
}

.history-item:last-child {
	border-bottom: none;
}

.history-date {
	font-size: 26rpx;
	color: #999;
}

.history-info {
	display: flex;
	align-items: center;
	gap: 15rpx;
}

.champion-name {
	font-size: 30rpx;
	color: #333;
	font-weight: 500;
}

.champion-weight {
	font-size: 28rpx;
	color: #07c160;
	font-weight: 600;
}

</style>
