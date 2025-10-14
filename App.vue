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
	
	/* 卡片样式 */
	.card {
		background: #ffffff;
		border-radius: 20rpx;
		box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.1);
		border: 1rpx solid #e5e5e5;
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
