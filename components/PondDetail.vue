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
							v-for="position in availablePositions" 
							:key="position.id"
							class="fishing-position"
							:class="{ 
								'selected': selectedPosition === position.id,
								'occupied': position.status === 'occupied'
							}"
							:style="getPositionStyle(position)"
							@click="selectPosition(position)"
						>
							<text class="position-number">{{ position.id }}</text>
						</view>
						<!-- 标题放在平面图中央 -->
						<view class="pond-title-overlay">
							<text class="pond-title-text">钓位平面图</text>
						</view>
					</view>
				</view>
			</view>
			
			<!-- 钓位状态说明 -->
			<view class="position-legend">
				<view class="legend-item">
					<view class="legend-dot available"></view>
					<text class="legend-text">可选</text>
				</view>
				<view class="legend-item">
					<view class="legend-dot occupied"></view>
					<text class="legend-text">已占用</text>
				</view>
				<view class="legend-item">
					<view class="legend-dot selected"></view>
					<text class="legend-text">已选择</text>
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
					<view class="tab-button" :class="{ 'active': activeTab === 'position' }" @click="switchTab('position')">
						<text class="tab-text">选择钓位</text>
					</view>
					<view class="tab-button" :class="{ 'active': activeTab === 'timer' }" @click="switchTab('timer')">
						<text class="tab-text">计时</text>
					</view>
				</view>
				
				<!-- 购鱼票内容 -->
				<view class="tab-content" v-if="activeTab === 'ticket'">
					<!-- 购票须知 -->
					<view class="ticket-notice-section">
						<text class="notice-text">购票须知：一次可购多张票，请根据实际需求选择购票数量</text>
					</view>
					
					<!-- 购票数量选择 -->
					<view class="ticket-quantity-section">
						<view class="quantity-item">
							<text class="quantity-label">购票数量</text>
							<view class="quantity-controls">
								<view class="quantity-button" @click="decreaseQuantity" :class="{ 'disabled': ticketQuantity <= 1 }">
									<text class="quantity-button-text">-</text>
								</view>
								<input 
									class="quantity-input" 
									type="number" 
									v-model="ticketQuantity" 
									@input="validateQuantity"
									:min="1"
									:max="99"
								/>
								<view class="quantity-button" @click="increaseQuantity" :class="{ 'disabled': ticketQuantity >= 99 }">
									<text class="quantity-button-text">+</text>
								</view>
							</view>
						</view>
					</view>
					
					<!-- 章程部分 -->
					<view class="rules-section">
						<view class="rules-title">垂钓章程</view>
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
				
				<!-- 选择钓位内容 -->
				<view class="tab-content" v-if="activeTab === 'position'">
					<!-- 选位方式 -->
					<view class="selection-method-section">
						<view class="method-row">
							<text class="method-label">选位方式:</text>
							<text class="method-value">{{ selectionMethod }}</text>
							<view class="lottery-button" @click="startLottery" :class="{ 'disabled': isLotteryRunning }">
								<text class="lottery-button-text">{{ isLotteryRunning ? '选号中...' : '开始选号' }}</text>
							</view>
						</view>
					</view>
					
					<!-- 可选钓位列表 -->
					<view class="available-positions-section">
						<view class="section-title">可选钓位</view>
						<view class="positions-grid">
							<view 
								v-for="position in availablePositions.filter(p => p.status === 'available')" 
								:key="position.id"
								class="position-item"
								:class="{ 
									'selected': selectedPosition === position.id
								}"
								@click="selectPosition(position)"
							>
								<text class="position-number">{{ position.id }}</text>
							</view>
						</view>
					</view>


					<!-- 摇号结果 -->
					<view class="lottery-result-section" v-if="lotteryResult.length > 0">
						<view class="result-title">选号结果</view>
						<view class="result-positions">
							<view 
								v-for="position in lotteryResult" 
								:key="position.id"
								class="result-position-item"
								:class="{ 'selected': selectedPosition === position.id }"
								@click="selectLotteryPosition(position)"
							>
								<text class="result-position-number">{{ position.id }}</text>
							</view>
						</view>
						<view class="result-tip" v-if="!selectedPosition">请点击选择您想要的钓位</view>
					</view>

					<!-- 选中钓位信息 -->
					<view class="selected-info" v-if="selectedPosition">
						<view class="info-title">已选择钓位</view>
						<view class="info-content">
							<text class="position-number-large">{{ selectedPosition }}号钓位</text>
							<text class="position-desc">请按时到达钓场，向工作人员出示电子票</text>
						</view>
					</view>
					
					<!-- 确定钓位按钮 -->
					<view class="confirm-position-button" v-if="selectedPosition">
						<view class="confirm-button" @click="confirmPosition">
							<text class="confirm-button-text">确定钓位</text>
						</view>
					</view>
					
				</view>
				
				<!-- 计时内容 -->
				<view class="tab-content" v-if="activeTab === 'timer'">
					<!-- 计时提示 -->
					<view class="timer-tip-section">
						<text class="timer-tip-text">准备好后，请点击计时按钮，开始倒计时。</text>
					</view>
					
					<!-- 时间信息 -->
					<view class="time-info-section">
						<view class="time-row">
							<text class="time-label">计时方式:</text>
							<text class="time-value">手动计时</text>
						</view>
						<view class="time-row">
							<text class="time-label">垂钓时长:</text>
							<text class="time-value">{{ fishingDuration }}</text>
						</view>
						<view class="time-row">
							<text class="time-label">开始时间:</text>
							<text class="time-value">{{ startTime || '未开始' }}</text>
						</view>
						<view class="time-row">
							<text class="time-label">结束时间:</text>
							<text class="time-value">{{ endTime || '未开始' }}</text>
						</view>
					</view>
					
					<!-- 倒计时显示 -->
					<view class="countdown-section" :class="{ 'running': isTimerRunning }">
						<view class="countdown-display">
							<text class="countdown-text">{{ countdownDisplay }}</text>
						</view>
						<view class="countdown-status">
							<text class="status-text">{{ timerStatus }}</text>
						</view>
					</view>
					
					<!-- 计时控制按钮 -->
					<view class="timer-controls">
						<view class="timer-button" :class="{ 'disabled': isTimerRunning }" @click="startTimer" v-if="!isTimerRunning">
							<text class="timer-button-text">开始计时</text>
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
				price: {},
				activeTab: null
			})
		}
	},
	data() {
		return {
			activeTab: 'ticket', // 默认显示购鱼票
			selectedPosition: null, // 选中的钓位
			selectionMethod: '摇号二选一', // 选位方式
			isLotteryRunning: false, // 摇号是否正在进行
			lotteryResult: [], // 摇号结果
			// 购票数量相关数据
			ticketQuantity: 1, // 购票数量，默认值为1
			// 计时相关数据
			isTimerRunning: false, // 计时器是否正在运行
			startTime: '', // 开始时间
			endTime: '', // 结束时间
			countdownDisplay: '00:00:00', // 倒计时显示
			timerStatus: '准备开始', // 计时器状态
			hasTimerHistory: false, // 是否有计时历史
			timerInterval: null, // 计时器间隔
			remainingTime: 0, // 剩余时间（秒）
			totalTime: 0, // 总时间（秒）
			availablePositions: [
				{ id: 1, x: 5, y: 5, status: 'available' },
				{ id: 2, x: 12, y: 5, status: 'occupied' },
				{ id: 3, x: 19, y: 5, status: 'available' },
				{ id: 4, x: 26, y: 5, status: 'available' },
				{ id: 5, x: 33, y: 5, status: 'occupied' },
				{ id: 6, x: 40, y: 5, status: 'available' },
				{ id: 7, x: 50, y: 5, status: 'available' },
				{ id: 8, x: 60, y: 5, status: 'occupied' },
				{ id: 9, x: 67, y: 5, status: 'available' },
				{ id: 10, x: 74, y: 5, status: 'available' },
				{ id: 11, x: 81, y: 5, status: 'available' },
				{ id: 12, x: 88, y: 5, status: 'occupied' },
				{ id: 13, x: 95, y: 5, status: 'available' },
				
				// 下边钓位
				{ id: 14, x: 95, y: 95, status: 'available' },
				{ id: 15, x: 88, y: 95, status: 'occupied' },
				{ id: 16, x: 81, y: 95, status: 'available' },
				{ id: 17, x: 74, y: 95, status: 'available' },
				{ id: 18, x: 67, y: 95, status: 'available' },
				{ id: 19, x: 60, y: 95, status: 'occupied' },
				{ id: 20, x: 50, y: 95, status: 'available' },
				{ id: 21, x: 40, y: 95, status: 'available' },
				{ id: 22, x: 33, y: 95, status: 'available' },
				{ id: 23, x: 26, y: 95, status: 'occupied' },
				{ id: 24, x: 19, y: 95, status: 'available' },
				{ id: 25, x: 12, y: 95, status: 'available' },
				{ id: 26, x: 5, y: 95, status: 'available' }
			]
		}
	},
	computed: {
		// 垂钓时长显示
		fishingDuration() {
			const duration = this.pondData.duration || '4小时'
			return duration
		}
	},
	watch: {
		// 监听pondData.activeTab的变化，自动切换选项卡
		'pondData.activeTab': {
			handler(newTab) {
				if (newTab && ['ticket', 'position', 'timer'].includes(newTab)) {
					console.log('自动切换到选项卡:', newTab)
					this.activeTab = newTab
				}
			},
			immediate: true
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
			console.log('购票功能，数量:', this.ticketQuantity)
			// 直接跳转到支付页面，传递购票数量
			uni.navigateTo({
				url: `/pages/payment/index?pondId=${this.pondData.id}&pondName=${encodeURIComponent(this.pondData.name)}&price=50元/4小时&quantity=${this.ticketQuantity}`
			})
		},
		
		// 减少购票数量
		decreaseQuantity() {
			if (this.ticketQuantity > 1) {
				this.ticketQuantity--
			}
		},
		
		// 增加购票数量
		increaseQuantity() {
			if (this.ticketQuantity < 99) {
				this.ticketQuantity++
			}
		},
		
		// 验证购票数量输入
		validateQuantity(event) {
			let value = parseInt(event.detail.value)
			if (isNaN(value) || value < 1) {
				this.ticketQuantity = 1
			} else if (value > 99) {
				this.ticketQuantity = 99
			} else {
				this.ticketQuantity = value
			}
		},
		
		// 选择钓位
		selectPosition(position) {
			if (position.status === 'occupied') {
				uni.showToast({
					title: '该钓位已被占用',
					icon: 'none'
				})
				return
			}
			this.selectedPosition = position.id
			// 手动选择时清除摇号结果
			this.lotteryResult = []
			// 停止摇号状态
			this.isLotteryRunning = false
			uni.showToast({
				title: `已选择${position.id}号钓位`,
				icon: 'success'
			})
		},
		
		// 确定钓位
		confirmPosition() {
			if (!this.selectedPosition) {
				uni.showToast({
					title: '请先选择钓位',
					icon: 'none'
				})
				return
			}
			
			// 直接确认钓位，不显示确认对话框
			uni.showToast({
				title: '钓位选择成功',
				icon: 'success'
			})
			// 这里可以添加其他逻辑，比如跳转到其他页面或更新状态
		},

		// 开始摇号
		startLottery() {
			if (this.isLotteryRunning) {
				return
			}

			// 获取所有可用的钓位
			const availablePositions = this.availablePositions.filter(p => p.status === 'available')
			
			if (availablePositions.length < 2) {
				uni.showToast({
					title: '可用钓位不足2个，无法摇号',
					icon: 'none'
				})
				return
			}

			this.isLotteryRunning = true
			this.lotteryResult = []
			// 开始摇号时清除之前的选择
			this.selectedPosition = null

			// 创建摇号容器，将所有可用钓位放入
			const lotteryContainer = [...availablePositions]
			
			// 随机打乱数组
			for (let i = lotteryContainer.length - 1; i > 0; i--) {
				const j = Math.floor(Math.random() * (i + 1));
				[lotteryContainer[i], lotteryContainer[j]] = [lotteryContainer[j], lotteryContainer[i]]
			}

			// 1秒后随机选中两个钓位
			setTimeout(() => {
				// 随机选择两个不同的钓位
				const selectedPositions = []
				const usedIndices = new Set()
				
				while (selectedPositions.length < 2) {
					const randomIndex = Math.floor(Math.random() * lotteryContainer.length)
					if (!usedIndices.has(randomIndex)) {
						usedIndices.add(randomIndex)
						selectedPositions.push(lotteryContainer[randomIndex])
					}
				}

				this.lotteryResult = selectedPositions
				this.isLotteryRunning = false

				uni.showToast({
					title: '选号完成！',
					icon: 'success'
				})
			}, 1000)
		},

		// 选择摇号结果中的钓位
		selectLotteryPosition(position) {
			this.selectedPosition = position.id
			uni.showToast({
				title: `已选择${position.id}号钓位`,
				icon: 'success'
			})
		},
		
		// 开始计时
		startTimer() {
			if (this.isTimerRunning) {
				return
			}
			
			// 设置开始时间
			const now = new Date()
			this.startTime = this.formatTime(now)
			
			// 根据鱼塘数据设置总时间（默认4小时）
			this.totalTime = this.getTotalTimeInSeconds()
			this.remainingTime = this.totalTime
			
			// 计算结束时间
			const endDate = new Date(now.getTime() + this.totalTime * 1000)
			this.endTime = this.formatTime(endDate)
			
			// 开始计时
			this.isTimerRunning = true
			this.timerStatus = '计时中'
			this.hasTimerHistory = true
			
			// 启动定时器
			this.timerInterval = setInterval(() => {
				this.remainingTime--
				this.updateCountdownDisplay()
				
				if (this.remainingTime <= 0) {
					this.stopTimer()
					this.timerStatus = '时间到'
					uni.showToast({
						title: '钓鱼时间结束！',
						icon: 'success'
					})
				}
			}, 1000)
			
			uni.showToast({
				title: '开始计时',
				icon: 'success'
			})
		},
		
		// 停止计时
		stopTimer() {
			if (!this.isTimerRunning) {
				return
			}
			
			this.isTimerRunning = false
			this.timerStatus = '已停止'
			
			if (this.timerInterval) {
				clearInterval(this.timerInterval)
				this.timerInterval = null
			}
			
			uni.showToast({
				title: '计时已停止',
				icon: 'none'
			})
		},
		
		// 重置计时器
		resetTimer() {
			this.stopTimer()
			this.startTime = ''
			this.endTime = ''
			this.countdownDisplay = '00:00:00'
			this.timerStatus = '准备开始'
			this.remainingTime = 0
			this.totalTime = 0
			this.hasTimerHistory = false
			
			uni.showToast({
				title: '计时器已重置',
				icon: 'none'
			})
		},
		
		// 更新倒计时显示
		updateCountdownDisplay() {
			const hours = Math.floor(this.remainingTime / 3600)
			const minutes = Math.floor((this.remainingTime % 3600) / 60)
			const seconds = this.remainingTime % 60
			
			this.countdownDisplay = `${this.padZero(hours)}:${this.padZero(minutes)}:${this.padZero(seconds)}`
		},
		
		// 格式化时间
		formatTime(date) {
			const hours = this.padZero(date.getHours())
			const minutes = this.padZero(date.getMinutes())
			const seconds = this.padZero(date.getSeconds())
			return `${hours}:${minutes}:${seconds}`
		},
		
		// 补零函数
		padZero(num) {
			return num.toString().padStart(2, '0')
		},
		
		// 获取总时间（秒）
		getTotalTimeInSeconds() {
			// 从鱼塘数据中获取时长，默认4小时
			const duration = this.pondData.duration || '4小时'
			const hours = parseInt(duration.match(/\d+/)[0])
			return hours * 3600
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
	padding: 0 60rpx 20rpx 60rpx;
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
	width: 40rpx;
	height: 40rpx;
	background: #07c160;
	border-radius: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
	transform: translate(-50%, -50%);
	border: 2rpx solid #ffffff;
	box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.2);
	transition: all 0.3s ease;
}

