<template>
	<!-- 钓场名片组件 -->
	<view class="fishing-field-card" @click="handleClick">
		<!-- 主要内容区域 -->
		<view class="fishing-field-card__main">
			<!-- 左侧内容区域 -->
			<view class="fishing-field-card__left">
				<!-- 1. 钓场名称容器 -->
				<view class="fishing-field-card__name-container">
					<text class="fishing-field-card__name">{{ pond.pondName }}</text>
				</view>
				
				<!-- 3. 名片内容区容器 -->
				<view class="fishing-field-card__content-container">
					<!-- 第一行：鱼种 -->
					<view class="fishing-field-card__info-row">
						<text class="fishing-field-card__info-label">鱼种：</text>
						<text class="fishing-field-card__info-value">{{ pond.fishSpecies }}</text>
					</view>
					
					<!-- 第二行：鱼塘数量 -->
					<view class="fishing-field-card__info-row">
						<text class="fishing-field-card__info-label">鱼塘数量：</text>
						<text class="fishing-field-card__info-value">{{ pond.pondCount }}个</text>
					</view>
					
					<!-- 第三行：钓费 -->
					<view class="fishing-field-card__info-row">
						<text class="fishing-field-card__info-label">钓费：</text>
						<text class="fishing-field-card__info-value">{{ pond.fee === '0' ? '免费' : pond.fee + '元' }}</text>
					</view>
					
					<!-- 第四行：地址 -->
					<view class="fishing-field-card__info-row">
						<text class="fishing-field-card__info-label">地址：</text>
						<text class="fishing-field-card__info-value">{{ formatLocation(pond.location) }} ({{ pond.distance }})</text>
					</view>
				</view>
			</view>
			
			<!-- 2. 公告区容器（占名片宽的五分之一） -->
			 <view class="fishing-field-card__announcement-container" v-if="pond.announcement">
				<view class="fishing-field-card__announcement-content">
					<text class="fishing-field-card__announcement-topic">{{ pond.announcement.topic }}</text>
					<text class="fishing-field-card__announcement-status">{{ pond.announcement.status }}</text>
				</view>
			</view>
		</view>
		
		<!-- 4. 底部列表容器（与名片等宽） -->
		<view class="fishing-field-card__bottom-container">
			<!-- 坑冠信息 -->
			<view class="fishing-field-card__champion" v-if="pond.champion">
				<text class="fishing-field-card__champion-text">坑冠：{{ pond.champion }}</text>
			</view>
			
			<!-- 我有话讲 -->
			<view class="fishing-field-card__message" v-if="pond.message">
				<text class="fishing-field-card__message-text">老板说："{{ pond.message }}"</text>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	name: 'FishingFieldCard',
	props: {
		pond: {
			type: Object,
			required: true,
			default: () => ({
				pondName: '朝阳湖钓场',
				location: '朝阳区某某路123号',
				distance: '距离2.5km',
				fishSpecies: '鲤鱼',
				fee: '50',
				pondCount: '3',
				champion: '钓友老李 68斤',
				message: '今天鱼情不错，大家快来！',
				announcement: {
					topic: '正钓',
					status: '报名中'
				}
			})
		}
	},
	methods: {
		// 格式化地址显示：从区县开始，最长不超过下行"斤"字
		formatLocation(location) {
			if (!location) return '';
			
			// 从区县开始显示
			const districtMatch = location.match(/([^市]+区|[^市]+县|[^市]+市)/);
			if (districtMatch) {
				const startIndex = location.indexOf(districtMatch[1]);
				return location.substring(startIndex);
			}
			
			return location;
		},
		
		// 处理点击事件
		handleClick() {
			console.log('FishingFieldCard点击事件触发:', this.pond)
			this.$emit('click', this.pond)
		}
	}
}
</script>

<style scoped lang="scss">
/* 钓场名片组件样式 - 使用BEM命名法和项目颜色变量 */

