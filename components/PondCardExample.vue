<template>
	<view class="pond-card-example">
		<view class="example-title">钓场名片组件使用示例</view>
		
		<!-- 使用钓场名片组件 -->
		<FishingFieldCard :pond="pondData" />
		
		<!-- 多个钓场名片示例 -->
		<view class="pond-list">
			<FishingFieldCard 
				v-for="(pond, index) in pondList" 
				:key="index" 
				:pond="pond" 
			/>
		</view>
	</view>
</template>

<script>
import FishingFieldCard from './FishingFieldCard.vue'

export default {
	name: 'PondCardExample',
	components: {
		FishingFieldCard
	},
	data() {
		return {
			// 单个钓场数据示例
			pondData: {
				pondName: '朝阳湖钓场',
				location: '北京市朝阳区某某路123号',
				distance: '距离2.5km',
				fishSpecies: '鲤鱼',
				fee: '50元/4小时',
				champion: '钓友老李 68斤',
				message: '今天鱼情不错，大家快来！',
				announcement: {
					topic: '正钓',
					status: '报名中'
				}
			},
			
			// 多个钓场数据示例
			pondList: [
				{
					pondName: '绿野钓场',
					location: '上海市浦东新区某某路456号',
					distance: '距离1.8km',
					fishSpecies: '鲫鱼',
					fee: '80元/6小时',
					champion: '钓友小王 45斤',
					message: '新放的鱼，口很好！',
					announcement: {
						topic: '新鱼场',
						status: '火爆中'
					}
				},
				{
					pondName: '山水钓场',
					location: '广州市天河区某某路789号',
					distance: '距离3.2km',
					fishSpecies: '草鱼',
					fee: '60元/全天',
					champion: '钓友老张 52斤',
					message: '环境优美，适合休闲'
				}
			]
		}
	}
}
</script>

<style scoped lang="scss">
.pond-card-example {
	padding: 20rpx;
	background-color: $uni-bg-color-content;
	min-height: 100vh;
}

.example-title {
	font-size: 32rpx;
	font-weight: 600;
	color: $uni-text-color-primary;
	text-align: center;
	margin-bottom: 30rpx;
}

.pond-list {
	display: flex;
	flex-direction: column;
	gap: 20rpx;
	margin-top: 30rpx;
}
</style>