.fishing-position.occupied {
	background: #ff4d4f;
}

.fishing-position.selected {
	background: #1890ff;
	transform: translate(-50%, -50%) scale(1.2);
	box-shadow: 0 4rpx 12rpx rgba(24, 144, 255, 0.4);
}

.position-number {
	font-size: 20rpx;
	font-weight: 600;
	color: #ffffff;
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

/* 钓位状态说明 */
.position-legend {
	background: transparent;
	margin: 20rpx 60rpx 30rpx 60rpx;
	display: flex;
	justify-content: space-around;
	padding: 20rpx;
}

.legend-item {
	display: flex;
	align-items: center;
	gap: 10rpx;
}

.legend-dot {
	width: 20rpx;
	height: 20rpx;
	border-radius: 50%;
}

.legend-dot.available {
	background: #07c160;
}

.legend-dot.occupied {
	background: #ff4d4f;
}

.legend-dot.selected {
	background: #1890ff;
}

.legend-text {
	font-size: 24rpx;
	color: #666;
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
	background: transparent;
	border-radius: 8rpx;
	padding: 0;
	margin-bottom: 20rpx;
	gap: 10rpx;
}

.tab-button {
	flex: 1;
	text-align: center;
	padding: 15rpx 0;
	border-radius: 8rpx;
	background: #f5f5f5;
	transition: all 0.3s ease;
}

.tab-button.active {
	background: #07c160;
}

.tab-text {
	font-size: 32rpx;
	color: #666;
	font-weight: 500;
}

.tab-button.active .tab-text {
	color: #ffffff;
	font-weight: 600;
}

.tab-content {
	min-height: 200rpx;
	width: 100%;
	box-sizing: border-box;
	overflow: hidden;
}

/* 购鱼票样式 */
.rules-section {
	margin-top: 30rpx;
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

/* 购票须知样式 - 参考计时选项卡提示信息样式 */
.ticket-notice-section {
	background: #fff8e1;
	padding: 20rpx 30rpx;
	margin-bottom: 10rpx;
	border-radius: 8rpx;
}

.notice-text {
	font-size: 24rpx;
	color: #e65100;
	line-height: 1.5;
}

/* 购票数量区域样式 */
.ticket-quantity-section {
	background: #f5f5f5;
	margin-bottom: 20rpx;
	padding: 20rpx 30rpx;
	border-radius: 8rpx;
}

.quantity-item {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0;
	border-bottom: none;
}

.quantity-label {
	font-size: 28rpx;
	font-weight: 500;
	color: #666;
}

.quantity-controls {
	display: flex;
	align-items: center;
	gap: 15rpx;
}

.quantity-button {
	width: 60rpx;
	height: 60rpx;
	background: transparent;
	border: none;
	display: flex;
	align-items: center;
	justify-content: center;
	transition: all 0.3s ease;
}

.quantity-button:active {
	transform: scale(0.95);
}

.quantity-button.disabled {
	opacity: 0.3;
}

.quantity-button-text {
	font-size: 40rpx;
	color: #07c160;
	font-weight: 600;
}

.quantity-button.disabled .quantity-button-text {
	color: #ccc;
}

/* 减少按钮特殊样式 - 确保减号为绿色 */
.quantity-button:first-child .quantity-button-text {
	color: #07c160 !important;
}

.quantity-button:first-child.disabled .quantity-button-text {
	color: #ccc !important;
}

.quantity-input {
	width: 160rpx;
	height: 60rpx;
	text-align: center;
	font-size: 28rpx;
	font-weight: 600;
	color: #333;
	background: #ffffff;
	border: 2rpx solid #e5e5e5;
	border-radius: 6rpx;
	box-sizing: border-box;
}

.quantity-input:focus {
	border-color: #07c160;
	background: #ffffff;
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

/* 选位方式区域样式 */
.selection-method-section {
	background: #ffffff;
	margin-bottom: 20rpx;
	padding: 20rpx;
	border-radius: 12rpx;
	box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.1);
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

/* 确定钓位按钮样式 */
.confirm-position-button {
	display: flex;
	justify-content: center;
	margin: 20rpx;
	padding: 20rpx 0;
	background: transparent;
	width: calc(100% - 40rpx);
	box-sizing: border-box;
}

.confirm-button {
	background: #07c160;
	border-radius: 25rpx;
	padding: 20rpx 80rpx;
	box-shadow: 0 4rpx 12rpx rgba(7, 193, 96, 0.3);
	transition: all 0.3s ease;
}

.confirm-button:active {
	transform: translateY(2rpx);
	box-shadow: 0 2rpx 8rpx rgba(7, 193, 96, 0.4);
}

.confirm-button-text {
	font-size: 32rpx;
	color: #ffffff;
	font-weight: 600;
}

/* 可选钓位列表样式 */
.available-positions-section {
	background: transparent;
	margin-bottom: 20rpx;
	width: 100%;
	box-sizing: border-box;
}

.section-title {
	font-size: 32rpx;
	font-weight: 600;
	color: #333;
	margin-bottom: 20rpx;
	text-align: center;
}

.positions-grid {
	display: grid;
	grid-template-columns: repeat(6, 1fr);
	gap: 15rpx;
	padding: 0 20rpx;
	width: 100%;
	box-sizing: border-box;
}

.position-item {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: 80rpx;
	border: 2rpx solid #e5e5e5;
	border-radius: 8rpx;
	background: #ffffff;
	transition: all 0.3s ease;
	width: 100%;
	box-sizing: border-box;
	overflow: hidden;
}

.position-item.selected {
	border-color: #1890ff;
	background: #f0f8ff;
}

.position-number {
	font-size: 24rpx;
	font-weight: 600;
	color: #333;
}

.position-item.selected .position-number {
	color: #1890ff;
}

/* 选中钓位信息 */
.selected-info {
	background: #ffffff;
	margin: 20rpx;
	padding: 30rpx;
	border-radius: 12rpx;
	box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.1);
	text-align: center;
	width: calc(100% - 40rpx);
	box-sizing: border-box;
}

.info-title {
	font-size: 28rpx;
	color: #666;
	margin-bottom: 15rpx;
}

.info-content {
	display: flex;
	flex-direction: column;
	gap: 10rpx;
}

.position-number-large {
	font-size: 48rpx;
	font-weight: 600;
	color: #1890ff;
}

.position-desc {
	font-size: 24rpx;
	color: #999;
}


.method-row {
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 20rpx;
}

.method-label {
	font-size: 28rpx;
	color: #666;
	font-weight: 500;
}

.method-value {
	font-size: 28rpx;
	color: #333;
	font-weight: 600;
	flex: 1;
}

.lottery-button {
	background: #07c160;
	border-radius: 20rpx;
	padding: 15rpx 30rpx;
	box-shadow: 0 2rpx 8rpx rgba(7, 193, 96, 0.3);
	transition: all 0.3s ease;
}

.lottery-button:active {
	transform: translateY(1rpx);
	box-shadow: 0 1rpx 4rpx rgba(7, 193, 96, 0.4);
}

.lottery-button.disabled {
	background: #ccc;
	box-shadow: none;
}

.lottery-button-text {
	font-size: 26rpx;
	color: #ffffff;
	font-weight: 600;
}

/* 摇号结果区域样式 */
.lottery-result-section {
	background: #ffffff;
	margin-bottom: 20rpx;
	padding: 20rpx;
	border-radius: 12rpx;
	box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.1);
}

@keyframes slideIn {
	from {
		opacity: 0;
		transform: translateY(20rpx);
	}
	to {
		opacity: 1;
		transform: translateY(0);
	}
}

.result-title {
	font-size: 32rpx;
	font-weight: 600;
	color: #333;
	text-align: center;
	margin-bottom: 20rpx;
}

.result-positions {
	display: flex;
	justify-content: center;
	gap: 80rpx;
	margin-bottom: 40rpx;
}

.result-position-item {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100rpx;
	height: 100rpx;
	background: #f0f8ff;
	border: 3rpx solid #1890ff;
	border-radius: 50%;
	transition: all 0.3s ease;
	animation: bounceIn 0.6s ease-out;
}

@keyframes bounceIn {
	0% {
		opacity: 0;
		transform: scale(0.3);
	}
	50% {
		opacity: 1;
		transform: scale(1.1);
	}
	100% {
		opacity: 1;
		transform: scale(1);
	}
}

.result-position-item.selected {
	background: #1890ff;
	transform: scale(1.1);
	box-shadow: 0 4rpx 12rpx rgba(24, 144, 255, 0.4);
}

.result-position-item:active {
	transform: scale(0.95);
}

.result-position-number {
	font-size: 36rpx;
	font-weight: 600;
	color: #1890ff;
}

.result-position-item.selected .result-position-number {
	color: #ffffff;
}

.result-tip {
	font-size: 24rpx;
	color: #999;
	text-align: center;
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

/* 计时选项卡样式 */
.timer-tip-section {
	background: #fff8e1;
	padding: 20rpx 30rpx;
	margin-bottom: 20rpx;
	border-radius: 8rpx;
}

.timer-tip-text {
	font-size: 24rpx;
	color: #e65100;
	line-height: 1.5;
}

/* 时间信息样式 */
.time-info-section {
	background: #ffffff;
	padding: 30rpx;
	margin-bottom: 20rpx;
	border-radius: 12rpx;
	box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.1);
}

.time-row {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 15rpx 0;
	border-bottom: 1rpx solid #f0f0f0;
}

.time-row:last-child {
	border-bottom: none;
}

.time-label {
	font-size: 24rpx;
	color: #666;
	font-weight: 500;
}

.time-value {
	font-size: 24rpx;
	color: #333;
	font-weight: 600;
}

/* 倒计时显示样式 */
.countdown-section {
	background: #ffffff;
	padding: 40rpx 30rpx;
	margin-bottom: 20rpx;
	border-radius: 12rpx;
	box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.1);
	text-align: center;
}

