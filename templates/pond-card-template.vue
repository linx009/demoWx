<template>
	<!-- 鱼塘名片模板 -->
	<view class="card new-template">
		<!-- 卡片头部：鱼塘名称 + 信息类型 -->
		<view class="card-header-new">
			<view class="pond-info-new">
				<text class="pond-name-new">{{ pond.pondName }}</text>
				<text class="location-new">地址：{{ pond.location }} ({{ pond.distance }})</text>
			</view>
			<view class="info-type-new">
				<view class="type-container-new">
					<!-- 正钓放在报名中前面 -->
					<text class="type-title-new">{{ pond.infoType }}</text>
					<view class="status-badge-new" v-if="pond.infoStatus">
						<text class="badge-text-new">{{ pond.infoStatus }}</text>
					</view>
				</view>
			</view>
		</view>
		
		<!-- 卡片主体：信息展示 + 左下角图片 -->
		<view class="card-body-new">
			<!-- 信息区域 -->
			<view class="info-area-new">
				<!-- 第一行：鱼种和数量 -->
				<view class="info-row-new">
					<text class="info-item-new">鱼种：{{ pond.fishSpecies }}</text>
					<text class="info-item-new">数量：{{ pond.fishQuantity }}</text>
				</view>
				
				<!-- 第二行：钓费和回鱼 -->
				<view class="info-row-new">
					<text class="info-item-new">钓费：{{ pond.fee }}</text>
					<text class="info-item-new">回鱼：{{ pond.returnPrice }}</text>
				</view>
				
				<!-- 第三行：钓位数和时间（单行显示） -->
				<view class="info-row-new">
					<text class="info-item-new">钓位数：{{ pond.spots }}个</text>
					<text class="info-item-new time-compact">时间：{{ pond.time }}</text>
				</view>
			</view>
			
			<!-- 左下角图片 + 坑冠和留言 -->
			<view class="bottom-section-new">
				<!-- 钓场图片 - 左下角，150rpx -->
				<view class="pond-image-new">
					<image :src="pond.pondImage" class="image-new" mode="aspectFill"></image>
				</view>
				
				<!-- 坑冠和留言区域 - 并排显示 -->
				<view class="champion-message-new">
					<!-- 坑冠信息 - 第一行 -->
					<view class="champion-new" v-if="pond.champion">
						<text class="champion-text-new">坑冠：{{ pond.champion }}</text>
					</view>
					
					<!-- 我有话讲 - 第二行 -->
					<view class="message-new" v-if="pond.message">
						<text class="message-text-new">老板说："{{ pond.message }}"</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	name: 'PondCardTemplate',
	props: {
		pond: {
			type: Object,
			required: true,
			default: () => ({
				pondName: '朝阳湖钓场',
				location: '朝阳区某某路123号',
				distance: '距离2.5km',
				infoType: '正钓',
				infoStatus: '报名中',
				fishSpecies: '鲤鱼',
				fishQuantity: '5000斤',
				fee: '50元/4小时',
				returnPrice: '4元/斤',
				spots: '50',
				time: '星期六上午8点',
				pondImage: '/static/logo.png',
				champion: '钓友老李 68斤',
				message: '今天鱼情不错，大家快来！'
			})
		}
	}
}
</script>

<style scoped>
/* 鱼塘名片模板样式 */

/* 新模板卡片样式 - 微调版本 */
.card.new-template {
	background: #fafbfc;
	border-radius: 16rpx;
	box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.08);
	border: 1rpx solid #e9ecef;
	overflow: hidden;
	transition: all 0.3s ease;
}

.card.new-template:active {
	transform: translateY(-2rpx);
	box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.12);
}

/* 卡片头部 */
.card-header-new {
	display: flex;
	justify-content: space-between;
	align-items: flex-start;
	padding: 0rpx 24rpx 0rpx;
}

.pond-info-new {
	flex: 1;
}

.pond-name-new {
	font-size: 36rpx;
	font-weight: 600;
	color: #e74c3c;
	display: block;
	margin-bottom: 12rpx;
}

.location-new {
	font-size: 26rpx;
	color: #666;
	font-weight: 500;
	margin-bottom: 12rpx;
}

.info-type-new {
	display: flex;
	align-items: flex-start;
	margin-left: 20rpx;
}

.type-container-new {
	display: flex;
	flex-direction: column;
	align-items: flex-end;
	position: relative;
}

