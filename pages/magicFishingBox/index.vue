<template>
	<view class="container">
		<view class="header">
			<text class="title">神奇钓箱</text>
			<text class="subtitle">钓鱼工具和实用功能</text>
		</view>
		
		<view class="icon-section">
			<view class="section-title">常用图标</view>
			<view class="icon-grid">
				<view class="icon-item" v-for="icon in commonIcons" :key="icon.name">
					<t-icon :name="icon.name" size="40rpx" />
					<text class="icon-name">{{ icon.name }}</text>
					<text class="icon-desc">{{ icon.desc }}</text>
				</view>
			</view>
		</view>
		
		<view class="icon-section">
			<view class="section-title">导航图标</view>
			<view class="icon-grid">
				<view class="icon-item" v-for="icon in navigationIcons" :key="icon.name">
					<t-icon :name="icon.name" size="40rpx" />
					<text class="icon-name">{{ icon.name }}</text>
					<text class="icon-desc">{{ icon.desc }}</text>
				</view>
			</view>
		</view>
		
		<view class="icon-section">
			<view class="section-title">用户相关图标</view>
			<view class="icon-grid">
				<view class="icon-item" v-for="icon in userIcons" :key="icon.name">
					<t-icon :name="icon.name" size="40rpx" />
					<text class="icon-name">{{ icon.name }}</text>
					<text class="icon-desc">{{ icon.desc }}</text>
				</view>
			</view>
		</view>
		
		<view class="icon-section">
			<view class="section-title">应用相关图标</view>
			<view class="icon-grid">
				<view class="icon-item" v-for="icon in appIcons" :key="icon.name">
					<t-icon :name="icon.name" size="40rpx" />
					<text class="icon-name">{{ icon.name }}</text>
					<text class="icon-desc">{{ icon.desc }}</text>
				</view>
			</view>
		</view>
		
		<view class="usage-section">
			<view class="section-title">使用方法</view>
			<view class="code-block">
				<text class="code-text">&lt;t-icon name="home" size="40rpx" /&gt;</text>
			</view>
			<view class="code-block">
				<text class="code-text">&lt;t-icon name="user" size="40rpx" color="#0052D9" /&gt;</text>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			commonIcons: [
				{ name: 'home', desc: '首页' },
				{ name: 'search', desc: '搜索' },
				{ name: 'setting', desc: '设置' },
				{ name: 'notification', desc: '通知' },
				{ name: 'message', desc: '消息' },
				{ name: 'heart', desc: '收藏' },
				{ name: 'star', desc: '星标' },
				{ name: 'add', desc: '添加' }
			],
			navigationIcons: [
				{ name: 'chevron-left', desc: '左箭头' },
				{ name: 'chevron-right', desc: '右箭头' },
				{ name: 'chevron-up', desc: '上箭头' },
				{ name: 'chevron-down', desc: '下箭头' },
				{ name: 'arrow-left', desc: '返回' },
				{ name: 'arrow-right', desc: '前进' },
				{ name: 'close', desc: '关闭' },
				{ name: 'check', desc: '确认' }
			],
			userIcons: [
				{ name: 'user', desc: '用户' },
				{ name: 'user-circle', desc: '用户圆形' },
				{ name: 'user-add', desc: '添加用户' },
				{ name: 'contacts', desc: '联系人' },
				{ name: 'group', desc: '群组' },
				{ name: 'avatar', desc: '头像' },
				{ name: 'profile', desc: '个人资料' },
				{ name: 'account', desc: '账户' }
			],
			appIcons: [
				{ name: 'app', desc: '应用' },
				{ name: 'apps', desc: '应用集合' },
				{ name: 'grid', desc: '网格' },
				{ name: 'menu', desc: '菜单' },
				{ name: 'more', desc: '更多' },
				{ name: 'tools', desc: '工具' },
				{ name: 'component', desc: '组件' },
				{ name: 'plugin', desc: '插件' }
			]
		}
	}
}
</script>

<style scoped>
.container {
	padding: 40rpx;
	background-color: #fbfbfb;
	min-height: 100vh;
}

.header {
	text-align: center;
	margin-bottom: 60rpx;
}

.title {
	display: block;
	font-size: 48rpx;
	font-weight: bold;
	color: #333333;
	margin-bottom: 20rpx;
}

.subtitle {
	display: block;
	font-size: 28rpx;
	color: #666666;
}

.icon-section {
	margin-bottom: 60rpx;
}

.section-title {
	font-size: 32rpx;
	font-weight: bold;
	color: #333333;
	margin-bottom: 30rpx;
	padding-left: 20rpx;
	border-left: 6rpx solid #07c160;
}

.icon-grid {
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	gap: 30rpx;
}

.icon-item {
	background: #ffffff;
	border-radius: 16rpx;
	padding: 24rpx 16rpx;
	text-align: center;
	box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.08);
	border: 1rpx solid #f0f0f0;
	transition: all 0.3s ease;
	margin: 8rpx;
}

.icon-item:active {
	transform: scale(0.95);
	box-shadow: 0 6rpx 20rpx rgba(0, 0, 0, 0.12);
}

.icon-name {
	display: block;
	font-size: 24rpx;
	font-weight: bold;
	color: #333;
	margin: 20rpx 0 10rpx 0;
}

.icon-desc {
	display: block;
	font-size: 20rpx;
	color: #666;
}

.usage-section {
	margin-top: 60rpx;
}

.code-block {
	background: rgba(0, 0, 0, 0.8);
	border-radius: 12rpx;
	padding: 30rpx;
	margin-bottom: 20rpx;
}

.code-text {
	color: #00ff00;
	font-family: 'Courier New', monospace;
	font-size: 24rpx;
	line-height: 1.5;
}
</style>