.countdown-display {
	margin-bottom: 20rpx;
}

.countdown-text {
	font-size: 72rpx;
	font-weight: 700;
	color: #07c160;
	font-family: 'Courier New', monospace;
	letter-spacing: 4rpx;
}

.countdown-status {
	margin-top: 10rpx;
}

.status-text {
	font-size: 28rpx;
	color: #666;
	font-weight: 500;
}

/* 计时控制按钮样式 */
.timer-controls {
	display: flex;
	justify-content: center;
	gap: 20rpx;
	padding: 20rpx 0;
}

.timer-button {
	background: #07c160;
	border-radius: 25rpx;
	padding: 20rpx 40rpx;
	box-shadow: 0 4rpx 12rpx rgba(7, 193, 96, 0.3);
	transition: all 0.3s ease;
	min-width: 120rpx;
	text-align: center;
}

.timer-button:active {
	transform: translateY(2rpx);
	box-shadow: 0 2rpx 8rpx rgba(7, 193, 96, 0.4);
}

.timer-button.disabled {
	background: #ccc;
	box-shadow: none;
}

.timer-button.stop {
	background: #ff4d4f;
	box-shadow: 0 4rpx 12rpx rgba(255, 77, 79, 0.3);
}

.timer-button.stop:active {
	box-shadow: 0 2rpx 8rpx rgba(255, 77, 79, 0.4);
}

.timer-button.reset {
	background: #1890ff;
	box-shadow: 0 4rpx 12rpx rgba(24, 144, 255, 0.3);
}

.timer-button.reset:active {
	box-shadow: 0 2rpx 8rpx rgba(24, 144, 255, 0.4);
}

.timer-button-text {
	font-size: 24rpx;
	color: #ffffff;
	font-weight: 600;
}

/* 计时器运行时的特殊样式 */
.countdown-section.running .countdown-text {
	color: #07c160;
	animation: pulse 1s infinite;
}

@keyframes pulse {
	0%, 100% {
		opacity: 1;
	}
	50% {
		opacity: 0.7;
	}
}

</style>