/* 钓场名片容器 */
.fishing-field-card {
	background: #fafbfc;
	border-radius: 16rpx;
	box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.08);
	border: 1rpx solid #e9ecef;
	overflow: hidden;
	transition: all 0.3s ease;
	display: flex;
	flex-direction: column;
}

.fishing-field-card:active {
	transform: translateY(-2rpx);
	box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.12);
}

/* 主要内容区域 */
.fishing-field-card__main {
	display: flex;
	flex-direction: row;
	padding: 20rpx 24rpx 12rpx;
}

/* 左侧内容区域 */
.fishing-field-card__left {
	width: 80%;
	display: flex;
	flex-direction: column;
}

/* 1. 钓场名称容器 */
.fishing-field-card__name-container {
	margin-bottom: 12rpx;
}

.fishing-field-card__name {
	font-size: 36rpx;
	font-weight: 600;
	color: $uni-color-primary-red;
	line-height: 1.2;
}

/* 3. 名片内容区容器 */
.fishing-field-card__content-container {
	display: flex;
	flex-direction: column;
	gap: 12rpx;
}

/* 2. 公告区容器（占名片宽的五分之一） */
.fishing-field-card__announcement-container {
	width: 20%;
	display: flex;
	align-items: flex-start;
	justify-content: center;
	padding-left: 12rpx;
}

.fishing-field-card__announcement-content {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 15rpx;
}

.fishing-field-card__announcement-topic {
	font-size: 30rpx;
	color: #07c160;
	font-weight: 600;
	line-height: 1.2;
}

.fishing-field-card__announcement-status {
	font-size: 26rpx;
	color: #27ae60;
	font-weight: 500;
	line-height: 1.2;
	font-style: italic;
}

.fishing-field-card__location {
	font-size: 30rpx;
	color: $uni-text-color-secondary;
	font-weight: 500;
	margin-bottom: 0rpx;
	/* 内容截断：行内空间不够时，后面的内容不被展示 */
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}

/* 信息行样式 */
.fishing-field-card__info-row {
	display: flex;
	justify-content: flex-start;
	align-items: flex-start;
}

.fishing-field-card__info-label {
	font-size: 30rpx;
	color: #999;
	font-weight: 500;
	margin-right: 8rpx;
	flex-shrink: 0;
}

.fishing-field-card__info-value {
	font-size: 30rpx;
	color: #333;
	font-weight: 500;
	/* 地址内容允许换行显示 */
	word-wrap: break-word;
	word-break: break-all;
	line-height: 1.4;
}

/* 4. 底部列表容器（与名片等宽） */
.fishing-field-card__bottom-container {
	padding: 0 24rpx 16rpx;
	display: flex;
	flex-direction: column;
	gap: 8rpx;
}

/* 坑冠信息 */
.fishing-field-card__champion {
	padding: 4rpx 8rpx;
	background: #fff8e1;
	border-radius: 4rpx;
	border-left: 2rpx solid #ffa726;
	width: 100%;
}

.fishing-field-card__champion-text {
	font-size: 24rpx;
	color: $uni-color-champion;
	font-weight: 500;
	line-height: 1.2;
}

/* 我有话讲 */
.fishing-field-card__message {
	padding: 4rpx 8rpx;
	background: #f3f4f6;
	border-radius: 4rpx;
	border-left: 2rpx solid $uni-color-primary-green;
	width: 100%;
}

.fishing-field-card__message-text {
	font-size: 24rpx;
	color: $uni-text-color-primary;
	line-height: 1.2;
	font-style: italic;
}


/* 响应式设计 - 遵循内容截断策略，不改变字体大小 */
@media (max-width: 750rpx) {
	.fishing-field-card__main {
		padding: 20rpx 20rpx 12rpx;
	}
	
	.fishing-field-card__bottom-container {
		padding: 0 20rpx 16rpx;
	}
	
	.fishing-field-card__bottom-container {
		gap: 6rpx;
	}
}
</style>
