<template>
	<view id="app">
		<!-- 页面内容 -->
		<view class="page-content">
			<!-- uni-app会自动处理页面路由 -->
		</view>
	</view>
</template>

<script>
export default {
	onLaunch: function() {
		console.log('App Launch')
	},
	onShow: function() {
		console.log('App Show')
	},
	onHide: function() {
		console.log('App Hide')
	}
}
</script>

<style>
	@import url('./static/css/tabbar.css');
	
	/* 全局样式重置 */
	page {
		background-color: #fbfbfb;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', 'Helvetica Neue', Helvetica, Arial, sans-serif;
		line-height: 1.6;
		color: #333;
	}
	
	#app {
		height: 100vh;
	}
	
	/* 全局容器样式 */
	.container {
		min-height: 100vh;
		background-color: #fbfbfb;
		position: relative;
	}
	
	/* 统一卡片样式模板 */
	.card {
		background: #ffffff;
		border-radius: 16rpx;
		box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.08);
		border: 1rpx solid #f0f0f0;
		margin: 8rpx;
		padding: 24rpx;
		overflow: hidden;
		transition: all 0.3s ease;
		min-height: 200rpx;
	}
	
	.card:active {
		transform: scale(0.95);
		box-shadow: 0 6rpx 20rpx rgba(0, 0, 0, 0.12);
	}
	
	/* 卡片结构组件 */
	.card-header {
		margin-bottom: 16rpx;
		padding-bottom: 16rpx;
		border-bottom: 1rpx solid #f0f0f0;
	}
	
	.card-title {
		font-size: 32rpx;
		font-weight: 600;
		color: #333333;
		margin-bottom: 8rpx;
		line-height: 1.5;
	}
	
	.card-subtitle {
		font-size: 24rpx;
		color: #666666;
		line-height: 1.5;
	}
	
	.card-body {
		margin-bottom: 16rpx;
	}
	
	.card-content {
		font-size: 28rpx;
		color: #333333;
		line-height: 1.5;
		margin-bottom: 16rpx;
	}
	
	.card-meta {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 16rpx;
	}
	
	.meta-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		flex: 1;
		padding: 12rpx;
		background: #f8f9fa;
		border-radius: 8rpx;
	}
	
	.meta-label {
		font-size: 20rpx;
		color: #999999;
		margin-bottom: 4rpx;
	}
	
	.meta-value {
		font-size: 24rpx;
		font-weight: 600;
		color: #333333;
	}
	
	.card-footer {
		padding-top: 16rpx;
		border-top: 1rpx solid #f0f0f0;
	}
	
	.card-actions {
		display: flex;
		justify-content: space-around;
		align-items: center;
		gap: 12rpx;
	}
	
	.action-btn {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 4rpx;
		padding: 12rpx;
		border-radius: 8rpx;
		transition: all 0.2s ease;
		min-width: 80rpx;
	}
	
	.action-btn:active {
		background: #f8f9fa;
		transform: scale(0.95);
	}
	
	.action-icon {
		font-size: 28rpx;
		transition: all 0.2s ease;
	}
	
	.action-text {
		font-size: 20rpx;
		color: #666666;
		font-weight: 500;
	}
	
	/* 卡片标签 */
	.card-tags {
		display: flex;
		gap: 8rpx;
		flex-wrap: wrap;
		justify-content: center;
		margin-bottom: 16rpx;
	}
	
	.card-tag {
		font-size: 20rpx;
		color: #07c160;
		background: linear-gradient(135deg, #e8f5e8 0%, #d4edda 100%);
		padding: 6rpx 12rpx;
		border-radius: 12rpx;
		border: 1rpx solid #c3e6cb;
		font-weight: 500;
	}
	
	/* 卡片状态 */
	.card-status {
		padding: 6rpx 12rpx;
		border-radius: 20rpx;
		font-size: 20rpx;
		font-weight: 600;
		margin-left: 16rpx;
	}
	
	.card-status.active {
		background: linear-gradient(135deg, #e8f5e8 0%, #d4edda 100%);
		color: #07c160;
		border: 1rpx solid #c3e6cb;
	}
	
	.card-status.busy {
		background: linear-gradient(135deg, #ffe8e8 0%, #f8d7da 100%);
		color: #ff4757;
		border: 1rpx solid #f5c6cb;
	}
	
	/* 卡片尺寸变体 */
	.card-large {
		padding: 32rpx;
		min-height: 300rpx;
	}
	
	.card-small {
		padding: 16rpx;
		min-height: 150rpx;
	}
	
	/* 响应式设计 */
	@media (max-width: 750rpx) {
		.card {
			margin: 6rpx;
			padding: 16rpx;
		}
		
		.card-title {
			font-size: 30rpx;
		}
		
		.card-content {
			font-size: 26rpx;
		}
		
		.card-large {
			padding: 24rpx;
		}
		
		.card-small {
			padding: 12rpx;
		}
	}
	
	/* 按钮样式 */
	.btn-primary {
		background: #07c160;
		color: white;
		border: none;
		border-radius: 8rpx;
		padding: 24rpx 48rpx;
		font-size: 28rpx;
		font-weight: 600;
		box-shadow: 0 2rpx 8rpx rgba(7, 193, 96, 0.3);
		transition: all 0.3s ease;
	}
	
	.btn-primary:active {
		transform: translateY(1rpx);
		box-shadow: 0 1rpx 4rpx rgba(7, 193, 96, 0.3);
	}
	
	/* 输入框样式 */
	.input-modern {
		background: #ffffff;
		border: 1rpx solid #e5e5e5;
		border-radius: 8rpx;
		padding: 24rpx 32rpx;
		font-size: 28rpx;
		transition: all 0.3s ease;
	}
	
	.input-modern:focus {
		border-color: #07c160;
		box-shadow: 0 0 0 2rpx rgba(7, 193, 96, 0.1);
	}
	
	/* 文字样式 */
	.text-primary {
		color: #07c160;
	}
	
	.text-secondary {
		color: #6c757d;
	}
	
	.text-success {
		color: #28a745;
	}
	
	.text-warning {
		color: #ffc107;
	}
	
	.text-danger {
		color: #dc3545;
	}
	
	/* 间距工具类 */
	.mt-1 { margin-top: 16rpx; }
	.mt-2 { margin-top: 32rpx; }
	.mt-3 { margin-top: 48rpx; }
	.mb-1 { margin-bottom: 16rpx; }
	.mb-2 { margin-bottom: 32rpx; }
	.mb-3 { margin-bottom: 48rpx; }
	.p-1 { padding: 16rpx; }
	.p-2 { padding: 32rpx; }
	.p-3 { padding: 48rpx; }
	
	/* 动画效果 */
	.fade-in {
		animation: fadeIn 0.5s ease-in-out;
	}
	
	@keyframes fadeIn {
		from { opacity: 0; transform: translateY(20rpx); }
		to { opacity: 1; transform: translateY(0); }
	}
	
	.slide-up {
		animation: slideUp 0.3s ease-out;
	}
	
	@keyframes slideUp {
		from { transform: translateY(100%); }
		to { transform: translateY(0); }
	}
	
	/* 加载动画 */
	.loading {
		display: inline-block;
		width: 40rpx;
		height: 40rpx;
		border: 4rpx solid rgba(7, 193, 96, 0.3);
		border-radius: 50%;
		border-top-color: #07c160;
		animation: spin 1s ease-in-out infinite;
	}
	
	@keyframes spin {
		to { transform: rotate(360deg); }
	}
</style>
