<template>
	<view class="content">
		<image class="logo" src="/static/logo.png"></image>
		<view class="text-area">
			<text class="title">{{title}}</text>
		</view>
		
		<!-- 测试界面组件 -->
		<view class="test-section">
			<text class="section-title">测试界面</text>
			
			<!-- 按钮测试 -->
			<view class="test-group">
				<text class="group-title">按钮测试</text>
				<button class="test-btn" @click="handleButtonClick">点击我</button>
				<button class="test-btn" type="primary" @click="handlePrimaryClick">主要按钮</button>
				<button class="test-btn" type="warn" @click="handleWarnClick">警告按钮</button>
			</view>
			
			<!-- 输入框测试 -->
			<view class="test-group">
				<text class="group-title">输入框测试</text>
				<input class="test-input" v-model="inputValue" placeholder="请输入内容" />
				<text class="input-result">输入内容: {{inputValue}}</text>
			</view>
			
			<!-- 开关测试 -->
			<view class="test-group">
				<text class="group-title">开关测试</text>
				<switch :checked="switchValue" @change="handleSwitchChange" />
				<text class="switch-result">开关状态: {{switchValue ? '开' : '关'}}</text>
			</view>
			
			<!-- 选择器测试 -->
			<view class="test-group">
				<text class="group-title">选择器测试</text>
				<picker :range="pickerOptions" @change="handlePickerChange">
					<view class="picker">当前选择: {{pickerOptions[currentIndex]}}</view>
				</picker>
			</view>
			
			<!-- 计数器测试 -->
			<view class="test-group">
				<text class="group-title">计数器测试</text>
				<view class="counter">
					<button class="counter-btn" @click="decrement">-</button>
					<text class="counter-value">{{count}}</text>
					<button class="counter-btn" @click="increment">+</button>
				</view>
			</view>
			
			<!-- 结果显示 -->
			<view class="test-group">
				<text class="group-title">测试结果</text>
				<text class="result-text">{{testResult}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: '首页',
				inputValue: '',
				switchValue: false,
				pickerOptions: ['选项1', '选项2', '选项3', '选项4'],
				currentIndex: 0,
				count: 0,
				testResult: '请进行测试操作...'
			}
		},
		onLoad() {
			console.log('测试界面加载完成');
		},
		methods: {
			handleButtonClick() {
				this.testResult = '普通按钮被点击了！';
				uni.showToast({
					title: '按钮点击成功',
					icon: 'success'
				});
			},
			
			handlePrimaryClick() {
				this.testResult = '主要按钮被点击了！';
				uni.showModal({
					title: '提示',
					content: '主要按钮点击成功'
				});
			},
			
			handleWarnClick() {
				this.testResult = '警告按钮被点击了！';
				uni.showToast({
					title: '警告操作',
					icon: 'error'
				});
			},
			
			handleSwitchChange(e) {
				this.switchValue = e.detail.value;
				this.testResult = `开关状态变为: ${this.switchValue ? '开' : '关'}`;
			},
			
			handlePickerChange(e) {
				this.currentIndex = e.detail.value;
				this.testResult = `选择了: ${this.pickerOptions[this.currentIndex]}`;
			},
			
			increment() {
				this.count++;
				this.testResult = `计数器: ${this.count}`;
			},
			
			decrement() {
				if (this.count > 0) {
					this.count--;
					this.testResult = `计数器: ${this.count}`;
				}
			}
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: flex-start;
		padding: 20rpx;
	}

	.logo {
		height: 120rpx;
		width: 120rpx;
		margin-top: 40rpx;
		margin-bottom: 20rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
		margin-bottom: 40rpx;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
		font-weight: bold;
	}
	
	/* 测试区域样式 */
	.test-section {
		width: 100%;
		max-width: 600rpx;
	}
	
	.section-title {
		font-size: 32rpx;
		font-weight: bold;
		color: #007AFF;
		margin-bottom: 30rpx;
		display: block;
		text-align: center;
	}
	
	.test-group {
		margin-bottom: 30rpx;
		padding: 20rpx;
		background-color: #f9f9f9;
		border-radius: 10rpx;
		border: 1rpx solid #eee;
	}
	
	.group-title {
		font-size: 28rpx;
		font-weight: bold;
		color: #333;
		margin-bottom: 15rpx;
		display: block;
	}
	
	.test-btn {
		margin: 10rpx 0;
	}
	
	.test-input {
		width: 100%;
		height: 80rpx;
		border: 1rpx solid #ddd;
		border-radius: 8rpx;
		padding: 0 20rpx;
		margin-bottom: 10rpx;
		background-color: white;
	}
	
	.input-result, .switch-result {
		font-size: 24rpx;
		color: #666;
	}
	
	.picker {
		padding: 20rpx;
		background-color: white;
		border: 1rpx solid #ddd;
		border-radius: 8rpx;
		color: #333;
	}
	
	.counter {
		display: flex;
		align-items: center;
		justify-content: center;
	}
	
	.counter-btn {
		width: 60rpx;
		height: 60rpx;
		font-size: 28rpx;
		margin: 0 20rpx;
	}
	
	.counter-value {
		font-size: 32rpx;
		font-weight: bold;
		color: #007AFF;
		min-width: 80rpx;
		text-align: center;
	}
	
	.result-text {
		font-size: 26rpx;
		color: #ff6b00;
		font-weight: bold;
		display: block;
		text-align: center;
		padding: 15rpx;
		background-color: #fff8e6;
		border-radius: 8rpx;
		border: 1rpx solid #ffd699;
	}
</style>