/* 报名中放在正钓后面 */
.status-badge-new {
	background: transparent;
	color: #07c160;
	padding: 0;
	border-radius: 0;
	margin-top: 8rpx;
	box-shadow: none;
	transform: none;
}

.badge-text-new {
	font-size: 26rpx;
	font-weight: 800;
	color: #07c160;
	text-shadow: 
		0rpx 0rpx 8rpx rgba(7, 193, 96, 0.4),
		2rpx 2rpx 4rpx rgba(0, 0, 0, 0.1),
		0rpx 0rpx 2rpx rgba(7, 193, 96, 0.6);
	letter-spacing: 2rpx;
	font-family: 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', 'STHeiti', sans-serif;
	transform: skew(-3deg) scale(1.05);
	background: linear-gradient(135deg, #07c160, #4cd964);
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
	background-clip: text;
	position: relative;
	display: inline-block;
}

.type-title-new {
	font-size: 36rpx;
	font-weight: 700;
	color: #e74c3c;
}

/* 卡片主体 */
.card-body-new {
	padding: 0 24rpx 4rpx;
}

/* 信息区域 */
.info-area-new {
	display: flex;
	flex-direction: column;
	gap: 12rpx;
	margin-bottom: 16rpx;
}

.info-row-new {
	display: flex;
	justify-content: space-between;
	gap: 16rpx;
}

.info-item-new {
	font-size: 26rpx;
	color: #666;
	font-weight: 500;
	flex: 1;
}

/* 时间紧凑显示 */
.time-compact {
	letter-spacing: -0.5rpx;
}

/* 底部区域：图片 + 坑冠和留言 */
.bottom-section-new {
	display: flex;
	align-items: flex-end;
	gap: 12rpx;
}

/* 钓场图片 - 左下角，高度自适应坑冠+留言 */
.pond-image-new {
	width: 150rpx;
	height: auto;
	min-height: 80rpx;
	border-radius: 8rpx;
	overflow: hidden;
	box-shadow: 0 2rpx 6rpx rgba(0, 0, 0, 0.1);
	flex-shrink: 0;
	align-self: stretch;
}

.image-new {
	width: 100%;
	height: 100%;
}

/* 坑冠和留言区域 - 宽度为单行减去图片宽度 */
.champion-message-new {
	flex: 1;
	display: flex;
	flex-direction: column;
	gap: 8rpx;
	/* 宽度自动计算：单行宽度 - 图片宽度 - 间距 */
	width: calc(100% - 150rpx - 12rpx);
	/* 设置最小高度，确保图片有足够高度 */
	min-height: 80rpx;
}

/* 坑冠信息 - 占用单行减去图片宽度 */
.champion-new {
	padding: 4rpx 8rpx;
	background: #fff8e1;
	border-radius: 4rpx;
	border-left: 2rpx solid #ffa726;
	width: 100%;
}

.champion-text-new {
	font-size: 24rpx;
	color: #e65100;
	font-weight: 500;
	line-height: 1.2;
}

/* 我有话讲 - 占用单行减去图片宽度 */
.message-new {
	padding: 4rpx 8rpx;
	background: #f3f4f6;
	border-radius: 4rpx;
	border-left: 2rpx solid #07c160;
	width: 100%;
}

.message-text-new {
	font-size: 24rpx;
	color: #333;
	line-height: 1.2;
	font-style: italic;
}

/* 响应式设计 */
@media (max-width: 750rpx) {
	/* 新模板响应式设计 */
	.card-header-new {
		padding: 0rpx 20rpx 0rpx;
	}
	
	.card-body-new {
		padding: 0 20rpx 0rpx;
	}
	
	.pond-name-new {
		font-size: 32rpx;
		color: #e74c3c;
	}
	
	.location-new {
		font-size: 22rpx;
	}
	
	.type-title-new {
		font-size: 32rpx;
		color: #e74c3c;
	}
	
	.badge-text-new {
		font-size: 18rpx;
	}
	
	.info-item-new {
		font-size: 24rpx;
	}
	
	.champion-text-new,
	.message-text-new {
		font-size: 22rpx;
	}
	
	.pond-image-new {
		width: 120rpx;
		height: auto;
		min-height: 60rpx;
	}
	
	.champion-message-new {
		/* 响应式宽度计算：单行宽度 - 图片宽度 - 间距 */
		width: calc(100% - 120rpx - 10rpx);
		gap: 6rpx;
		min-height: 60rpx;
	}
	
	.bottom-section-new {
		gap: 10rpx;
	}
}
</style>
