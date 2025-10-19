<template>
	<!-- 钓场名片组件 -->
	<view class="fishing-field-card" @click="handleClick">
		<!-- 卡片头部：钓场名称 -->
		<view class="fishing-field-card__header">
			<view class="fishing-field-card__info">
				<text class="fishing-field-card__name">{{ pond.pondName }}</text>
				<text class="fishing-field-card__location">地址：{{ formatLocation(pond.location) }} ({{ pond.distance }})</text>
			</view>
		</view>
		
		<!-- 卡片主体：信息展示 -->
		<view class="fishing-field-card__body">
			<!-- 信息区域 -->
			<view class="fishing-field-card__info-area">
				<!-- 第一行：鱼种 -->
				<view class="fishing-field-card__info-row">
					<text class="fishing-field-card__info-item">鱼种：{{ pond.fishSpecies }}</text>
				</view>
				
				<!-- 第二行：钓费 -->
				<view class="fishing-field-card__info-row">
					<text class="fishing-field-card__info-item">钓费：{{ pond.fee }}</text>
				</view>
			</view>
			
			<!-- 坑冠和留言区域 -->
			<view class="fishing-field-card__bottom">
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
				fee: '50元/4小时',
				champion: '钓友老李 68斤',
				message: '今天鱼情不错，大家快来！'
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
}

.fishing-field-card:active {
	transform: translateY(-2rpx);
	box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.12);
}

/* 卡片头部 */
.fishing-field-card__header {
	padding: 0rpx 24rpx 12rpx;
}

.fishing-field-card__info {
	width: 100%;
}

.fishing-field-card__name {
	font-size: 36rpx;
	font-weight: 600;
	color: $uni-color-primary-red;
	display: block;
	margin-bottom: 12rpx;
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

/* 卡片主体 */
.fishing-field-card__body {
	padding: 0 24rpx 4rpx;
}

/* 信息区域 */
.fishing-field-card__info-area {
	display: flex;
	flex-direction: column;
	gap: 12rpx;
	margin-bottom: 16rpx;
}

.fishing-field-card__info-row {
	display: flex;
	justify-content: flex-start;
}

.fishing-field-card__info-item {
	font-size: 30rpx;
	color: $uni-text-color-secondary;
	font-weight: 500;
	/* 内容截断：行内空间不够时，后面的内容不被展示 */
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}

/* 底部区域：坑冠和留言 */
.fishing-field-card__bottom {
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
	.fishing-field-card__header {
		padding: 0rpx 20rpx 0rpx;
	}
	
	.fishing-field-card__body {
		padding: 0 20rpx 0rpx;
	}
	
	.fishing-field-card__bottom {
		gap: 6rpx;
	}
}
</style>
