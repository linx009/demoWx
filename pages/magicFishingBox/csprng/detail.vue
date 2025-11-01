<template>
	<view class="page">
		<view class="card">
			<view class="name">{{ draw.name || '抽号详情' }}</view>
			<view class="meta">总座位：{{ draw.totalSeats || '-' }}</view>
			<view class="meta">已参与：{{ participants.length }}</view>
		</view>

		<view class="actions">
			<button type="primary" @click="handleJoin">参与报号</button>
		</view>

		<view class="list">
			<view class="list-title">参与名单</view>
			<view v-if="participants.length === 0" class="tip">暂无参与</view>
			<view v-else>
				<view v-for="(p, idx) in participants" :key="idx" class="row">
					<text class="seat">座位 {{ p.seat }}</text>
					<text class="uid">{{ p.userId }}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			id: '',
			draw: {},
			participants: []
		}
	},
	onLoad(query) {
		this.id = (query && query.id) || ''
	},
	onShow() {
		this.fetch()
	},
	methods: {
		async fetch() {
			// 复用 list 结果中的单个
			const { result } = await uniCloud.callFunction({ name: 'csprng-draw', data: { action: 'list' } })
			if (result && result.code === 0) {
				const found = (result.data || []).find(d => d._id === this.id)
				if (found) {
					this.draw = found
					this.participants = found.participants || []
				}
			}
		},
		async handleJoin() {
			const userId = this.getUserId()
			const { result } = await uniCloud.callFunction({
				name: 'csprng-draw',
				data: { action: 'join', payload: { drawId: this.id, userId } }
			})
			if (result && result.code === 0) {
				uni.showToast({ title: `分配座位 ${result.data.seat}`, icon: 'success' })
				this.fetch()
			} else {
				uni.showToast({ title: (result && result.message) || '参与失败', icon: 'none' })
			}
		},
		getUserId() {
			// 简易设备级ID：如有 uni-id 登录，可替换为真实 uid
			try {
				const key = 'csprng_uid'
				let uid = uni.getStorageSync(key)
				if (!uid) {
					uid = Date.now().toString(36) + Math.random().toString(36).slice(2)
					uni.setStorageSync(key, uid)
				}
				return uid
			} catch (e) {
				return 'anonymous'
			}
		}
	}
}
</script>

<style scoped>
.page { padding: 24rpx; }
.card { background: #fff; border-radius: 16rpx; padding: 24rpx; box-shadow: 0 4rpx 16rpx rgba(0,0,0,0.06); margin-bottom: 20rpx; }
.name { font-size: 32rpx; font-weight: 600; margin-bottom: 8rpx; }
.meta { color: #666; font-size: 24rpx; }
.actions { margin: 20rpx 0; }
.list { background: #fff; border-radius: 16rpx; padding: 24rpx; box-shadow: 0 4rpx 16rpx rgba(0,0,0,0.06); }
.list-title { font-size: 28rpx; font-weight: 600; margin-bottom: 12rpx; }
.tip { color: #888; }
.row { display: flex; justify-content: space-between; padding: 16rpx 0; border-bottom: 1rpx solid #f0f0f0; }
.row:last-child { border-bottom: 0; }
.seat { font-weight: 600; }
.uid { color: #666; max-width: 60%; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
</style>

