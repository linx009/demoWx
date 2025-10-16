<template>
	<view class="example-container">
		<view class="title">鱼塘名片模板示例</view>
		
		<!-- 示例1：朝阳湖钓场 -->
		<view class="example-section">
			<view class="section-title">示例1：朝阳湖钓场</view>
			<PondCardTemplate :pond="chaoyangPond" />
		</view>
		
		<!-- 示例2：西湖钓场 -->
		<view class="example-section">
			<view class="section-title">示例2：西湖钓场</view>
			<PondCardTemplate :pond="xihuPond" />
		</view>
		
		<!-- 示例3：南山钓场 -->
		<view class="example-section">
			<view class="section-title">示例3：南山钓场</view>
			<PondCardTemplate :pond="nanshanPond" />
		</view>
		
		<!-- 示例4：海滨水库 -->
		<view class="example-section">
			<view class="section-title">示例4：海滨水库</view>
			<PondCardTemplate :pond="seasidePond" />
		</view>
		
		<!-- 示例5：丰台鱼塘 -->
		<view class="example-section">
			<view class="section-title">示例5：丰台鱼塘</view>
			<PondCardTemplate :pond="fengtaiPond" />
		</view>
		
		<!-- 示例6：通下野钓点 -->
		<view class="example-section">
			<view class="section-title">示例6：通下野钓点</view>
			<PondCardTemplate :pond="wildPond" />
		</view>
	</view>
</template>

<script>
import PondCardTemplate from './pond-card-template.vue'

export default {
	name: 'ExampleUsage',
	components: {
		PondCardTemplate
	},
	data() {
		return {
			// 朝阳湖钓场数据
			chaoyangPond: {
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
			},
			
			// 西湖钓场数据
			xihuPond: {
				pondName: '西湖钓场',
				location: '西湖区风景路456号',
				distance: '距离1.8km',
				infoType: '夜钓',
				infoStatus: '报名中',
				fishSpecies: '草鱼',
				fishQuantity: '3000斤',
				fee: '80元/6小时',
				returnPrice: '5元/斤',
				spots: '30',
				time: '今晚7点开始',
				pondImage: '/static/logo.png',
				champion: '钓友小王 45斤',
				message: '夜钓环境很好，鱼情稳定！'
			},
			
			// 南山钓场数据
			nanshanPond: {
				pondName: '南山钓场',
				location: '南山区山景路789号',
				distance: '距离5.2km',
				infoType: '野钓',
				infoStatus: null, // 没有报名状态
				fishSpecies: '鲫鱼',
				fishQuantity: '2000斤',
				fee: '30元/天',
				returnPrice: '3元/斤',
				spots: '20',
				time: '全天开放',
				pondImage: '/static/logo.png',
				champion: '钓友老张 32斤',
				message: '环境清幽，适合休闲垂钓'
			},
			
			// 海滨水库数据
			seasidePond: {
				pondName: '海滨水库',
				location: '北京市海淀区上庄水库',
				distance: '距离5.8km',
				infoType: '夜钓',
				infoStatus: '报名中',
				fishSpecies: '草鱼',
				fishQuantity: '3000斤',
				fee: '80元/6小时',
				returnPrice: '5元/斤',
				spots: '30',
				time: '今晚7点开始',
				pondImage: '/static/logo.png',
				champion: '钓友小王 45斤',
				message: '夜钓环境很好，鱼情稳定！'
			},
			
			// 丰台鱼塘数据
			fengtaiPond: {
				pondName: '丰台鱼塘',
				location: '北京市丰台区南苑',
				distance: '距离8.2km',
				infoType: '正钓',
				infoStatus: '爆满',
				fishSpecies: '鲫鱼',
				fishQuantity: '2000斤',
				fee: '60元/6小时',
				returnPrice: '3元/斤',
				spots: '25',
				time: '限时6小时',
				pondImage: '/static/logo.png',
				champion: '钓友老张 32斤',
				message: '新手友好，环境干净！'
			},
			
			// 通下野钓点数据
			wildPond: {
				pondName: '通下野钓点',
				location: '北京市通州区运河公园',
				distance: '距离12.5km',
				infoType: '野钓',
				infoStatus: null,
				fishSpecies: '鲤鱼',
				fishQuantity: '1500斤',
				fee: '免费',
				returnPrice: '自留',
				spots: '20',
				time: '全天开放',
				pondImage: '/static/logo.png',
				champion: '钓友老刘 28斤',
				message: '环境清幽，适合休闲垂钓'
			}
		}
	}
}
</script>

<style scoped>
.example-container {
	padding: 20rpx;
	background: #f5f5f5;
	min-height: 100vh;
}

.title {
	font-size: 32rpx;
	font-weight: 600;
	color: #333;
	text-align: center;
	margin-bottom: 30rpx;
}

.example-section {
	margin-bottom: 40rpx;
}

.section-title {
	font-size: 28rpx;
	font-weight: 500;
	color: #666;
	margin-bottom: 20rpx;
	padding-left: 10rpx;
	border-left: 4rpx solid #07c160;
}
</style>
