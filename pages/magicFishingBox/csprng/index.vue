<template>
	<view class="page">
		<view class="header">
			<view class="title">csprng 抽号列表</view>
			<button class="create-btn" type="primary" @click="openCreate">新建抽号</button>
		</view>

		<view v-if="loading" class="tip">加载中...</view>
		<view v-else-if="draws.length === 0" class="tip">暂无抽号，点击上方“新建抽号”</view>
		<view v-else class="list">
			<view v-for="item in draws" :key="item._id" class="card" @click="goDetail(item)">
				<view class="name">{{ item.name }}</view>
				<view class="meta">座位数：{{ item.totalSeats }}</view>
				<view class="meta">已参与：{{ (item.participants||[]).length }}</view>
			</view>
		</view>

		<!-- 简易创建表单（内置弹层） -->
		<view v-if="showCreate" class="overlay" @click.self="closeCreate">
			<view class="dialog">
				<view class="dialog-title">创建抽号器</view>
				<input class="input" v-model="form.name" placeholder="抽号名称" />
				<input class="input" v-model.number="form.totalSeats" type="number" placeholder="座位总数(>0)" />
				<view class="dialog-actions">
					<button @click="closeCreate">取消</button>
					<button type="primary" @click="submitCreate">创建</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			loading: false,
			draws: [],
			form: { name: '', totalSeats: 10 },
			showCreate: false
		}
	},
	onShow() {
		this.fetchList()
	},
	methods: {
		async fetchList() {
			this.loading = true
			try {
				const { result } = await uniCloud.callFunction({
					name: 'csprng-draw',
					data: { action: 'list' }
				})
				if (result && result.code === 0) {
					this.draws = result.data || []
				}
			} finally {
				this.loading = false
			}
		},
		openCreate() {
			this.form = { name: '', totalSeats: 10 }
			this.showCreate = true
		},
		closeCreate() {
			this.showCreate = false
		},
		async submitCreate() {
			if (!this.form.name || !this.form.totalSeats || this.form.totalSeats <= 0) {
				uni.showToast({ title: '请输入有效名称与座位数', icon: 'none' })
				return
			}
			const { result } = await uniCloud.callFunction({
				name: 'csprng-draw',
				data: { action: 'create', payload: { name: this.form.name, totalSeats: Number(this.form.totalSeats) } }
			})
			if (result && result.code === 0) {
				this.closeCreate()
				this.fetchList()
				uni.showToast({ title: '创建成功', icon: 'success' })
			} else {
				uni.showToast({ title: (result && result.message) || '创建失败', icon: 'none' })
			}
		},
		goDetail(item) {
			uni.navigateTo({ url: '/pages/magicFishingBox/csprng/detail?id=' + item._id })
		}
	}
}
</script>

<style scoped>
.page {
	padding: 24rpx;
}
.header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 24rpx;
}
.title {
	font-size: 32rpx;
	font-weight: 600;
}
.tip { color: #888; padding: 20rpx 0; }
.list { display: grid; grid-template-columns: 1fr; gap: 20rpx; }
.card { background: #fff; border-radius: 16rpx; padding: 24rpx; box-shadow: 0 4rpx 16rpx rgba(0,0,0,0.06); }
.name { font-size: 30rpx; font-weight: 600; margin-bottom: 8rpx; }
.meta { color: #666; font-size: 24rpx; }
.dialog { background: #fff; padding: 24rpx; border-radius: 16rpx; width: 560rpx; }
.dialog-title { font-size: 30rpx; font-weight: 600; margin-bottom: 16rpx; }
.input { background: #f7f7f7; border-radius: 12rpx; padding: 16rpx; margin-bottom: 16rpx; }
.dialog-actions { display: flex; justify-content: flex-end; gap: 16rpx; }
.overlay { position: fixed; left: 0; top: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.35); display: flex; align-items: center; justify-content: center; z-index: 1000; }
</style>

